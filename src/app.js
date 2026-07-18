import express from "express";
import axios from "axios";
import * as cheerio from 'cheerio';
const app = express();
app.get("/scrape", async (req, res) => {
  const url = req.query.url;
  const polaEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const polaTelepon = /(?:\(\+?62\)|\+\(62\)|\+?62|0)[\s-]?[0-9]{2,4}[\s-]?[0-9]{3,4}[\s-]?[0-9]{3,4}/g;

  try{
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }
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


    const output = {
      url: url,
      title:  title,
      description: description,
      canonical: canonical,
      favicon: faviconUrl,
      emails: uniqueEmails,
      telepons: uniqueTelepons
    }
    res.status(200).json({ success: true, data: output });
  }
  catch (error) {
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
});
export default app;