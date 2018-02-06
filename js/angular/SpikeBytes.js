(function (ng) {
    'use strict';

    var spikeBytes = ng.module('SpikeBytes', ['ngRoute', 'LocalStorageModule'])
	spikeBytes.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	    $routeProvider
		.when('/blog/:title', {
		    templateUrl: '/js/angular/templates/blog.html',
            controller: 'BlogCtrl',
        })
        .when('/about', {
            templateUrl: '/js/angular/templates/about.html',
            controller: 'AboutCtrl',
            title: 'About',
        })
        .when('/resume', {
            templateUrl: '/js/angular/templates/resume.html',
            controller: 'ResumeCtrl',
            title: 'Resume',
        })
        .when('/reading', {
            templateUrl: '/js/angular/templates/reading.html',
            controller: 'ReadingCtrl',
            title: 'Reading',
        })
        .when('/archive', {
            templateUrl: '/js/angular/templates/archive.html',
            controller: 'BlogArchiveCtrl',
            title: 'Archive',
        })
        .when('/', {
            templateUrl: '/js/angular/templates/home.html',
            controller: 'HomeCtrl',
            title: 'Home',
        })
        .otherwise({
            templateUrl: '/js/angular/templates/404.html',
        });
		
		//$locationProvider.html5Mode(true);
		
	}]).run(['$rootScope', '$location', '$window', '$route',
    function ($rootScope, $location, $window, $route) {

        var title = function () {
            if ($route.current) {
                return $route.current.$$route.title;
            }
            return null;
        };

        $rootScope.$watch(title, function (newTitle, oldTitle) {
            $rootScope.activeTitle = newTitle || 'Scion';
        });

        var path = function () { return $location.path(); };
        $rootScope.$watch(path, function (newVal, oldVal) {
            $rootScope.lastRoute = oldVal;
            $rootScope.activeRoute = newVal;
            $window._trackPageView(newVal);
    });
}]);;
}(angular));