

var mainCtrl = function ($scope, blogApi) {

    $scope.displayed = $scope.displayed || [];
    $scope.previewGroup = 1;
    $scope.previewGroupMaximum = null;

    $scope.test = function() {
        console.log('wooo');
    };

    $scope.showMoreBlogs = function () {

        if ($scope.outOfPreviews) {
            return;
        }

        var attachToDisplayed = function (previews) {

            if (!previews || previews.length === 0) {
                $scope.outOfPreviews = true;
            }

            for (var i = 0; i < previews.length; i++) {
                $scope.displayed.push(previews[i]);
            }
        };

        var onFailure = function () {

            throw new Error('Blog retrieval failed for preview group ' + $scope.previewGroup);
        };

        blogApi
            .getPreviewsByGroupIndex($scope.previewGroup++)
            .then(attachToDisplayed);

    };
};

spikeBytes.controller('MainCtrl', ['$scope', 'blogApi', mainCtrl]);