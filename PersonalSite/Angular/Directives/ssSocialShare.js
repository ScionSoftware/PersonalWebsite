var ssSocialShare = function () {
    return {
        templateUrl: '/Angular/Directives/Templates/ssSocialShare.html',
        scope: {
            ssUrl: '@',
            ssTitle: '@'
        },
        link: function postLink(scope, element, attrs) {

        }
    };
};

spikeBytes.directive('ssSocialShare', [ssSocialShare]);
