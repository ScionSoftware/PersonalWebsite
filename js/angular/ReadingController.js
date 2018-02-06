(function (ng) {
    'use strict';

    var readingCtrl = function ($scope, readingApi) {

        var populateReadings = function () {
            $scope.readings = readingApi.getReadings();
        };

        populateReadings();
    };

    ng.module('SpikeBytes').controller('ReadingCtrl', ['$scope', 'readingApi', readingCtrl]);

}(angular));