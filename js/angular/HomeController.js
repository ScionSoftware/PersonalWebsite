(function (ng) {
    'use strict';

    var homeCtrl = function ($scope, blogApi) {

        _scrollToTop();

        $scope.displayed = $scope.displayed || [];
        $scope.previewGroup = 1;
        $scope.previewGroupMaximum = null;
        var groupsGrabbed = {};

        $scope.showMoreBlogs = function () {

            if ($scope.outOfPreviews || groupsGrabbed['' + $scope.previewGroup]) {
                return;
            }

            var attachToDisplayed = function (previews) {

                if (!previews || previews.length === 0) {
                    $scope.outOfPreviews = true;
                }

                for (var i = 0; i < previews.length; i++) {
                    $scope.displayed.push(previews[i]);
                }

                groupsGrabbed['' + $scope.previewGroup] = true;

                $scope.previewGroup += 1;
            };

            var onFailure = function () {
                throw new Error('Blog retrieval failed for preview group ' + $scope.previewGroup);
            };

            blogApi
                .getPreviewsByGroupIndex($scope.previewGroup)
                .then(attachToDisplayed);
        };

        $scope.showMoreBlogs();
    };

    ng.module('SpikeBytes').controller('HomeCtrl', ['$scope', 'blogApi', homeCtrl]);

}(angular));