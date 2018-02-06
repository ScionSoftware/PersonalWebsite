(function (ng) {
    'use strict';

    var ssSocialShare = function () {
        return {
            templateUrl: 'https://github.com/colin-higgins/colin-higgins.github.io/blob/master/angular/directives/templates/ssSocialShare.html',
            scope: {
                ssUrl: '@',
                ssTitle: '@'
            }
        };
    };

    ng.module('SpikeBytes').directive('ssSocialShare', [ssSocialShare]);

}(angular));