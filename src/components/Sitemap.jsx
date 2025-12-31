import React from "react";

// This component will generate a sitemap.xml when visited at /sitemap.xml
// In a real application, you might want to generate this server-side
const Sitemap = () => {
  // This is just a placeholder. In a real app, you'd generate this server-side
  return null;
};

export const getServerSideProps = async ({ res }) => {
  // This would be executed server-side
  const baseUrl = "https://www.richsystemsolutions.com";
  const currentDate = new Date().toISOString();

  const pages = [
    { url: "", priority: "1.00" },
    { url: "about", priority: "0.80" },
    { url: "contact", priority: "0.80" },
    { url: "services", priority: "0.70" },
    { url: "training", priority: "0.70" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
    <url>
      <loc>${baseUrl}/${page.url}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `;
    })
    .join("")}
</urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
