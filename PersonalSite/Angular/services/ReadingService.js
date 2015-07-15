
var readingApiInstance = function ($http) {

    return {
        getReadings: function () {

            var readings = [];
            var addReading = function (path) {
                readings.push({
                    path: path,
                });
            };

            addReading('/readings/implementing-domain-driven-design.html');
            addReading('/readings/being-geek.html');
            addReading('/readings/clean-code.html');
            addReading('/readings/csharp-in-depth.html');
            addReading('/readings/why-a-students-work-for-c-students.html');
            addReading('/readings/the-new-kingmakers.html');
            addReading('/readings/the-pragmatic-programmer.html');
            addReading('/readings/algorithms-in-a-nutshell.html');
            addReading('/readings/mastering-regular-expressions.html');
            addReading('/readings/effective-programming-more-than-writing-code.html');
            addReading('/readings/javascript-the-good-parts.html');

            return readings;
        }
    };
};

spikeBytes.factory('readingApi', ['$http', readingApiInstance]);
