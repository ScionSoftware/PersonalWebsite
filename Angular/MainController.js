

var mainCtrl = function ($scope) {
	var index = 0;
	
	var blogTest = function (name) {
	    return {
	        Order: index++,
	        Title: name,
	        Content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	    };
	};
	
	$scope.BlogPosts = [
		blogTest("Test1"),
		blogTest("Winning"),
		blogTest("Woot woot"),
		blogTest("SOOO WEEEEE"),
	];
	
};

spykeBytes.controller('MainCtrl', ['$scope', mainCtrl ]);