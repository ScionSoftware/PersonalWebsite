using System.Web.Mvc;
using System.Web.Routing;

namespace SpikeBytes
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{action}/{name}",
                defaults: new { controller = "Home", action = "Index", name = UrlParameter.Optional }
            );
        }
    }
}