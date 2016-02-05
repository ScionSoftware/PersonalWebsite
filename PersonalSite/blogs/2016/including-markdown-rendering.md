I finally decided that I would like to have markdown rendering for my stinky little custom blog engine.

This article is my first one in markdown. The first guinea pig is an article about supporting markdown!

Anyways, it was incredibly easy to do.

### The NuGet Package

I installed the [CommonMark.NET nuget package](https://www.nuget.org/packages/CommonMark.NET/) into my project.

Then I put in a coalesce operator to grab the content and process the markdown if the html content doesn't already exist.

### The Code
```C#
    public string GetBlogContent(string name)
    {
        var metadatum = GetOrderedBlogMetadata();
    
        var metadata = metadatum.Single(i => i.Name == name);
    
        var blogDirectory = FilePath("~/blogs/" + metadata.Published.Year + "/");
    
        var potentialEntry = blogDirectory + "\\" + name;
    
        var content = 
            GetHtmlContent(potentialEntry) 
            ?? GetMarkdownContent(potentialEntry);
    
        return content;
    }
    
    private static string GetHtmlContent(string pathWithoutExtension)
    {
        var filePath = pathWithoutExtension + ".html";
        if (File.Exists(filePath))
            return File.ReadAllText(filePath);
    
        return null;
    }
    
    private static string GetMarkdownContent(string pathWithoutExtension)
    {
        var filePath = pathWithoutExtension + ".md";
        if (File.Exists(filePath))
        {
            var markdown = File.ReadAllText(filePath);
            var html = CommonMark.CommonMarkConverter.Convert(markdown);
            return html;
        }
    
        return null;
    }
```

### Check it out
This is the [github repository for the CommonMark.NET project](https://github.com/Knagis/CommonMark.NET).

See? Easy stuff! Until next time, be well!
