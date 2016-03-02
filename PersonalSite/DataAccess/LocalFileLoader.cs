using System.IO;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public class LocalFileLoader : AbstractFileLoader
    {
        public override XElement LoadXmlContent(string relativePathWithoutExtension)
        {
            var xmlPath = LocalFilePath($"~/{relativePathWithoutExtension}");
            return XElement.Load(xmlPath);
        }

        public override string LoadHtmlContent(string relativePathWithoutExtension)
        {
            var htmlPath = LocalFilePath($"~/{relativePathWithoutExtension}.html");
            var markdownPath = LocalFilePath($"~/{relativePathWithoutExtension}.md");

            if (File.Exists(htmlPath))
            {
                return ConvertContent(File.ReadAllText(htmlPath), ContentType.Html);
            }

            if (File.Exists(markdownPath))
            {
                return ConvertContent(File.ReadAllText(markdownPath), ContentType.Html);
            }

            return null;
        }
    }
}