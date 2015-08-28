using System;
using System.Collections.Generic;

namespace PersonalSite.Models
{
    public class BlogMetadataViewModel
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
            Title = Name.GetTitle();
        }

        public string Title { get; private set; }
        public string Description { get; set; }
        public DateTime Published { get; set; }
    }

    public class MonthArchiveViewModel
    {
        public int Month { get; set; }
        public string Text { get; set; }
        public List<BlogMetadataViewModel> Articles { get; set; }
    }

    public class YearArchiveViewModel
    {
        public int Year { get; set; }
        public string Text { get; set; }
        public List<MonthArchiveViewModel> Months { get; set; }
    }

    public class RssFeedViewModel
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public string PubDate { get; set; }
    }
}