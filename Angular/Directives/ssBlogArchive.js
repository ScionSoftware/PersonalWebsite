(function (ng) {
    'use strict';

    var ssBlogArchive = function (blogApi) {

        return {
            templateUrl: '/Angular/Directives/Templates/ssBlogArchive.html',
            replace: true,
            scope: {
                keepExpanded: '=?attrExpand'
            },
            link: function (scope) {

                scope.setAll = function (open, startMonthsOpen) {
                    for (var y = 0; y < scope.years.length; y++) {
                        scope.years[y].open = open || scope.keepExpanded;

                        for (var m = 0; m < scope.years[y].months.length; m++) {
                            scope.years[y].months[m].open = open || startMonthsOpen || scope.keepExpanded;
                        }
                    }
                };

                scope.toggleItem = function (item) {

                    if (scope.keepExpanded) {
                        return;
                    }

                    item.open = !item.open;
                };

                blogApi.getMetaData().then(function (archive) {
                    scope.years = archive;
                    scope.setAll(scope.keepExpanded, true);
                });
            }
        };
    };

    ng.module('SpikeBytes').directive('ssBlogArchive', ['blogApi', ssBlogArchive]);

}(angular));