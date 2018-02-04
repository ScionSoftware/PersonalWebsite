(function (ng) {
    'use strict';

    var spikeBytes = ng.module('SpikeBytes', ['ngRoute', 'LocalStorageModule'])
	spikeBytes.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	    $routeProvider
		.when('/blog/:title', {
            templateUrl: '/angular/directives/templates/blog.html',
            controller: 'BlogCtrl',
        })
        .when('/about', {
            templateUrl: '/angular/templates/about.html',
            controller: 'AboutCtrl',
            activeTab: 'About',
        })
        .when('/resume', {
            templateUrl: '/angular/templates/resume.html',
            controller: 'ResumeCtrl',
            activeTab: 'Resume',
        })
        .when('/reading', {
            templateUrl: '/angular/templates/reading.html',
            controller: 'ReadingCtrl',
            activeTab: 'Reading',
        })
        .when('/archive', {
            templateUrl: '/angular/templates/Archive.html',
            controller: 'BlogArchiveCtrl',
            activeTab: 'Archive',
        })
        .when('/', {
            templateUrl: '/angular/templates/home.html',
            controller: 'HomeCtrl',
            activeTab: 'Home',
        })
        .otherwise({
            templateUrl: '/angular/templates/404.html',
        });
		
		//$locationProvider.html5Mode(true);
		
}]).run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
    var path = function () { return $location.path(); };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activeTab = newVal;
        $window._trackPageView(newVal);
    });
}]);;
}(angular));