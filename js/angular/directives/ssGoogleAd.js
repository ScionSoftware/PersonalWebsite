(function (ng) {
    'use strict';

    var ssGoogleAd = function () {
        return {
            templateUrl: '/js/angular/directives/templates/ssGoogleAd.html' + siteVer,
            scope: {
                ssClass: '@attrClass',
                ssAdSlot: '@attrAdSlot',
            },
            link: function (scope, elm, attrs) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            },
            replace: true,
        };
    };

    ng.module('SpikeBytes').directive('ssGoogleAd', [ssGoogleAd]);

}(angular));