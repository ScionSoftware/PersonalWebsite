using System;
using System.Net;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public class GithubFileLoader : AbstractFileLoader
    {
        public override XElement LoadXmlContent(string relativePathWithoutExtension)
        {
            var xmlUrl = FilePath($"/{relativePathWithoutExtension}");
            var xml = GetFileContentFromWeb(xmlUrl);
            return XElement.Parse(xml);
        }

        public override string LoadHtmlContent(string relativePathWithoutExtension)
        {
            var htmlPath = FilePath($"/{relativePathWithoutExtension}.html");
            var markdownPath = FilePath($"/{relativePathWithoutExtension}.md");

            var content = GetFileContentFromWeb(htmlPath) ?? GetFileContentFromWeb(markdownPath);

            return ConvertContent(content, ContentType.Markdown);
        }

        protected string GetFileContentFromWeb(string url)
        {
            try
            {
                using (var client = new WebClient())
                {
                    var content = client.DownloadString(url);
                    return content;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        protected string FilePath(string webPath)
        {
            webPath = webPath.Replace("\\", "/");
            var basePath = "https://raw.githubusercontent.com/colin-higgins/PersonalWebsite/master/PersonalSite";
            return $"{basePath}{webPath}";
        }
    }
}