

var mainCtrl = function ($scope) {
	var index = 0;
	
	var blogTest = function (name) {
		return 
		{ 
			Order: index++, 
			Title: name, 
			Content: 'Lorem ipsum dolor...' 
		}
	};
	
	$scope.BlogPosts = [
		blogTest("Test1"),
		blogTest("Winning"),
		blogTest("Woot woot"),
		blogTest("SOOO WEEEEE"),
	];
	
};

spykeBytes.controller('MainCtrl', ['$scope', mainCtrl ]);