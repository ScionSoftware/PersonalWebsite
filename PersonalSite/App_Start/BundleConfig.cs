using System.Web.Optimization;

//[assembly: WebActivator.PreApplicationStartMethod(typeof(Portal_Web.BundleConfig), "Register")]

namespace PersonalSite
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
            var javascript = new ScriptBundle("~/bundle-javascript");

            javascript.Include(
                "~/js/angular.js",
                "~/js/angular-route.js",
                "~/js/angular-touch.js",
                "~/Scripts/jquery-2.1.1.js"
            );

            IncludeModules(javascript);
            IncludeApplication(javascript);
            IncludeExamples(javascript);

            bundles.Add(javascript);

            //var cssBundle =
            //    new StyleBundle("~/bundles/css")
            //   .Include(
            //   "~/Content/css/reset.css",
            //   "~/Content/css/grid.css",
            //   "~/Content/css/general.css"ss"
            //   );

            //bundles.Add(cssBundle);

            // Uncomment this to force the Bundling and Minification locally

            //**************************************//
            //BundleTable.EnableOptimizations = true;
            //**************************************//
        }

        private static void IncludeModules(ScriptBundle javascript)
        {
            javascript.Include(
                "~/js/examples/save-state/angular-local-storage.js"
            );
        }

        private static void IncludeApplication(ScriptBundle javascript)
        {
            javascript.Include(
                "~/Angular/SpikeBytes.js",
                "~/Angular/Services/BlogService.js",
                "~/Angular/MainController.js",
                "~/Angular/MenuController.js",
                "~/Angular/ResumeController.js",
                "~/Angular/BlogArchiveController.js",
                "~/Angular/directives/hnTap.js",
                "~/Angular/directives/ssSocialShare.js",
                "~/Angular/directives/ssBlogArchive.js"
            );
        }

        private static void IncludeExamples(ScriptBundle javascript)
        {
            javascript.Include(
                "~/js/examples/save-state/saveStateController.js"
            );
        }
    }
}