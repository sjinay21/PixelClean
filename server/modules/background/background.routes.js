/*const express = require("express");
const router = express.Router();

const upload = require("../../services/upload.service");
const authMiddleware = require("../../middleware/auth.middleware");
const Job = require("../../models/Job");

const { uploadFile } = require("../../services/storage.service");
const { processWatermark } = require("../../services/ai.service");

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    let job;

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const originalUrl = await uploadFile(req.file.buffer);

      job = await Job.create({
        user: req.user._id,
        toolType: "background",
        originalFile: originalUrl,
        status: "processing",
      });

      const processedUrl = await processWatermark(originalUrl);

      job.processedFile = processedUrl;
      job.status = "completed";
      await job.save();

      res.json({
        message: "Background removed successfully",
        job,
      });

    } catch (error) {
      if (job) {
        job.status = "failed";
        await job.save();
      }

      res.status(500).json({ message: "Processing failed" });
    }
  }
);

module.exports = router;*//*
const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {

  const tempInput = path.join(os.tmpdir(), `bg_in_${Date.now()}.png`);
  const tempOutput = path.join(os.tmpdir(), `bg_out_${Date.now()}.png`);

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Save uploaded image to temp file
    fs.writeFileSync(tempInput, req.file.buffer);

    const scriptPath = path.join(__dirname, "remove_bg.py");

    // Run Python background removal script
    execSync(
      `python "${scriptPath}" "${tempInput}" "${tempOutput}"`,
      { encoding: "utf-8", timeout: 120000 }
    );

    // Read processed output
    const processedBuffer = fs.readFileSync(tempOutput);

    // Upload result to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        { folder: "PixelClean/background_removed" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(processedBuffer).pipe(stream);

    });

    res.json({
      success: true,
      imageUrl: uploaded.secure_url
    });

  } catch (error) {

    console.error("Background removal failed:", error);
    res.status(500).json({ message: "Background removal failed" });

  } finally {

    // Clean temporary files
    if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
    if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);

  }

});

module.exports = router;*/


/*main
const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {

  const tempInput = path.join(os.tmpdir(), `bg_in_${Date.now()}`);
  const tempOutput = path.join(os.tmpdir(), `bg_out_${Date.now()}.png`);

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Save uploaded file
    fs.writeFileSync(tempInput, req.file.buffer);

    const scriptPath = path.join(__dirname, "remove_bg.py");

    execSync(
      `python "${scriptPath}" "${tempInput}" "${tempOutput}"`,
      { encoding: "utf-8", timeout: 120000 }
    );

    const processedBuffer = fs.readFileSync(tempOutput);

    const uploaded = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "PixelClean/background_removed",
          format: "png"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(processedBuffer).pipe(stream);

    });

    res.json({
      success: true,
      imageUrl: uploaded.secure_url
    });

  } catch (error) {

    console.error("Background removal failed:", error);

    res.status(500).json({
      message: "Background removal failed",
      error: error.message
    });

  } finally {

    if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
    if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);

  }

});

module.exports = router;*/
/*
const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {

  // PAYMENT SYSTEM CHECK
  // Free plan allows background removal 2 times
  if (req.user.subscriptionStatus === "free" && req.user.usage.background >= 2) {
    return res.status(403).json({
      message: "Free plan limit reached for background removal",
      upgrade: true
    });
  }

  const tempInput = path.join(os.tmpdir(), `bg_in_${Date.now()}`);
  const tempOutput = path.join(os.tmpdir(), `bg_out_${Date.now()}.png`);

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    fs.writeFileSync(tempInput, req.file.buffer);

    const scriptPath = path.join(__dirname, "remove_bg.py");

    execSync(
      `python "${scriptPath}" "${tempInput}" "${tempOutput}"`,
      { encoding: "utf-8", timeout: 120000 }
    );

    const processedBuffer = fs.readFileSync(tempOutput);

    const uploaded = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "PixelClean/background_removed",
          format: "png"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(processedBuffer).pipe(stream);

    });

    // USAGE TRACKING
    req.user.usage.background += 1;
    await req.user.save();

    res.json({
      success: true,
      imageUrl: uploaded.secure_url
    });

  } catch (error) {

    console.error("Background removal failed:", error);

    res.status(500).json({
      message: "Background removal failed",
      error: error.message
    });

  } finally {

    if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
    if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);

  }

});

module.exports = router;*/
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
  checkUsage("background"),
  upload.single("image"),
  async (req, res) => {

    const tempInput = path.join(os.tmpdir(), `bg_in_${Date.now()}`);
    const tempOutput = path.join(os.tmpdir(), `bg_out_${Date.now()}.png`);

    try {

      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
      // const analysis = await analyzeMedia("image");
      fs.writeFileSync(tempInput, req.file.buffer);

      const scriptPath = path.join(__dirname, "remove_bg.py");

      execSync(
        `py -3.11 "${scriptPath}" "${tempInput}" "${tempOutput}"`,
        { encoding: "utf-8", timeout: 120000 }
      );

      const processedBuffer = fs.readFileSync(tempOutput);

      const uploaded = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PixelClean/background_removed",
            format: "png"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(processedBuffer).pipe(stream);

      });

      req.user.usage.background += 1;
      await req.user.save();

      res.json({
        success: true,
        // analysis,
        imageUrl: uploaded.secure_url
      });

    } catch (error) {

      console.error("Background removal failed:", error);

      res.status(500).json({
        message: "Background removal failed",
        error: error.message
      });

    } finally {

      if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
      if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);

    }

  }
);

module.exports = router;
