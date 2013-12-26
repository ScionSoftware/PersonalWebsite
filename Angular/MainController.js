

var mainCtrl = function ($scope) {
	var index = 0;
	
	var addTemplate = function (templateTitle) {
	    return {
	        Title: templateTitle,
	        Template: '/blogs/' + templateTitle + '.html'
	    };
	};
	
	$scope.BlogPosts = [
		addTemplate("generate-entity-sql"),
		addTemplate("business-analysis-paralysis"),
		addTemplate("sql-performance-tips"),
		addTemplate("middle-eastern-scapegoat"),
		addTemplate("an-intro-to-redis"),
		addTemplate('hello-world'),
	];
	
};

spykeBytes.controller('MainCtrl', ['$scope', mainCtrl ]);