const config = {
  siteTitle: "Хроника Артёма Любчука", // Site title.
  siteTitleShort: "Артём Любчук", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Хроника Артёма Любчука (needpower)", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://www.alyubchuk.ru", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "Рассказываю о технологиях, волнениях, опытах и результатах.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  // googleAnalyticsID: "UA-47311644-5", // GA tracking ID.
  // disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  postDefaultCategoryID: "на обдумать", // Default category for posts.
  userEmail: "artemlyubchuk@mail.ru", // Email used for RSS feed's author segment
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "VK",
      url: "https://vk.com/id91858750",
      iconClassName: "fa fa-vk",
    },
    {
      label: "Email:",
      description: "artemlyubchuk@mail.ru (лучше сюда, просматриваю регулярно)",
      url: "mailto:artemlyubchuk@mail.ru",
      iconClassName: "fa fa-envelope",
    },
  ],
  copyright: "Артём (needpower). Права не защищал. Спиздите, если хочется.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "rgba(97,98,71,1)", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
}

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = ""
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`

module.exports = config
