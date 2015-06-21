
var readingCtrl = function ($scope, readingApi) {

    $scope.title = ' - Reading';

    var populateReadings = function () {
        $scope.readings = readingApi.getReadings();
    };
    
    populateReadings();
};

spikeBytes.controller('ReadingCtrl', ['$scope', 'readingApi', readingCtrl]);
