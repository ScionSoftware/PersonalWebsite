using PersonalSite.Extensions;
using PersonalSite.Models;
using System.Linq;
using System.Xml.Linq;

namespace PersonalSite.DataAccess
{
    public class RssAccessor : AccessorBase
    {
        private static BlogAccessor _blogAccessor;

        public RssAccessor(BlogAccessor blogAccessor)
        {
            _blogAccessor = blogAccessor;
        }

        private XElement GetRssBase()
        {
            var directory = FilePath("~/blogs/metadata");

            var path = directory + "\\rss-base.xml";

            var rssBase = XElement.Load(path);

            return rssBase;
        }

        public string GetRssAsText()
        {
            var entries = _blogAccessor.GetOrderedBlogMetadata(withDescription: true);

            var rssItems = entries.Select(i => new RssFeedViewModel()
            {
                Title = i.Title,
                Link = ScionSoftware.Globals.MasterBlogUrl + i.Name,
                Description = i.Description,
                PubDate = i.Published.RssFormat()
            });

            //TODO: use XElement
            const string template = @"
    <item>
        <title>{0}</title>
        <link>{1}</link>
        <description>{2}</description>
        <pubDate>{3}</pubDate>
    </item>";

            var items = "";

            foreach (var rssItem in rssItems)
            {
                items = items + string.Format(template, rssItem.Title, rssItem.Link, rssItem.Description, rssItem.PubDate);
            }

            var rssXml = GetRssBase().ToString();

            rssXml = rssXml.Replace("<items></items>", items);

            return rssXml;
        }
    }
}
