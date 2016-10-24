<!--
---
titles:
  - Lies, damned lies, and progress bars
  - Progress bars aren't all liars
  - Progress bars can tell the truth too
  - Tell the truth with a progress bar
authors:
  - Colin Higgins
keywords: progress bar showing status messages
summary: "It's a running joke to say that progress indicators are just lies but we can use messaging patterns to give better indication of progress."
tags:
  - Programming
  - Messaging
  - Status
tweets:
  - "Progress bars aren't all liars."
  - "There are 3 kinds of lies. Lies, damned lies, and progress bars."
---
-->

I love tracking progress. 
Running, cycling, watching my baby grow, and reading books are a few examples. 
It's nice to know how far I've gone and how far I have left to go. 
Naturally I love progress bars, but I also hate them because they often lie. 
I'm having flashbacks to old installs...and updates...and windows services...and...


Sorry, I was back there waiting for the progress bars to finish.

<div class="center-content">
	<img src="/img/blogs/progress/windows-copy.png" alt="Are we there yet?" />
</div>

Progress bars in web applications are especially troublesome because the client is disconnected from where the work is actually happening: on the server. 
So we often resort to an animated gif that gives the illusion of progress being made without actually telling you exactly how much.
Expectation setting is an important aspect of keeping your users happy. They don't like being left in the dark.

### Are we there yet?

Do you have some long-running process that your users are impatiently waiting for? Do they want to know how far along everything is while they wait? 

Well, you're in luck! 

