const path = require("path");
const fs = require("fs");
const { removeWatermark } = require("./watermark/Watermarkengine");

const processWatermark = async (inputPath) => {
  const outputPath = inputPath.replace("uploads", "processed");

  await removeWatermark(inputPath, outputPath);

  return outputPath;
};
module.exports = { processWatermark };