using PersonalSite.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public class BookAccessor : AccessorBase
    {
        private readonly AbstractFileLoader _fileLoader;

        public BookAccessor(AbstractFileLoader fileLoader)
        {
            _fileLoader = fileLoader;
        }

        public string GetBookContent(string name)
        {
            var contentPath = $"readings/{name}";

            return _fileLoader.LoadHtmlContent(contentPath);
        }

        public List<BookViewModel> GetOrderedBooks()
        {
            var metadataPath = "readings/metadata/book-metadata.xml";

            var metadata = _fileLoader.LoadXmlContent(metadataPath);

            var entries = metadata.Elements("Entry").Select(n =>
                new BookViewModel()
                {
                    Name = n.Attribute("Name").Value,
                    Content = GetBookContent(n.Attribute("Name").Value)
                }).ToList();
            return entries;
        }
    }
}
