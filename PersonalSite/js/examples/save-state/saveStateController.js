(function (ng) {
    'use strict';

    var saveStateController = function ($scope, localStorageService) {

        var username = 'first_last';

        var key = username + '_formName';

        var modelString = localStorageService.get(key);

        if (modelString) {
            $scope.model = JSON.parse(modelString)
        }

        $scope.model = $scope.model || {
            name: '',
            number: null,
            biography: ''
        };

        $scope.saveState = function () {
            localStorageService.set(key, JSON.stringify($scope.model));
        };

    };

    ng.module('SpikeBytes')
        .controller('saveStateController', ['$scope', 'localStorageService', saveStateController]);

}(angular));