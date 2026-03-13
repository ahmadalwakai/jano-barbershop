/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.jan-o.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/admin", "/admin/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/admin", "/_next"],
      },
    ],
    additionalSitemaps: [],
  },
};
