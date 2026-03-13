const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./core/auth/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const watermarkRoutes = require("./modules/watermark/watermark.routes");
const enhanceRoutes = require("./modules/enhance/enhance.routes");
const pdfRoutes = require("./modules/pdf/pdf.routes");
const backgroundRoutes = require("./modules/background/background.routes");
const videoRoutes = require("./modules/video/video.routes");
const logoRoutes = require("./modules/logo/logo.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/processed", express.static(path.join(__dirname, "processed")));
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/watermark", watermarkRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/enhance", enhanceRoutes);
app.use("/api/background", backgroundRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/logo", logoRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = app;
