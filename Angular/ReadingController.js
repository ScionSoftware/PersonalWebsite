
var readingCtrl = function ($scope, readingApi) {

    $scope.title = ' - Reading';

    var populateReadings = function () {
        $scope.readings = readingApi.getReadings();
    };
    
    populateReadings();
};

spykeBytes.controller('ReadingCtrl', ['$scope', 'readingApi', readingCtrl]);
