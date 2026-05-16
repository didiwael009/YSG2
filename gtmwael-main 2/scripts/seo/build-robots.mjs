// Generates robots.txt for the static build.
export const buildRobots = (siteUrl) => `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /preview/
Disallow: /test/
Disallow: /draft/

Sitemap: ${siteUrl}/sitemap.xml
`;
