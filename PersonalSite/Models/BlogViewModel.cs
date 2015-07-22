using System;

namespace PersonalSite.Models
{
    public class BlogViewModel
    {
        public string Name { get; set; }

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