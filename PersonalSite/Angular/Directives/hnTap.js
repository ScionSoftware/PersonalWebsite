
var hnTap = function () {
    return {
        link: function postLink(scope, element, attrs) {
            var tapping = false;
            element.bind('touchstart', function () {
                element.addClass('ng-active').unbind('mouseup');
                tapping = true;
            });
            element.bind('touchmove', function () {
                element.removeClass('ng-active');
                tapping = false;
            });
            element.bind('touchend', function () {
                element.removeClass('ng-active');
                if (tapping) {
                    scope.$apply(attrs.hnTap, element);
                }
            });
            element.bind('mouseup', function () {
                scope.$apply(attrs.hnTap, element);
            });
        }
    };
};

spikeBytes.directive('hnTap', [hnTap]);
