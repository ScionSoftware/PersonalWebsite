

var mainCtrl = function ($scope) {
	var index = 0;
	
	var addTemplate = function (templateTitle) {
	    return {
	        Title: templateTitle,
	        Template: '/blogs/' + templateTitle + '.html'
	    };
	};
	
	$scope.BlogPosts = [
		addTemplate('hello-world'),
		addTemplate("an-intro-to-redis"),
		addTemplate("middle-eastern-scapegoat"),
		addTemplate("sql-performance-tips"),
	];
	
};

spykeBytes.controller('MainCtrl', ['$scope', mainCtrl ]);