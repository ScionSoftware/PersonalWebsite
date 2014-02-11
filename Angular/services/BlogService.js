var blogApiInstance = function ($http) {

    return {
        getBlogs: function (playerId) {
            var addTemplate = function (templateTitle) {
                return {
                    Title: templateTitle,
                    Template: '/blogs/' + templateTitle + '.html'
                };
            };

            return [
		        addTemplate("chess-sharp-beta"),
		        addTemplate("generate-entity-sql"),
		        addTemplate("business-analysis-paralysis"),
		        addTemplate("computer-science-terms-1"),
		        addTemplate("sql-performance-tips"),
		        addTemplate("middle-eastern-scapegoat"),
		        addTemplate("too-little-butter-too-much-bread"),
		        addTemplate("an-intro-to-redis"),
		        addTemplate('hello-world'),
            ];
        },
        //getGame: function (gameId, onSuccess, onFailure) {
        //    $http({
        //        method: 'GET',
        //        url: '/ChessApi/GetGame/' + gameId
        //    })
        //        .success(function (data) {
        //            onSuccess(data);
        //        })
        //        .error(function (data) {
        //            onFailure(data);
        //        });
        //},
    };
};

spykeBytes.factory('blogApi', ['$http', blogApiInstance]);