import app from "./src/app.js";
import dotenv from "dotenv/config";

const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Started at: ${new Date().toLocaleString()}\n`);
  });

export default app;