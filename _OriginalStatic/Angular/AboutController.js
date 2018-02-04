(function (ng) {
    'use strict';

    var aboutCtrl = function ($scope) {
        $scope.title = ' - About';
    };

    ng.module('SpikeBytes').controller('AboutCtrl', ['$scope', aboutCtrl]);

}(angular));