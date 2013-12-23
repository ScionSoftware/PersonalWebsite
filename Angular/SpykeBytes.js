
var spykeBytes = angular.module('SpykeBytes', ['ngRoute']);

spykeBytes.config([ '$routeProvider', function ($routeProvider) {
	$routeProvider.when('/Blogs', {
		templateUrl: '/angular/templates/main.html',
		controller: 'MainCtrl',
	})
    .otherwise({
        templateUrl: '/angular/templates/main.html',
		controller: 'MainCtrl',
    });
}]);
