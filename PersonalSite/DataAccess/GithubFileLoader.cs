using System;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public class GithubFileLoader : AbstractFileLoader
    {
        public override XElement LoadXmlContent(string relativePathWithoutExtension)
        {
            var xmlPath = FilePath($"/{relativePathWithoutExtension}.xml");
            return XElement.Load(xmlPath);
        }

        public override string LoadHtmlContent(string relativePathWithoutExtension)
        {
            var htmlPath = FilePath($"/{relativePathWithoutExtension}.html");
            var markdownPath = FilePath($"/{relativePathWithoutExtension}.md");

            if (Exists(htmlPath))
            {
                return ConvertContent(GetFileContentFromWeb(htmlPath), ContentType.Html);
            }

            if (Exists(markdownPath))
            {
                return ConvertContent(GetFileContentFromWeb(markdownPath), ContentType.Html);
            }

            return null;
        }

        protected bool Exists(string url)
        {
            throw new NotImplementedException();
        }

        protected string GetFileContentFromWeb(string url)
        {
            throw new NotImplementedException();
        }

        protected string FilePath(string webPath)
        {
            var basePath = "https://github.com/colin-higgins/PersonalWebsite/tree/master/PersonalSite";
            return $"{basePath}{webPath}";
        }
    }
}