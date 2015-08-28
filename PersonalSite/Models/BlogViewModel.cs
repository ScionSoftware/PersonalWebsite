using System;
using System.Threading;

namespace PersonalSite.Models
{
    public static class StringExtensions
    {
        public static string GetTitle(this string value)
        {
            var formattedTitle = value.Replace("-", " ");

            var cultureInfo = Thread.CurrentThread.CurrentCulture;
            var textInfo = cultureInfo.TextInfo;

            formattedTitle = textInfo.ToTitleCase(formattedTitle);

            return formattedTitle;
        }
    }

    public class BlogViewModel : BlogMetadataViewModel
    {
        public string DisplayName { get; set; }

        private DateTime _published;

        public DateTime Published
        {
            get
            {
                return _published;
            }
            set
            {
                _published = value;
                PublishedDisplay = _published.ToString("MMMM d, yyyy");
            }
        }

        public string Content { get; set; }

        public string PublishedDisplay { get; private set; }

        public bool IsPreviewOnly { get; set; }
    }
}