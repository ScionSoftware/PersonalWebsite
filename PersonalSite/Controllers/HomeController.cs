using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI;
using System.Xml.Linq;
using PersonalSite.Models;
using PersonalSite.CustomFilters;
using System.Globalization;
using System.Xml;
using System.Text.RegularExpressions;

namespace PersonalSite.Controllers
{
    [MasterUrlRedirect]
    public class HomeController : Controller
    {
        private const int PreviewGroupAmount = 2;

        [HttpGet]
        public ActionResult Blog(string name)
        {
            var entry =
                GetOrderedBlogMetadata()
                .SingleOrDefault(i => i.Name == name);

            if (entry == null)
            {
                return View(new BlogViewModel()
                {
                    Name = "there-seems-to-be-nothing-here",
                    Published = DateTime.Now.Date,
                    Content = GetBlogContent("_404_blog"),
                });
            }

            var model = new BlogViewModel()
            {
                Content = GetBlogContent(name),
                Name = name,
                Published = entry.Published
            };

            return View(model);
        }

        [HttpGet]
        public ActionResult PreviewBackdoor(string name)
        {
            var entry =
                GetOrderedBlogMetadata(allowPreview: true)
                .SingleOrDefault(i => i.Name == name);

            if (entry == null)
            {
                return View("Blog", new BlogViewModel()
                {
                    Name = "there-seems-to-be-nothing-here",
                    Published = DateTime.Now.Date,
                    Content = GetBlogContent("_404_blog"),
                });
            }

            var model = new BlogViewModel()
            {
                Content = GetBlogContent(name),
                Name = name,
                Published = entry.Published,
                IsPreviewOnly = true,
            };

            return View("Blog", model);
        }

        [HttpGet]
        public ActionResult About()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Archive()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Resume()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Reading()
        {
            var model = GetOrderedBooks();
            return View(model);
        }

        [HttpGet]
        public JsonResult PreviewsByIndex(int index)
        {
            var entries = GetOrderedBlogMetadata();

            var toSkip = PreviewGroupAmount * index;

            var previewsToRetrieve = entries.Skip(toSkip).Take(PreviewGroupAmount);

            var previews =
                previewsToRetrieve
                .Select(i => new BlogViewModel()
                {
                    Name = i.Name,
                    Published = i.Published,
                    Content = GetBlogContent(i.Name)
                });

            return Json(previews, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetArchives()
        {
            var entries = GetOrderedBlogMetadata();

            var archives = new List<YearArchiveViewModel>();
            var mfi = new DateTimeFormatInfo();

            foreach (var entry in entries)
            {
                var yearItem = archives.SingleOrDefault(i => i.Year == entry.Published.Year);

                if (yearItem == null)
                {
                    yearItem = new YearArchiveViewModel()
                    {
                        Year = entry.Published.Year,
                        Text = entry.Published.Year.ToString(),
                        Months = new List<MonthArchiveViewModel>()
                    };

                    archives.Add(yearItem);
                }

                var monthItem = yearItem.Months.SingleOrDefault(i => i.Month == entry.Published.Month);

                if (monthItem == null)
                {
                    monthItem = new MonthArchiveViewModel()
                    {
                        Month = entry.Published.Month,
                        Text = mfi.GetMonthName(entry.Published.Month),
                        Articles = new List<BlogMetadataViewModel>()
                    };

                    yearItem.Months.Add(monthItem);
                }

                monthItem.Articles.Add(entry);
            }

            return Json(archives, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult RSS()
        {
            var entries = GetOrderedBlogMetadata(withDescription: true);

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

            return Content(rssXml, "text/xml");
        }

        [HttpGet]
        public ActionResult Index()
        {
            var entries = GetOrderedBlogMetadata();

            var previews = GetContentForBlogNames(entries, PreviewGroupAmount);

            var model = new HomeViewModel()
            {
                Metadatas = entries,
                Previews = previews.ToArray(),
            };

            return View(model);
        }

        private string GetBlogContent(string name)
        {
            var blogDirectory = Server.MapPath("~/blogs");

            var potentialEntry = blogDirectory + "\\" + name + ".html";

            if (!System.IO.File.Exists(potentialEntry))
                return null;

            var content = System.IO.File.ReadAllText(potentialEntry);

            return content;
        }

        private string GetBookContent(string name)
        {
            var blogDirectory = Server.MapPath("~/readings");

            var potentialEntry = blogDirectory + "\\" + name + ".html";

            if (!System.IO.File.Exists(potentialEntry))
                return null;

            var content = System.IO.File.ReadAllText(potentialEntry);

            return content;
        }

        private List<BookViewModel> GetOrderedBooks()
        {
            var metadataDirectory = Server.MapPath("~/readings/metadata");

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

        private List<BlogViewModel> GetContentForBlogNames(IEnumerable<BlogMetadataViewModel> entries, int amount)
        {
            var previews = new List<BlogViewModel>();

            foreach (var entry in entries)
            {
                amount--;

                var content = GetBlogContent(entry.Name);

                if (content != null)
                    previews.Add(new BlogViewModel()
                    {
                        Content = content,
                        Name = entry.Name,
                        Published = entry.Published
                    });

                if (amount < 1)
                    break;
            }

            return previews;
        }

        private XElement GetRssBase()
        {
            var directory = Server.MapPath("~/blogs/metadata");

            var path = directory + "/rss-base.xml";

            var rssBase = XElement.Load(path);

            return rssBase;
        }

        private BlogMetadataViewModel[] GetOrderedBlogMetadata(bool allowPreview = false, bool withDescription = false)
        {
            var metadataDirectory = Server.MapPath("~/blogs/metadata");

            var metadataPath = metadataDirectory + "/blog-metadata.xml";

            var blogMetaData = XElement.Load(metadataPath);

            var entries =
                blogMetaData.Elements("Entry").Select(n =>
                    new BlogMetadataViewModel()
                    {
                        Name = n.Attribute("Name").Value,
                        Published = DateTime.Parse(n.Attribute("Published").Value),
                        Description = withDescription ? Regex.Replace(n.Element("Description").Value, @"\s+", " ") : null
                    })
                    .Where(i => i.Published <= DateTime.Now || allowPreview)
                    .ToArray();

            return entries;
        }
    }
}
