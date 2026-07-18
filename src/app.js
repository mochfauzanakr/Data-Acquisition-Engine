import express from "express";
import axios from "axios";
import * as cheerio from 'cheerio';
const app = express();
app.get("/scrape", async (req, res) => {
  const url = req.query.url;

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


    const output = {
      url: url,
      title:  title,
      description: description,
      canonical: canonical,
      favicon: faviconUrl
    }
    res.status(200).json({ success: true, data: output });
  }
  catch (error) {
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
});
export default app;