const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");
const checkUsage = require("../../middleware/usageMiddleware");

const axios = require("axios");
const FormData = require("form-data");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware,
  checkUsage("watermark"),

  upload.single("image"),

  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
      // SMART PANEL ANALYSIS
      // const analysis = await analyzeMedia("image", req.file.buffer);
      const apiKey = process.env.LIGHTPDF_API_KEY;

      const formData = new FormData();
      formData.append("file", req.file.buffer, {
        filename: "image.png",
      });

      // STEP 1: Create LightPDF task
      const taskResponse = await axios.post(
        "https://techhk.aoscdn.com/api/tasks/visual/external/watermark-remove",
        formData,
        {
          headers: {
            "X-API-KEY": apiKey,
            ...formData.getHeaders(),
          },
        }
      );

      const taskId = taskResponse.data.data.task_id;

      if (!taskId) {
        return res.status(500).json({ message: "Failed to create LightPDF task" });
      }

      let result = null;

      // STEP 2: Poll for result
      for (let i = 0; i < 30; i++) {
        const check = await axios.get(
          `https://techhk.aoscdn.com/api/tasks/visual/external/watermark-remove/${taskId}`,
          {
            headers: {
              "X-API-KEY": apiKey,
            },
          }
        );

        const state = check.data.data.state;

        if (state === 1) {
          result = check.data.data.file;
          break;
        }

        if (state < 0) {
          return res.status(500).json({ message: "Watermark removal failed" });
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (!result) {
        return res.status(500).json({ message: "Processing timeout" });
      }

      // STEP 3: Download processed image
      const imageResponse = await axios.get(result, {
        responseType: "arraybuffer",
      });

      const processedBuffer = Buffer.from(imageResponse.data);

      // STEP 4: Upload to Cloudinary
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "PixelClean/processedimage" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(processedBuffer).pipe(stream);
      });

      // USAGE TRACKING
      // Increment watermark usage count after successful processing.
      // This helps enforce Free / Pro / Premium limits.
      req.user.usage.watermark += 1;
      await req.user.save();

      res.json({
        success: true,
       // analysis, // Return media analysis data for Smart Panel insights
        imageUrl: uploaded.secure_url,
      });

    } catch (error) {
      console.error("Processing failed:", error);
      res.status(500).json({ message: "Processing failed" });
    }
  }
);

module.exports = router;

