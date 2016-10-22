using System.Text.RegularExpressions;
using System.Web;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public abstract class AbstractFileLoader
    {
        public abstract XElement LoadXmlContent(string relativePathWithoutExtension);
        public abstract string LoadHtmlContent(string relativePathWithoutExtension);
        public abstract string SiteRoot { get; }

        protected string ConvertContent(string content, ContentType contentType)
        {
            if (contentType == ContentType.Markdown)
            {
                var groomedMarkdown = ApplyCustomMarkdown(content);
                var html = CommonMark.CommonMarkConverter.Convert(groomedMarkdown);
                return html;
            }

            return content;
        }

        private string ApplyCustomMarkdown(string content)
        {
            var linkPattern = @"\[([^\]]+)]\(([^\)]+)\)";
            var linkReplacement = @"<a href=""$2"" target=""_blank"">$1</a>";

            content = Regex.Replace(content, linkPattern, linkReplacement);

            var srcPattern = @" src=""/([^""]+)""";
            var srcReplacement = $@" src=""{SiteRoot}/$1""";

            content = Regex.Replace(content, srcPattern, srcReplacement);

            return content;
        }

        protected string LocalFilePath(string webPath)
        {
            return HttpContext.Current.Server.MapPath(webPath);
        }
    }
}