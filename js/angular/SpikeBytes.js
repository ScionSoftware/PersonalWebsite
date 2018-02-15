var siteVer = '?v=2.0.1';

(function (ng) {
    'use strict';

    var blogPage = {
        templateUrl: '/js/angular/templates/blog.html' + siteVer,
        controller: 'BlogCtrl',
        caseInsensitiveMatch: true,
    };

    var spikeBytes = ng.module('SpikeBytes', ['ngRoute', 'LocalStorageModule'])
	spikeBytes.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	    $routeProvider
		.when('/blog/:title', blogPage)
		.when('/Blog/:title', blogPage)
		.when('/BLOG/:title', blogPage)
		.when('/BLog/:title', blogPage)
        .when('/about', {
            templateUrl: '/js/angular/templates/about.html' + siteVer,
            controller: 'AboutCtrl',
            title: 'About',
            caseInsensitiveMatch: true,
        })
        .when('/resume', {
            templateUrl: '/js/angular/templates/resume.html' + siteVer,
            controller: 'ResumeCtrl',
            title: 'Resume',
            caseInsensitiveMatch: true,
        })
        .when('/reading', {
            templateUrl: '/js/angular/templates/reading.html' + siteVer,
            controller: 'ReadingCtrl',
            title: 'Reading',
            caseInsensitiveMatch: true,
        })
        .when('/archive', {
            templateUrl: '/js/angular/templates/archive.html' + siteVer,
            controller: 'BlogArchiveCtrl',
            title: 'Archive',
            caseInsensitiveMatch: true,
        })
        .when('/previews', {
            templateUrl: '/js/angular/templates/previews.html' + siteVer,
            controller: 'BlogArchiveCtrl',
            title: 'Previews',
            caseInsensitiveMatch: true,
        })
        .when('/', {
            templateUrl: '/js/angular/templates/home.html' + siteVer,
            controller: 'HomeCtrl',
            title: 'Home',
            caseInsensitiveMatch: true,
        })
        .otherwise({
            templateUrl: '/js/angular/templates/404.html' + siteVer,
        });
		
	    $routeProvider.caseInsensitiveMatch = true;
		$locationProvider.html5Mode(true);
		
	}]).run(['$rootScope', '$location', '$window', '$route',
    function ($rootScope, $location, $window, $route) {

        var title = function () {
            if ($route.current && $route.current.$$route) {
                return $route.current.$$route.title;
            }
            return null;
        };

        $rootScope.$watch(title, function (newTitle, oldTitle) {
            $rootScope.activeTitle = newTitle || 'Scion Software';
            $window.document.title = $rootScope.activeTitle;
        });

        var path = function () { return $location.path(); };
        $rootScope.$watch(path, function (newVal, oldVal) {
            $rootScope.lastRoute = oldVal;
            $rootScope.activeRoute = newVal;
            $window._trackPageView(newVal);
    });
}]);;
}(angular));