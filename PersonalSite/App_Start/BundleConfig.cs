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
            var javascriptBundle = new ScriptBundle("~/bundle-javascript")
            .Include(
                "~/js/angular.min.js",
                "~/js/angular-route.min.js",
                "~/js/angular-touch.min.js",
                "~/Angular/SpikeBytes.js",
                "~/Angular/Services/BlogService.js",
                "~/Angular/MainController.js",
                "~/Angular/MenuController.js",
                "~/Angular/ResumeController.js",
                "~/Angular/BlogArchiveController.js",
                "~/Angular/directives/hnTap.js",
                "~/Angular/directives/ssSocialShare.js",
                "~/Angular/directives/ssBlogArchive.js",
                "~/Scripts/jquery-2.1.1.js"
            );

            //var cssBundle =
            //    new StyleBundle("~/bundles/css")
            //   .Include(
            //   "~/Content/css/reset.css",
            //   "~/Content/css/grid.css",
            //   "~/Content/css/general.css"ss"
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