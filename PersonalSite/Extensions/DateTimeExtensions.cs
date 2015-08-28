using System;

namespace PersonalSite.CustomFilters
{
    public static class DateTimeExtensions
    {
        /// <summary>
        /// DateString.
        /// </summary>
        public static string RssFormat(this DateTime pubDate)
        {
            var value = pubDate.ToString("ddd',' d MMM yyyy HH':'mm':'ss") +
                " " +
                pubDate.ToString("zzzz").Replace(":", "");

            //value = pubDate.ToString("r");

            return value;
        }
    }
}