const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");
const { processWatermarkBuffer } = require("./watermarkengine");

// Use memory storage instead of disk
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }


      const inputBuffer = req.file.buffer;


      const processedBuffer = await processWatermarkBuffer(inputBuffer);

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "PixelClean/processed" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(processedBuffer).pipe(stream);
      });


      res.json({
        success: true,
        imageUrl: result.secure_url,
      });

    } catch (error) {
      console.error("Processing failed:", error);
      res.status(500).json({ message: "Processing failed" });
    }
  }
);

module.exports = router;
