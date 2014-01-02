
var spykeBytes = angular.module('SpykeBytes', ['ngRoute']);

spykeBytes.config([ '$routeProvider', function ($routeProvider) {
    $routeProvider.when('/Blogs', {
        templateUrl: '/angular/templates/main.html',
        controller: 'MainCtrl',
        activeTab: 'Blogs',
    })
        .when('/Blog/:title', {
            templateUrl: '/angular/directives/templates/blog.html',
            controller: 'BlogCtrl',
        })
        .when('/About', {
            templateUrl: '/angular/templates/about.html',
            controller: 'AboutCtrl',
            activeTab: 'About',
        })
        .when('/Resume', {
            templateUrl: '/angular/templates/resume.html',
            controller: 'ResumeCtrl',
            activeTab: 'Resume',
        })
        .otherwise({
            templateUrl: '/angular/templates/main.html',
            controller: 'MainCtrl',
            activeTab: 'Blogs',
        });
}]).run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
    var path = function () { return $location.path(); };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activeTab = newVal;
        $window._trackPageView(newVal);
    });
}]);
