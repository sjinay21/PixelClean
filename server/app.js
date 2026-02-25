const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./core/auth/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const watermarkRoutes = require("./modules/watermark/watermark.routes");
const blogRoutes = require("./modules/blog/blog.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/processed", express.static(path.join(__dirname, "processed")));
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/watermark", watermarkRoutes);
app.use("/api/blogs", blogRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = app;
