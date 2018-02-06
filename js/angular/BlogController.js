(function (ng) {
    'use strict';

    var blogCtrl = function ($scope, $routeParams, blogApi) {
        $scope.title = $routeParams.title.toString().toLowerCase();
        $scope.blog = blogApi.getByName($scope.title);
    };

    ng.module('SpikeBytes').controller('BlogCtrl', ['$scope', '$routeParams', 'blogApi', blogCtrl]);

}(angular));