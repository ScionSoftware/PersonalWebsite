(function (ng) {
    'use strict';

    var ssSocialShare = function () {
        return {
            templateUrl: '/js/angular/directives/templates/ssSocialShare.html',
            scope: {
                ssUrl: '@',
                ssTitle: '@'
            }
        };
    };

    ng.module('SpikeBytes').directive('ssSocialShare', [ssSocialShare]);

}(angular));