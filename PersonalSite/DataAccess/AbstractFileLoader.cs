using System.Web;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public abstract class AbstractFileLoader
    {
        public abstract XElement LoadXmlContent(string relativePathWithoutExtension);
        public abstract string LoadHtmlContent(string relativePathWithoutExtension);

        protected string ConvertContent(string content, ContentType contentType)
        {
            if (contentType == ContentType.Markdown)
            {
                var html = CommonMark.CommonMarkConverter.Convert(content);
                return html;
            }

            return content;
        }

        protected string LocalFilePath(string webPath)
        {
            return HttpContext.Current.Server.MapPath(webPath);
        }
    }
}