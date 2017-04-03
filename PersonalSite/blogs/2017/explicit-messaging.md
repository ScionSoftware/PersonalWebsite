I'll start off with a warning. 

*Being implicit with the intent of your messages is dangerous.*

Being *explicit* about what your messages are supposed to do, and what they're supposed to do it on - is safe.

I'm not saying that being implicit is BAD. 
Don't get me wrong, there are obviously situations where it's useful or necessary to be vague.

Being implicit and allowing your handlers to decide what to operate on based on some metadata can be powerful.
It's flexible and wonderful. You can decide that you need to operate on more data or you can decide to trim it down.
You can decide to spread the processing out by kicking off new and more specific messages. 

I'd just like to be judicious in my allowing some other code to pick and choose what to operate on.
If I'm not careful, I can get some strange side effects.

### Time for a contrived example:

Say we are developing an income tax application.
Say there is a parent-child structure in our application like this:  

*TaxYear* > *IncomeTaxSubmission*

This seems simple enough.

There are a few business rules around this.

 - We only handle personal returns, and so a simple once a year submission for each individual
 - There is a submission deadline every year
 - We must be able to pick up and process new submissions via FTP at any point
 - Submissions must be validated by an accountant before they are submitted to the IRS
 
 TO BE CONTINUED
