using System;
using System.Threading;

namespace PersonalSite.Models
{
    public class BlogViewModel
    {
        private string _name;

        public string Name
        {
            get { return _name; }
            set
            {
                _name = value;
                SetTitle();
            }
        }

        private void SetTitle()
        {
            var formattedTitle = Name.Replace("-", " ");

            var cultureInfo = Thread.CurrentThread.CurrentCulture;
            var textInfo = cultureInfo.TextInfo;

            formattedTitle = textInfo.ToTitleCase(formattedTitle);
        }

        public string Title { get; private set; }

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