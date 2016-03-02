using System;
using System.IO;
using System.Net;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public class GithubFileLoader : AbstractFileLoader
    {
        public override XElement LoadXmlContent(string relativePathWithoutExtension)
        {
            var xmlUrl = FilePath("/" + relativePathWithoutExtension + "");
            var xml = GetFileContentFromWeb(xmlUrl);
            return XElement.Parse(xml);
        }

        public override string LoadHtmlContent(string relativePathWithoutExtension)
        {
            var htmlPath = FilePath("/" + relativePathWithoutExtension + ".html");
            var markdownPath = FilePath("/" + relativePathWithoutExtension + ".md");

            var content = GetFileContentFromWeb(htmlPath) ?? GetFileContentFromWeb(markdownPath);

            return ConvertContent(content, ContentType.Markdown);
        }

        private string TryGetFromCache(string url)
        {
            var cachePath = GetCachePath(url);

            if (!File.Exists(cachePath))
            {
                return null;
            }

            if (CacheHasExpired(cachePath))
            {
                return null;
            }

            var content = File.ReadAllText(cachePath);

            return content;
        }

        private static bool CacheHasExpired(string cachePath)
        {
            var cacheAgeLimit = TimeSpan.FromHours(3);

            var creationTime = File.GetCreationTimeUtc(cachePath);
            var fileAge = DateTime.Now.ToUniversalTime() - creationTime;
            if (fileAge > cacheAgeLimit)
            {
                File.Delete(cachePath);
                return true;
            }
            return false;
        }

        private void Cache(string url, string content)
        {
            var cachePath = GetCachePath(url);

            File.WriteAllText(cachePath, content);
        }

        private string GetCachePath(string content)
        {
            var safeFileName =
                content
                    .Replace("/", "_")
                    .Replace(".", "_")
                    .Replace(":", "_");

            var cachePath = LocalFilePath("~/file-cache/" + safeFileName);
            return cachePath;
        }

        protected string GetFileContentFromWeb(string url)
        {
            try
            {
                var content = TryGetFromCache(url);

                if (content == null)
                {
                    using (var client = new WebClient())
                    {
                        content = client.DownloadString(url);
                    }

                    Cache(url, content);
                }

                return content;
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
            return basePath + webPath;
        }
    }
}