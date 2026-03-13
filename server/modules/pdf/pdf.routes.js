/*main
const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
try {

if (!req.file) {
  return res.status(400).json({ message: "No PDF uploaded" });
}

const apiKey = process.env.LIGHTPDF_API_KEY;

const formData = new FormData();
formData.append("file", req.file.buffer, {
  filename: "document.pdf",
});

// Step 1: Create LightPDF task
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

const taskId = taskResponse?.data?.data?.task_id;

if (!taskId) {
  return res.status(500).json({ message: "Failed to create LightPDF task" });
}

let resultUrl = null;

// Step 2: Poll task status
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
    resultUrl = check.data.data.file;
    break;
  }

  if (state < 0) {
    return res.status(500).json({ message: "PDF watermark removal failed" });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
}

if (!resultUrl) {
  return res.status(500).json({ message: "Processing timeout" });
}

// Step 3: Download processed PDF
const pdfResponse = await axios.get(resultUrl, {
  responseType: "arraybuffer",
});

const processedBuffer = Buffer.from(pdfResponse.data);

// Step 4: Upload to Cloudinary
const uploaded = await new Promise((resolve, reject) => {

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "PixelClean/pdf",
      resource_type: "raw",
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
  pdfUrl: uploaded.secure_url,
});


} catch (error) {
console.error("PDF processing failed:", error);
res.status(500).json({ message: "PDF processing failed" });
}
});

module.exports = router;*/

/*
const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {

try {

  // PAYMENT SYSTEM CHECK
  // Free plan allows only 1 PDF watermark removal
  if (req.user.subscriptionStatus === "free" && req.user.usage.pdf >= 1) {
    return res.status(403).json({
      message: "Free plan limit reached for PDF watermark removal",
      upgrade: true
    });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No PDF uploaded" });
  }

  const apiKey = process.env.LIGHTPDF_API_KEY;

  const formData = new FormData();
  formData.append("file", req.file.buffer, {
    filename: "document.pdf",
  });

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

  const taskId = taskResponse?.data?.data?.task_id;

  if (!taskId) {
    return res.status(500).json({ message: "Failed to create LightPDF task" });
  }

  let resultUrl = null;

  for (let i = 0; i < 30; i++) {

    const check = await axios.get(
      `https://techhk.aoscdn.com/api/tasks/visual/external/watermark-remove/${taskId}`,
      {
        headers: { "X-API-KEY": apiKey }
      }
    );

    const state = check.data.data.state;

    if (state === 1) {
      resultUrl = check.data.data.file;
      break;
    }

    if (state < 0) {
      return res.status(500).json({ message: "PDF watermark removal failed" });
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (!resultUrl) {
    return res.status(500).json({ message: "Processing timeout" });
  }

  const pdfResponse = await axios.get(resultUrl, {
    responseType: "arraybuffer",
  });

  const processedBuffer = Buffer.from(pdfResponse.data);

  const uploaded = await new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "PixelClean/pdf",
        resource_type: "raw",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(processedBuffer).pipe(stream);

  });

  // USAGE TRACKING
  req.user.usage.pdf += 1;
  await req.user.save();

  res.json({
    success: true,
    pdfUrl: uploaded.secure_url,
  });

} catch (error) {
  console.error("PDF processing failed:", error);
  res.status(500).json({ message: "PDF processing failed" });
}

});

module.exports = router;*/
const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("../../config/cloudinary");
const authMiddleware = require("../../middleware/auth.middleware");
const checkUsage = require("../../middleware/usageMiddleware");
//const analyzeMedia = require("../../services/mediaAnalysis.service");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware,
  checkUsage("pdf"),
  upload.single("file"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({ message: "No PDF uploaded" });
      }
      //const analysis = await analyzeMedia("pdf");
      const apiKey = process.env.LIGHTPDF_API_KEY;

      const formData = new FormData();
      formData.append("file", req.file.buffer, {
        filename: "document.pdf",
      });

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

      const taskId = taskResponse?.data?.data?.task_id;

      if (!taskId) {
        return res.status(500).json({ message: "Failed to create LightPDF task" });
      }

      let resultUrl = null;

      for (let i = 0; i < 30; i++) {

        const check = await axios.get(
          `https://techhk.aoscdn.com/api/tasks/visual/external/watermark-remove/${taskId}`,
          { headers: { "X-API-KEY": apiKey } }
        );

        const state = check.data.data.state;

        if (state === 1) {
          resultUrl = check.data.data.file;
          break;
        }

        if (state < 0) {
          return res.status(500).json({ message: "PDF watermark removal failed" });
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (!resultUrl) {
        return res.status(500).json({ message: "Processing timeout" });
      }

      const pdfResponse = await axios.get(resultUrl, {
        responseType: "arraybuffer",
      });

      const processedBuffer = Buffer.from(pdfResponse.data);

      const uploaded = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "PixelClean/pdf",
            resource_type: "raw",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(processedBuffer).pipe(stream);

      });

      req.user.usage.pdf += 1;
      await req.user.save();

      res.json({
        success: true,
        
        pdfUrl: uploaded.secure_url,
      });

    } catch (error) {

      console.error("PDF processing failed:", error);
      res.status(500).json({ message: "PDF processing failed" });

    }

  }
);

module.exports = router;
