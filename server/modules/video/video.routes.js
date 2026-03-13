/*const express = require("express");
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

router.post("/", authMiddleware, upload.single("video"), async (req, res) => {

  const tempInput = path.join(os.tmpdir(), `vid_in_${Date.now()}.mp4`);
  const tempOutput = path.join(os.tmpdir(), `vid_out_${Date.now()}.mp4`);

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    fs.writeFileSync(tempInput, req.file.buffer);

    const scriptPath = path.join(__dirname, "remove_video_watermark.py");

    execSync(
      `py -3.11 "${scriptPath}" "${tempInput}" "${tempOutput}"`,
      { encoding: "utf-8", timeout: 300000 }
    );

    const processedBuffer = fs.readFileSync(tempOutput);

    const uploaded = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "PixelClean/videos",
          resource_type: "video"
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
      videoUrl: uploaded.secure_url
    });

  } catch (error) {

    console.error("Video processing failed:", error);

    res.status(500).json({
      message: "Video watermark removal failed"
    });

  } finally {

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

router.post("/", authMiddleware, upload.single("video"), async (req, res) => {

  const tempInput = path.join(os.tmpdir(), `vid_in_${Date.now()}.mp4`);
  const tempOutput = path.join(os.tmpdir(), `vid_out_${Date.now()}.mp4`);

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    // Save uploaded file
    fs.writeFileSync(tempInput, req.file.buffer);

    const scriptPath = path.join(__dirname, "remove_video_watermark.py");

    console.log("Starting Python video processing...");

    execSync(
      `py -3.11 "${scriptPath}" "${tempInput}" "${tempOutput}"`,
      {
        stdio: "inherit",   // shows Python logs in terminal
        timeout: 600000     // 10 minutes (prevents ETIMEDOUT)
      }
    );

    console.log("Python processing completed");

    if (!fs.existsSync(tempOutput)) {
      throw new Error("Processed video not generated");
    }

    const processedBuffer = fs.readFileSync(tempOutput);

    const uploaded = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "PixelClean/videos",
          resource_type: "video"
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
      videoUrl: uploaded.secure_url
    });

  } catch (error) {

    console.error("Video processing failed:", error);

    res.status(500).json({
      message: "Video watermark removal failed"
    });

  } finally {

    // Safe delete temp files
    try {
      if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
    } catch (err) {
      console.log("Temp input file still locked");
    }

    try {
      if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
    } catch (err) {
      console.log("Temp output file still locked");
    }

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

router.post("/", authMiddleware, upload.single("video"), async (req, res) => {

  // PAYMENT SYSTEM CHECK
  // Free plan allows only 1 video watermark removal
  if (req.user.subscriptionStatus === "free" && req.user.usage.video >= 1) {
    return res.status(403).json({
      message: "Free plan limit reached for video watermark removal",
      upgrade: true
    });
  }

  const tempInput = path.join(os.tmpdir(), `vid_in_${Date.now()}.mp4`);
  const tempOutput = path.join(os.tmpdir(), `vid_out_${Date.now()}.mp4`);

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    fs.writeFileSync(tempInput, req.file.buffer);

    const scriptPath = path.join(__dirname, "remove_video_watermark.py");

    execSync(
      `py -3.11 "${scriptPath}" "${tempInput}" "${tempOutput}"`,
      { stdio: "inherit", timeout: 600000 }
    );

    if (!fs.existsSync(tempOutput)) {
      throw new Error("Processed video not generated");
    }

    const processedBuffer = fs.readFileSync(tempOutput);

    const uploaded = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "PixelClean/videos",
          resource_type: "video"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(processedBuffer).pipe(stream);

    });

    // USAGE TRACKING
    req.user.usage.video += 1;
    await req.user.save();

    res.json({
      success: true,
      videoUrl: uploaded.secure_url
    });

  } catch (error) {

    console.error("Video processing failed:", error);

    res.status(500).json({
      message: "Video watermark removal failed"
    });

  } finally {

    try {
      if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
    } catch {}

    try {
      if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
    } catch {}

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

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware,
  checkUsage("video"),
  upload.single("video"),
  async (req, res) => {

    const tempInput = path.join(os.tmpdir(), `vid_in_${Date.now()}.mp4`);
    const tempOutput = path.join(os.tmpdir(), `vid_out_${Date.now()}.mp4`);

    try {

      if (!req.file) {
        return res.status(400).json({ message: "No video uploaded" });
      }

      fs.writeFileSync(tempInput, req.file.buffer);

      const scriptPath = path.join(__dirname, "remove_video_watermark.py");

      execSync(
        `py -3.11 "${scriptPath}" "${tempInput}" "${tempOutput}"`,
        { stdio: "inherit", timeout: 600000 }
      );

      if (!fs.existsSync(tempOutput)) {
        throw new Error("Processed video not generated");
      }

      const processedBuffer = fs.readFileSync(tempOutput);

      const uploaded = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PixelClean/videos",
            resource_type: "video"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(processedBuffer).pipe(stream);

      });

      req.user.usage.video += 1;
      await req.user.save();

      res.json({
        success: true,
        videoUrl: uploaded.secure_url
      });

    } catch (error) {

      console.error("Video processing failed:", error);

      res.status(500).json({
        message: "Video watermark removal failed"
      });

    } finally {

      try {
        if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);
      } catch {}

      try {
        if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
      } catch {}

    }

  }
);

module.exports = router;