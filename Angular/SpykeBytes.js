
var spykeBytes = angular.module('SpykeBytes', ['ngRoute']);

spykeBytes.config([ '$routeProvider', function ($routeProvider) {
	$routeProvider.when('/Blogs', {
		templateUrl: '/angular/templates/main.html',
		controller: 'MainCtrl',
	})
	.when('/About', {
		templateUrl: '/angular/templates/about.html',
		controller: 'AboutCtrl',
	})
	.when('/Resume', {
		templateUrl: '/angular/templates/resume.html',
		controller: 'ResumeCtrl',
	})
    .otherwise({
        templateUrl: '/angular/templates/main.html',
		controller: 'MainCtrl',
    });
}]);
