(function (ng) {
    'use strict';

    var ssBlogSearch = function (blogApi) {

        return {
            templateUrl: '/js/angular/directives/templates/ssBlogSearch.html' + siteVer,
            replace: true,
            link: function (scope) {

                var blogContainsKeywords = function (blog, keywords) {

                    for (var i = 0; i < keywords.length; i++) {

                        if (blog.name.toLowerCase().indexOf(keywords[i]) >= 0)
                            continue;
                        if (blog.published.toLowerCase().indexOf(keywords[i]) >= 0)
                            continue;
                        if (blog.description.toLowerCase().indexOf(keywords[i]) >= 0)
                            continue;
                        if (blog.tags && blog.tags.toLowerCase().indexOf(keywords[i]) >= 0)
                            continue;

                        return false;
                    }

                    return true;
                };

                scope.search = function (text) {

                    text = text || '';

                    var keywords = text.toLowerCase().split(' ');

                    scope.blogs = [];

                    if (keywords.length === 0) {
                        return;
                    }


                    var blogs = blogApi.getAll();
                    for (var i = 0; i < blogs.length; i++) {

                        var isMatch = true;

                        if (blogContainsKeywords(blogs[i], keywords)) {
                            scope.blogs.push(blogs[i]);
                        }
                        
                        if (scope.blogs.length == 5) {
                            break;
                        }
                    }
                };

            }
        };
    };

    ng.module('SpikeBytes').directive('ssBlogSearch', ['blogApi', ssBlogSearch]);

}(angular));