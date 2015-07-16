using System;
using System.Web.Mvc;
using System.Text.RegularExpressions;
using System.Linq;

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
                "www.higginsninja"
            };

            var shouldRedirect = redirectPatterns.Any(i => requestUrl.Host.Contains(i));

            if (shouldRedirect)
            {
                var redirectUrl = "http://higginsninja.net" + requestUrl.PathAndQuery;

                filterContext.Result = new RedirectResult(redirectUrl, permanent: true);
            }
        }
    }
}