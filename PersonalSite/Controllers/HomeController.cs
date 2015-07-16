using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI;
using System.Xml.Linq;
using PersonalSite.Models;
using PersonalSite.CustomFilters;

namespace PersonalSite.Controllers
{
    [MasterUrlRedirect]
    public class HomeController : Controller
    {
        private const int PreviewGroupAmount = 3;

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
        public ActionResult About()
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
        public ActionResult Index()
        {
            var entries = GetOrderedBlogMetadata();

            var previews = GetContentForBlogNames(entries, 3);

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

        private BlogMetadataViewModel[] GetOrderedBlogMetadata()
        {
            var metadataDirectory = Server.MapPath("~/blogs/metadata");

            var metadataPath = metadataDirectory + "/blog-metadata.xml";

            var blogMetaData = XElement.Load(metadataPath);

            var entries = blogMetaData.Elements("Entry").Select(n =>
                new BlogMetadataViewModel()
                {
                    Name = n.Attribute("Name").Value,
                    Published = DateTime.Parse(n.Attribute("Published").Value)
                })
                .Where(i => i.Published <= DateTime.Now)
                .ToArray();

            return entries;
        }
    }
}
