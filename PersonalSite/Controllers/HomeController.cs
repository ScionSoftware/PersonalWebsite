using PersonalSite.CustomFilters;
using PersonalSite.DataAccess;
using PersonalSite.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Web.UI;
using System.Xml;
using System.Xml.Linq;

namespace PersonalSite.Controllers
{
    [MasterUrlRedirect]
    public class HomeController : Controller
    {
        private const int PreviewGroupAmount = 2;
        private static BookAccessor _bookAccessor;
        private static BlogAccessor _blogAccessor;
        private static RssAccessor _rssAccessor;

        public HomeController()
        {
            _bookAccessor = new BookAccessor();
            _blogAccessor = new BlogAccessor();
            _rssAccessor = new RssAccessor(_blogAccessor);
        }

        [HttpGet]
        public ActionResult Blog(string name)
        {
            var entry =
                _blogAccessor.GetOrderedBlogMetadata()
                .SingleOrDefault(i => i.Name == name);

            if (entry == null)
            {
                return View(new BlogViewModel()
                {
                    Name = "there-seems-to-be-nothing-here",
                    Published = DateTime.Now.Date,
                    Content = _blogAccessor.GetBlog404(),
                });
            }

            var model = new BlogViewModel()
            {
                Content = _blogAccessor.GetBlogContent(name),
                Name = name,
                Published = entry.Published
            };

            return View(model);
        }

        [HttpGet]
        public ActionResult PreviewBackdoor(string name)
        {
            var entry =
                _blogAccessor.GetOrderedBlogMetadata(allowPreview: true)
                .SingleOrDefault(i => i.Name == name);

            if (entry == null)
            {
                return View("Blog", new BlogViewModel()
                {
                    Name = "there-seems-to-be-nothing-here",
                    Published = DateTime.Now.Date,
                    Content = _blogAccessor.GetBlog404(),
                });
            }

            var model = new BlogViewModel()
            {
                Content = _blogAccessor.GetBlogContent(name),
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
            var model = _bookAccessor.GetOrderedBooks();
            return View(model);
        }

        [HttpGet]
        public JsonResult PreviewsByIndex(int index)
        {
            var entries = _blogAccessor.GetOrderedBlogMetadata();

            var toSkip = PreviewGroupAmount * index;

            var previewsToRetrieve = entries.Skip(toSkip).Take(PreviewGroupAmount);

            var previews =
                previewsToRetrieve
                .Select(i => new BlogViewModel()
                {
                    Name = i.Name,
                    Published = i.Published,
                    Content = _blogAccessor.GetBlogContent(i.Name)
                });

            return Json(previews, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetArchives()
        {
            var archives = _blogAccessor.GetArchives();

            return Json(archives, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult RSS()
        {
            var rssXml = _rssAccessor.GetRssAsText();

            return Content(rssXml, "text/xml");
        }

        [HttpGet]
        public ActionResult Index()
        {
            var entries = _blogAccessor.GetOrderedBlogMetadata();

            var previews = _blogAccessor.GetContentForBlogNames(entries, PreviewGroupAmount);

            var model = new HomeViewModel()
            {
                Metadatas = entries.ToArray(),
                Previews = previews.ToArray(),
            };

            return View(model);
        }
    }
}
