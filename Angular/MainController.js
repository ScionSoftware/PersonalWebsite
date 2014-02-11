

var mainCtrl = function ($scope, blogApi) {
	
    $scope.blogPosts = blogApi.getBlogs();

	$scope.displayed = [];

	$scope.showMoreBlogs = function () {
        var index = $scope.displayed.length;
        for (var i = index; i < index + 3; i++) {
            if (i >= $scope.blogPosts.length)
                break;
            $scope.displayed.push($scope.blogPosts[i]);
        }
    };

	$scope.showMoreBlogs();
};

spykeBytes.controller('MainCtrl', ['$scope', 'blogApi', mainCtrl ]);