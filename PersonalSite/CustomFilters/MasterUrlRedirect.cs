using System.Web.Mvc;
using System.Linq;
using ScionSoftware;

namespace PersonalSite.CustomFilters
{
    public class MasterUrlRedirect : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var requestUrl = filterContext.RequestContext.HttpContext.Request.Url;
            
            var redirectPatterns = new[]
            {
                "spykebytes.me",
                "spykebytes.com",
                "higginsninja.",
                "scionsoftware.co",
                "scionsoftware.us",
                "scionsoftware.net"
            };

            var hasWww = requestUrl.Host.Contains("www.");

            var shouldRedirect =
                redirectPatterns.Any(i => requestUrl.Host.Contains(i))
                && !requestUrl.Host.Contains(Globals.MasterUrlWithoutProtocol);

            if (shouldRedirect || hasWww)
            {
                var redirectUrl = Globals.MasterUrl + requestUrl.PathAndQuery;

                filterContext.Result = new RedirectResult(redirectUrl, permanent: true);
            }
        }
    }
}