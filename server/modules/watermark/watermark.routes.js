const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { processWatermark } = require("./watermarkengine");
const upload = multer({ dest: "uploads/" });
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const inputPath = req.file.path;
    const outputDir = path.join(__dirname, "../../processed");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const filename = `output-${Date.now()}.png`;
    const outputPath = path.join(outputDir, filename);
    await processWatermark(inputPath, outputPath);
    fs.unlinkSync(inputPath);
    res.json({success: true,filename,});
  } catch (error) {
    console.error("Processing failed:", error);
    res.status(500).json({ message: "Processing failed" });
  }
});
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname,"../../processed",req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath);
});
module.exports = router;