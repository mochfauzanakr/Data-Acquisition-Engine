import { extractWebsite } from "../services/scrapeService.js";
import { extractDomain } from "../services/domainService.js";

export const extractWebMetadata = async (req, res) => {
  const url = req.body.url;

  try {
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const output = await extractMetadata(url);
    res.status(200).json({ success: true, data: output });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
};

export const extractDomainMetadata = async (req, res) => {
  const domain = req.body.domain;

  try {
    if (!domain) {
      return res.status(400).json({ error: "Domain parameter is required" });
    }

    const output = await extractDomain(domain);
    res.status(200).json({ success: true, data: output });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while processing the request" });
  }
};
