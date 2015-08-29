(function (ng) {
    'use strict';


    var ssBlogArchive = function ($http, $q) {

        var getArchive = function () {

            var deferred = $q.defer();

            $http.get('/GetArchives')
                .success(function (archive) {
                    deferred.resolve(archive);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

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

                        for (var m = 0; m < scope.years[y].Months.length; m++) {
                            scope.years[y].Months[m].open = open || startMonthsOpen || scope.keepExpanded;
                        }
                    }
                };

                scope.toggleItem = function (item) {

                    if (scope.keepExpanded) {
                        return;
                    }

                    item.open = !item.open;
                };

                getArchive().then(function (archive) {
                    scope.years = archive;
                    scope.setAll(scope.keepExpanded, true);
                });
            }
        };
    };

    ng.module('SpikeBytes').directive('ssBlogArchive', ['$http', '$q', ssBlogArchive]);

}(angular));