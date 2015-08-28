using System.Web.Optimization;

//[assembly: WebActivator.PreApplicationStartMethod(typeof(Portal_Web.BundleConfig), "Register")]

namespace Portal_Web
{
    public static class BundleConfig
    {
        public static void Register()
        {
            RegisterBundles(BundleTable.Bundles);
        }

        /// <summary>
        /// Creates Bundles of in order js and css files for minification
        /// If in debug all files will be rendered as individual file references for debugging
        /// </summary>
        /// <param name="bundles"></param>
        private static void RegisterBundles(BundleCollection bundles)
        {
            var javascriptBundle = new ScriptBundle("~/javascript-bundle")
            .Include(
                "~/js/angular.min.js",
                "~/js/angular-route.min.js",
                "~/js/angular-touch.min.js",
                "~/angular/SpikeBytes.js",
                "~/angular/services/BlogService.js",
                "~/angular/services/ReadingService.js",
                "~/angular/MainController.js",
                "~/angular/BlogController.js",
                "~/angular/AboutController.js",
                "~/angular/ResumeController.js",
                "~/angular/ReadingController.js",
                "~/Angular/MenuController.js",
                "~/Angular/BlogArchiveController.js",
                "~/angular/directives/hnTap.js",
                "~/angular/directives/ssSocialShare.js",
                "~/angular/directives/ssBlogArchive.js",
                "~/Scripts/jquery-2.1.1.js"
            );

            //var cssBundle =
            //    new StyleBundle("~/bundles/css")
            //   .Include(
            //   "~/Content/css/reset.css",
            //   "~/Content/css/grid.css",
            //   "~/Content/css/general.css",
            //   "~/Content/css/styles.css",
            //   "~/Content/css/menu.css",
            //   "~/Content/css/buttons.css",
            //   "~/Content/css/forms.css",
            //   "~/Content/css/tables.css",
            //   "~/Content/css/visualize.css",
            //   "~/Content/css/colorbox.css",
            //   "~/Content/css/prettyPhoto.css",
            //   "~/Content/css/jqueryui-timepicker.css"
            //   );

            bundles.Add(javascriptBundle);
            //bundles.Add(cssBundle);

            // Uncomment this to force the Bundling and Minification, 
            // otherwise Web.config debug="true" will be used to determine weather to minify

            //**************************************//
            //BundleTable.EnableOptimizations = true;
            //**************************************//
        }
    }
}