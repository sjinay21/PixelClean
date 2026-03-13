const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");
const checkUsage = require("../../middleware/usageMiddleware");
//const analyzeMedia = require("../../services/mediaAnalysis.service");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware,
  checkUsage("enhance"),
  upload.single("image"),
  async (req, res) => {

    const tempInput = path.join(os.tmpdir(), `enh_in_${Date.now()}.png`);
    const tempOutput = path.join(os.tmpdir(), `enh_out_${Date.now()}.png`);

    try {

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
      // const analysis = await analyzeMedia("image");
      const scale = req.body.scale || 2;

      fs.writeFileSync(tempInput, req.file.buffer);

      const scriptPath = path.join(__dirname, "enhance_image.py");

      execSync(
        `python "${scriptPath}" "${tempInput}" "${tempOutput}" "${scale}"`,
        { encoding: "utf-8", timeout: 120000 }
      );

      const processedBuffer = fs.readFileSync(tempOutput);

      const uploaded = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "PixelClean/enhanced" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(processedBuffer).pipe(stream);

      });

      req.user.usage.enhance += 1;
      await req.user.save();

      res.json({
        success: true,
      // analysis,
        imageUrl: uploaded.secure_url
      });

    } catch (error) {

      console.error("Enhancement failed:", error);
      res.status(500).json({ message: "Enhancement failed" });

    } finally {

      if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
      if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);

    }

  }
);

module.exports = router;
