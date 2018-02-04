(function (ng) {
    'use strict';

    var ssSocialShare = function () {
        return {
            templateUrl: '/Angular/Directives/Templates/ssSocialShare.html',
            scope: {
                ssUrl: '@',
                ssTitle: '@'
            }
        };
    };

    ng.module('SpikeBytes').directive('ssSocialShare', [ssSocialShare]);

}(angular));