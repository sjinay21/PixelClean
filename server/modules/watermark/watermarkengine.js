const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const fs = require("fs");
const { calculateAlphaMap } = require("./alphaMap");
const { removeWatermark } = require("./blendModes");
const BG_48_PATH = path.join(__dirname, "../../assets/bg_48.png");
const BG_96_PATH = path.join(__dirname, "../../assets/bg_96.png");
function detectWatermarkConfig(imageWidth, imageHeight) {
  if (imageWidth > 1024 && imageHeight > 1024) {
    return {logoSize: 96,marginRight: 64,marginBottom: 64,};
  } else {
    return {logoSize: 48,marginRight: 32,marginBottom: 32,
    };
  }
}
function calculateWatermarkPosition(imageWidth, imageHeight, config) {
  const { logoSize, marginRight, marginBottom } = config;

  return {x: imageWidth - marginRight - logoSize,y: imageHeight - marginBottom - logoSize,width: logoSize,height: logoSize,};
}

async function processWatermark(inputPath, outputPath) {
  try {
    const image = await loadImage(inputPath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    const config = detectWatermarkConfig(canvas.width,canvas.height);

    const position = calculateWatermarkPosition(canvas.width,canvas.height,config)

    const bgPath =
      config.logoSize === 48 ? BG_48_PATH : BG_96_PATH;

    const bgImage = await loadImage(bgPath);

    const bgCanvas = createCanvas(config.logoSize,config.logoSize);

    const bgCtx = bgCanvas.getContext("2d");

    bgCtx.drawImage(bgImage,0,0,config.logoSize,config.logoSize);

    const bgImageData = bgCtx.getImageData(0,0,config.logoSize,config.logoSize);
    const alphaMap = calculateAlphaMap(bgImageData);
    removeWatermark(imageData, alphaMap, position);
    ctx.putImageData(imageData, 0, 0);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
  } catch (error) {
    console.error("Watermark processing error:", error);
    throw error;
  }
}

module.exports = { processWatermark };