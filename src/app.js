import express from "express";
import routes from "./routes/extractRoute.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
app.use(express.json());
app.use(rateLimiter);
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running" });
});

export default app;