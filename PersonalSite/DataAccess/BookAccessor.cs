using PersonalSite.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public class BookAccessor : AccessorBase
    {
        public string GetBookContent(string name)
        {
            var blogDirectory = FilePath("~/readings");

            var potentialEntry = blogDirectory + "\\" + name + ".html";

            if (!System.IO.File.Exists(potentialEntry))
                return null;

            var content = System.IO.File.ReadAllText(potentialEntry);

            return content;
        }

        public List<BookViewModel> GetOrderedBooks()
        {
            var metadataDirectory = FilePath("~/readings/metadata");

            var metadataPath = metadataDirectory + "/book-metadata.xml";

            var blogMetaData = XElement.Load(metadataPath);

            var entries = blogMetaData.Elements("Entry").Select(n =>
                new BookViewModel()
                {
                    Name = n.Attribute("Name").Value,
                    Content = GetBookContent(n.Attribute("Name").Value)
                }).ToList();
            return entries;
        }
    }
}
