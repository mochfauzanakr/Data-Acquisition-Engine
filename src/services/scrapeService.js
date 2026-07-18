import axios from "axios";
import * as cheerio from 'cheerio';

export const extractMetadata = async (url) => {
  const polaEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const polaTelepon = /(?:\(\+?62\)|\+\(62\)|\+?62|0)[\s-]?[0-9]{2,4}[\s-]?[0-9]{3,4}[\s-]?[0-9]{3,4}/g;

  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const title = $('title').text();
  const description = $('meta[name="description"]').attr('content');
  const canonical = $('link[rel="canonical"]').attr('href');
  const favicon = $('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').attr('href');
  const faviconUrl = favicon ? new URL(favicon, url).href : "";
  const body = $('body').html().replace(/<[^>]+>/g, ' ');
  const emailMatches = body.match(polaEmail) || [];
  const uniqueEmails = [...new Set(emailMatches)];
  const teleponMatches = body.match(polaTelepon) || [];
  const uniqueTelepons = [...new Set(teleponMatches)];
  const socialMediaLinks = $('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="instagram.com"], a[href*="linkedin.com"]').map((i, el) => $(el).attr('href')).get();
  const uniqueSocialMediaLinks = [...new Set(socialMediaLinks)];
  const openGraphTitle = $('meta[property="og:title"]').attr('content');
  const openGraphDescription = $('meta[property="og:description"]').attr('content');
  const openGraphImage = $('meta[property="og:image"]').attr('content');

  const output = {
    url: url,
    title: title,
    description: description,
    canonical: canonical,
    favicon: faviconUrl,
    emails: uniqueEmails,
    telepons: uniqueTelepons,
    socialMediaLinks: uniqueSocialMediaLinks,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      image: openGraphImage
    }
  }
  return output;
};