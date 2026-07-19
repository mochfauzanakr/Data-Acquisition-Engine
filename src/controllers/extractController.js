import { extractMetadata } from "../services/extractService.js";

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
