spikeBytes.filter('unsafe', ['$sce', function ($sce) { return $sce.trustAsHtml; }]);

var blogApiInstance = function ($http, $q) {

    return {
        getPreviews: function (blogNames) {

            var nameParameter = blogNames.join(',');

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/Previews?names=' + nameParameter
            })
                .success(function (previews) {
                    deferred.resolve(previews);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },
        getPreviewsByGroupIndex: function (groupIndex) {

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/PreviewsByIndex?index=' + groupIndex
            })
                .success(function (previews) {
                    deferred.resolve(previews);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    };
};

spikeBytes.factory('blogApi', ['$http', '$q', blogApiInstance]);
