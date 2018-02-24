(function (ng) {
    'use strict';

    var blogArchiveController = function ($scope, blogApi) {

        _scrollToTop();
        var blogs = blogApi.getAll();
        var previews = [];
        for (var i = 0; i < blogs.length; i++) {
            if (!blogs[i].available) {
                previews.push(blogs[i]);
            }
        }
        $scope.previews = previews;

    };

    ng.module('SpikeBytes').controller('BlogArchiveCtrl', ['$scope', 'blogApi', blogArchiveController]);

}(angular));