(function (ng) {
    'use strict';

    ng.module('SpikeBytes')
        .filter('unsafe', ['$sce',
            function ($sce) {
                return $sce.trustAsHtml;
            }]);

    var blogApiInstance = function ($q) {

        var blogs = blogMetadata;
        var availableBlogs = [];

        var monthMap = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December",
        }

        var today = new Date();
        today.setUTCHours(0);

        for (var i = 0; i < blogs.length; i++) {
            var year = blogs[i].published.substr(0, 4);
            var month = blogs[i].published.substr(5, 2);
            var day = blogs[i].published.substr(8, 2);

            blogs[i].name = blogs[i].name.toString().toLowerCase();
            blogs[i].year = year;
            blogs[i].month = month;
            blogs[i].day = day;
            blogs[i].date = new Date(year, parseInt(month) - 1, day);
            blogs[i].date.setUTCHours(0);
            blogs[i].monthText = monthMap[month];
            blogs[i].url = "/blogs/" + year + "/" + blogs[i].name + ".html";

            blogs[i].available = false;

            if (blogs[i].date.getTime() < today.getTime()) {
                blogs[i].available = true;
                availableBlogs.push(blogs[i]);
            }
        }

        var metadataPromise = null;

        return {
            getAll: function () {
                return blogs;
            },
            getMetaData: function () {
                var deferred = $q.defer();
                var yearsObject = {};

                if (metadataPromise) {
                    return metadataPromise;
                }

                metadataPromise = deferred.promise;

                var addMonthItem = function (item, year) {
                    year.monthObject[item.month] =
                        year.monthObject[item.month]
                        || { month: item.month, text: item.monthText, articles: [] };

                    year.monthObject[item.month].articles.push(item);
                };

                var add = function (item) {
                    yearsObject[item.year] =
                        yearsObject[item.year]
                        || { monthObject: {}, year: item.year };
                    addMonthItem(item, yearsObject[item.year]);
                };

                for (var i = 0; i < blogs.length; i++) {
                    add(blogs[i]);
                }

                var archiveYears = [];

                var enumerateMonths = function (year) {
                    year.months = [];
                    for (var monthKey in year.monthObject) {
                        if (year.monthObject.hasOwnProperty(monthKey)) {
                            year.months.push(year.monthObject[monthKey]);
                        }
                    }
                };

                for (var yearKey in yearsObject) {
                    if (yearsObject.hasOwnProperty(yearKey)) {
                        enumerateMonths(yearsObject[yearKey]);
                        archiveYears.push(yearsObject[yearKey]);
                    }
                }

                deferred.resolve(archiveYears);
                return deferred.promise;
            },
            getByName: function (name) {

                for (var i = 0; i < blogs.length; i++) {
                    if (blogs[i].name === name) {
                        return blogs[i];
                    }
                }

                throw new Error('Dat is not de way.');
            },
            getPreviews: function (blogNames) {

                var nameParameter = blogNames.join(',');

                var deferred = $q.defer();
                var previews = [];
                for (var i = 0; i < blogs.length; i++) {
                    for (var n = 0; n < blogNames.length; n++) {
                        if (availableBlogs[i].name === blogNames[n]) {
                            previews.push(availableBlogs[i]);
                        }
                    }
                }

                deferred.resolve(previews);

                return deferred.promise;
            },
            getPreviewsByGroupIndex: function (previewGroup) {

                var groupIndex = previewGroup - 1;
                var deferred = $q.defer();
                var batchSize = 1;
                var startIndex = groupIndex * batchSize;
                var max = startIndex + batchSize;
                if (max > availableBlogs.length) {
                    max = availableBlogs.length;
                }

                var previews = [];

                for (var i = startIndex; i < max; i++) {
                    previews.push(availableBlogs[i]);
                }

                deferred.resolve(previews);

                return deferred.promise;
            }
        };
    };

    ng.module('SpikeBytes').factory('blogApi', ['$q', blogApiInstance]);

}(angular));