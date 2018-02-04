(function (ng) {
    'use strict';

    var blogArchiveController = function ($scope, blogApi) {

        $scope.setAll = function (open, startMonthsOpen) {
            for (var y = 0; y < $scope.years.length; y++) {
                $scope.years[y].open = open;

                for (var m = 0; m < $scope.years[y].months.length; m++) {
                    $scope.years[y].months[m].open = open || startMonthsOpen;
                }
            }
        };

        blogApi.getMetaData().then(function (metadata) {
            var yearsObject = {};

            var addMonthItem = function (item, year) {
                year[item.month] =
                    year[item.month]
                    || { month: item.month, text: item.monthText, articles: [] };

                year[item.month].articles.push(item);
            };

            var add = function (item) {
                yearsObject[item.year] = yearsObject[item.year] || { year: item.year };
                addMonthItem(item, yearsObject[item.year]);
            };

            for (var i = 0; i < metadata.length; i++) {
                add(metadata[i]);
            }

            $scope.years = [];

            var enumerateMonths = function (year) {
                year.months = [];
                for (var monthKey in year) {
                    if (year.hasOwnProperty(monthKey)) {
                        year.months.push(year[monthKey]);
                    }
                }
            };

            for (var yearKey in yearsObject) {
                if (yearsObject.hasOwnProperty(yearKey)) {
                    enumerateMonths(yearsObject[yearkey]);
                    $scope.years.push(yearsObject[yearkey]);
                }
            }

            $scope.setAll(false, true);
        });

        $scope.toggleItem = function (item) {
            item.open = !item.open;
        };
    };

    ng.module('SpikeBytes').controller('BlogArchiveController', ['$scope', 'blogApi', blogArchiveController]);

}(angular));