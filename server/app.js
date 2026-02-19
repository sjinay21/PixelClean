const express = require("express");
const cors = require("cors");
const authRoutes = require("./core/auth/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const watermarkRoutes = require("./modules/watermark/watermark.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/watermark", watermarkRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = app;


