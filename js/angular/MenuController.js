(function (ng) {
    'use strict';

    var dropdownMenuCtrl = function ($scope, $timeout) {

        $scope.showMenu = false;
        var mouseOut = true;

        $scope.toggleMenu = function () {
            $scope.showMenu = !$scope.showMenu;
        };

        $scope.handleMouseOut = function () {
            mouseOut = true;
            $timeout(function () {
                if (mouseOut)
                    $scope.showMenu = false;
            }, 1500);
        };

        $scope.cancelMouseOut = function () {
            $scope.showMenu = true;
            mouseOut = false;
        };
    };

    ng.module('SpikeBytes').controller('Menu', ['$scope', '$timeout', dropdownMenuCtrl]);

}(angular));