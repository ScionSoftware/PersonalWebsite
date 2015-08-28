using System.Web;

namespace PersonalSite.DataAccess
{
    public abstract class AccessorBase
    {
        protected string FilePath(string webPath)
        {
            return HttpContext.Current.Server.MapPath(webPath);
        }
    }
}
