
var readingApiInstance = function ($http) {

    return {
        getReadings: function (playerId) {
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
        },
        //getGame: function (gameId, onSuccess, onFailure) {
        //    $http({
        //        method: 'GET',
        //        url: '/ChessApi/GetGame/' + gameId
        //    })
        //        .success(function (data) {
        //            onSuccess(data);
        //        })
        //        .error(function (data) {
        //            onFailure(data);
        //        });
        //},
    };
};

spikeBytes.factory('readingApi', ['$http', readingApiInstance]);
