

var blogCtrl = function ($scope, $routeParams) {
    $scope.title = $routeParams.title;
    //$scope.title = ' - ' + $scope.title;
    $scope.template = '/blogs/' + $scope.title + '.html';
};

spikeBytes.controller('BlogCtrl', ['$scope', '$routeParams', blogCtrl]);

