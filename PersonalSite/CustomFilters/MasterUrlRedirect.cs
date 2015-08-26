using System.Web.Mvc;
using System.Linq;

namespace PersonalSite.CustomFilters
{
    public class MasterUrlRedirect : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var requestUrl = filterContext.RequestContext.HttpContext.Request.Url;
            var masterUrl = "scionsoftware.com";
            
            var redirectPatterns = new[]
            {
                "spykebytes.me",
                "spykebytes.com",
                "higginsninja.",
                "www.scionsoftware",
                "scionsoftware.co",
                "scionsoftware.us",
                "scionsoftware.net"
            };

            var shouldRedirect =
                redirectPatterns.Any(i => requestUrl.Host.Contains(i))
                && !requestUrl.Host.Contains(masterUrl);

            if (shouldRedirect)
            {
                var redirectUrl = "http://" + masterUrl + requestUrl.PathAndQuery;

                filterContext.Result = new RedirectResult(redirectUrl, permanent: true);
            }
        }
    }
}