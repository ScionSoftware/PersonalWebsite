

var mainCtrl = function ($scope) {

	var addTemplate = function (templateTitle) {
	    return {
	        Title: templateTitle,
	        Template: '/blogs/' + templateTitle + '.html'
	    };
	};
	
	$scope.blogPosts = [
		addTemplate("generate-entity-sql"),
		addTemplate("business-analysis-paralysis"),
		addTemplate("computer-science-terms-1"),
		addTemplate("sql-performance-tips"),
		addTemplate("middle-eastern-scapegoat"),
		addTemplate("too-little-butter-too-much-bread"),
		addTemplate("an-intro-to-redis"),
		addTemplate('hello-world'),
	];

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

spykeBytes.controller('MainCtrl', ['$scope', mainCtrl ]);