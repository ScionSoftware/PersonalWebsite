

var blogArchiveController = function ($scope, $http, $q) {

    var getArchive = function () {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: '/GetArchives'
        })
            .success(function (archive) {
                deferred.resolve(archive);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    }

    $scope.setAll = function (open, startMonthsOpen) {
        for (var y = 0; y < $scope.years.length; y++) {
            $scope.years[y].open = open;

            for (var m = 0; m < $scope.years[y].Months.length; m++) {
                $scope.years[y].Months[m].open = open || startMonthsOpen;
            }
        }
    };

    getArchive().then(function (archive) {
        $scope.years = archive;
        $scope.setAll(false, true);
    });

    $scope.toggleItem = function (item) {
        item.open = !item.open;
    };
};

spikeBytes.controller('BlogArchiveController', ['$scope', '$http', '$q', blogArchiveController]);