Not only can you create meaningful progress bars, but they can be responsive and accurate too. 
I'm going to show you how to do all of these things by implementing a progress bar using 
[AngularJS](https://angularjs.org/) and [NServiceBus](http://particular.net/nservicebus). 
For simplicity's sake, I'll be doing relatively trivial polling from the front-end but in practice it may be better to use something like [SignalR](http://signalr.net/).

### What does the result look like?

There are two UI components in this sample project. 
The first is a console window which displays the progress that our **Message Handler** has made while processing the large task. 
The second UI component is the progress bar which represents the status of the large task as of the last query. 
As a result, the progress bar will be slightly behind the actual process as shown here:

<div class="center-content">
	<img src="/img/blogs/progress/progress-bar-with-service.png" alt="Honesty is refreshing" />
</div>

With this progress bar we can accurately show the user how much of the task is finished. 
We can also get an idea of how quickly things are being processed based on how fast the bar fills up.

#### What does the architecture look like?

There are four conceptual pieces: 
 1. The client, or **Browser**, portion where the progress bar is displayed
 2. The server, or **ASP.NET MVC**, instance which facilitates the communication
 3. The asynchronous message-handling process or **Message Handler**
 4. The **Status Store** that tracks the progress

<div class="center-content">
	<img src="/img/blogs/progress/progress-architecture.png" alt="Polling architecture" />
</div>

### A look at the HTML

The HTML has three components: an input to decide how many things to do, a button to start the big task, and a styled progress bar. 
The HTML also contains Angular specific markup that links the HTML to the JavaScript. 
To understand the link between the HTML and the JavaScript, it's important to know that `ng-app` tells Angular which `module` to use for the application. 
Later in the HTML, the `ng-controller` attribute tells Angular to use the provided `controller` to interact with the markup. 
After this is done, anything available on the controller's `$scope` is also available to the portion of the view delegated to the controller. 

```html
<div ng-app="progressDemo" ng-controller="progressCtrl">
    <div>
        <label>Number of things to do: </label>
        <input type="number" ng-model="numberOfThingsToDo" /> &nbsp;
        <button ng-click="submit()">Start Doing Things</button>
    </div>

    <div ng-repeat="batch in batches">
        <h4>BatchId: {{batch.BatchId}} - Things to do: {{batch.NumberOfThingsToDo}}</h4>
        <div style="border: thin black solid; width: 800px;">
            <div ng-style="{ 'width': batch.percentCompleteText || '0%' }" 
			     style="background-color: green; text-align: center;">
                {{ batch.percentCompleteText || '0%' }}
            </div>
        </div>
    </div>
</div>

```

### Starting the task

As you may have noticed in the HTML, the button has an attribute: `ng-click="submit()"`. 
When that button is clicked, `$scope.submit()` is called in the `progressCtrl` controller. 
The `$scope.submit()` function starts some big stuff, and then stores the `batchModel` to check on later.

```
angular.module('progressDemo', []);

angular.module('progressDemo')
       .controller('progressCtrl', function ($scope, $http, $q, $timeout) {

    $scope.batches = [];
    $scope.numberOfThingsToDo = 1000; // default value
...

    var startBigStuff = function () {
        var deferred = $q.defer();
        $http.post('/Home/StartBigStuff?howMuchStuff=' + $scope.numberOfThingsToDo)
            .then(function (batchModel) {
                deferred.resolve(batchModel);
            });
        return deferred.promise;
    };

...

    $scope.submit = function () {
        startBigStuff().then(function (response) {
            var batchModel = response.data;
            $scope.batches.push(batchModel);
            pollForStatus(batchModel);
        });
    };
});

```

### The Server Side

The MVC controller contains some methods, one of which returns the view we saw in the HTML and another that starts the "big stuff". 
The instance of `_bus` is an NServiceBus specific object which facilitates communication with your message handlers. 
I've used dependency injection to make an instance of the bus available in my MVC controller.

```C#
public class HomeController : Controller
{
    [HttpPost]
    public JsonResult StartBigStuff(int howMuchStuff)
    {
        var model = new StartBatchModel()
        {
            BatchId = Guid.NewGuid(),
            NumberOfThingsToDo = howMuchStuff
        };

        _bus.Send(new TriggerBigStuff()
        {
            Id = model.BatchId,
            HowMuchStuff = model.NumberOfThingsToDo,
        });

        // Return the Id to the client to query for status
        return Json(model, JsonRequestBehavior.AllowGet);
    }

...

    public HomeController(IBus bus, IStatusStoreClient statusStoreClient)
    {
        _bus = bus;
        _statusStoreClient = statusStoreClient;
    }

    private readonly IBus _bus;
    private readonly IStatusStoreClient _statusStoreClient;
}
```

### Tracking the work

To pick up the message that was sent by the MVC Controller, the `BigStuffHandler` class was created. 
This class performs a large task and updates a central source with the correlation ID every time a piece of work is completed. 
The `BigStuffHandler` class is an example of a `MessageHandler` in version 5 of NServiceBus. 
Whenever `_bus.Send(new TriggerBigStuffMessage()...` is called, the `Handle(TriggerBigStuff message)` method is eventually called with that same message.

The `IStatusStoreClient` that is injected into the `BigStuffHandler` constructor is a client for a WebAPI instance. 
The WebAPI that `IStatusStoreClient` represents will store the completed commands in memory. 
In practice, you should use non-volatile storage of some kind rather than in-memory storage.


```C#
public class BigStuffHandler : IHandleMessages<TriggerBigStuff>
{
    public void Handle(TriggerBigStuff message)
    {
        Console.WriteLine("Handling some big stuff.");
        for (var index = 0; index <= message.HowMuchStuff; index++)
        {
            var workId = DoSomeWorkForABatch(message, index);
            _statusStoreClient.AddCompletedCommandToBatch(batchId: message.Id, messageId: workId);
        }
    }

    private Guid DoSomeWorkForABatch(TriggerBigStuff message, int index)
    {
        Thread.Sleep(10);
        Console.WriteLine(
		    "Batch Id: " + message.Id + 
			" - Handling message " + index + " of " + message.HowMuchStuff);
        // Just pretend we did some stuff
        return Guid.NewGuid();
    }

...
}
```

### Polling for progress

This simplistic polling implementation is used to ask for the status of a batch in intervals. 
Every time the endpoint is called, we take the result of the request and update the progress bar with the `setProgress` function.

```
...

    $scope.batches = [];
    $scope.numberOfThingsToDo = 1000; // default value

    var howLongBetweenPolls = function (batchModel) {
        var milliseconds = batchModel.NumberOfThingsToDo / 500;

        // Ensure we don't poll too frequently or infrequently

        if (milliseconds < 350)
            milliseconds = 350;
        if (milliseconds > 4000)
            milliseconds = 4000;

        return milliseconds;
    };
...

    var getStatus = function (batchId) {
        var deferred = $q.defer();
        $http.get('/Home/Status?id=' + batchId)
            .then(function (batchStatus) {
                deferred.resolve(batchStatus);
            });
        return deferred.promise;
    };

    var setProgress = function (batchModel, batchStatus) {
        batchModel.progress = 
		    batchStatus.ItemsCompletedCount / batchModel.NumberOfThingsToDo;
        batchModel.percentComplete = 
		    (batchModel.progress * 100).toFixed(2);
        batchModel.percentCompleteText = 
		    batchModel.percentComplete.toString() + '%';
        batchModel.complete = 
		    batchModel.percentComplete >= 100;
    };

    var pollForStatus = function (batchModel) {
        var timeBetweenPolls = howLongBetweenPolls(batchModel);

        $timeout(function () {
            getStatus(batchModel.BatchId).then(
                function (response) {
                    var batchStatus = response.data;
                    setProgress(batchModel, batchStatus);

                    if (batchModel.complete)
                        return;

                    pollForStatus(batchModel);
                });
        }, timeBetweenPolls);
    };

...

```

### Querying for the status

Finally, we expose a method on the `HomeController` to allow the JavaScript to query the WebAPI instance for the status of any individual task. 


```C#
public class HomeController : Controller
{
...

    /// <summary>
    /// Query for the status of a task
    /// </summary>
    [HttpGet]
    public JsonResult Status(string id)
    {
        var batchStatus = _statusStoreClient.GetBatchStatus(id);

        var completedCommandCount =
            batchStatus == null ? 0
                : batchStatus.NumberOfItemsCompleted;

        var model = new BatchStatusModel()
        {
            BatchId = id,
            ItemsCompletedCount = completedCommandCount
        };

        return Json(model, JsonRequestBehavior.AllowGet);
    }

...
}
```

### How else can it be done?

There is much to consider, and every implementation has different needs. 

The sample handled the entire process with one single message and one single handler. That handler explicitly called the `IStatusStoreClient`. Instead of using that approach the original handler could have published events such as `PieceOfBigStuffCompleted`, which would be picked up by another handler to set progress.

Another option is to divide the "big stuff" process into discrete tasks with individual messages for each task. Those individual messages could then be used to track the overall completion of the process. Doing this would have prevented the code from blocking a thread for the duration of the "big stuff" processing within a single message handler.

These are only two of many alternatives and each one has its advantages and disadvantages.

#### What haven't we solved?

I have avoided the more difficult problem of actually telling the user how much time is remaining. That would involve more complicated code and educated guesswork as to how long each step is taking on average.

With all of that said, I am sure your users would love to know how quickly your code runs. Now get out there and let your users know if their imports or reports are moving along!

Feel free to [check out the code](https://github.com/colin-higgins/ProgressBar.NServiceBus).

Enjoy!

## Additional Reading
 * [Message Handlers](http://docs.particular.net/nservicebus/handlers/)
 * [Dependency Injecting the Bus](http://docs.particular.net/samples/web/asp-mvc-injecting-bus/)
