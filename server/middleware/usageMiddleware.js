/*const User = require("../models/User");
const checkUsage = (tool) => {

  return async (req, res, next) => {

    try {

      const user = req.user;

      // PAYMENT SYSTEM
      // Define free plan limits
      const freeLimits = {
        watermark: 1,
        pdf: 1,
        video: 1,
        background: 2,
        enhance: 2
      };

      // Pro & Premium unlimited for now
      if (user.subscriptionStatus === "pro" || user.subscriptionStatus === "premium") {
        return next();
      }

      const used = user.usage[tool] || 0;
      const limit = freeLimits[tool];

      if (used >= limit) {

        return res.status(403).json({
          message: "Free plan limit reached",
          upgrade: true
        });

      }

      next();

    } catch (error) {

      console.error("Usage middleware error:", error);
      res.status(500).json({ message: "Usage check failed" });

    }

  };

};

module.exports = checkUsage;*/
const checkUsage = (tool) => {

  return async (req, res, next) => {

    try {

      const user = req.user;

      // FREE PLAN LIMITS
      const freeLimits = {
        watermark: 100,
        logo: 100,        // TEMPORARY HIGH LIMIT FOR TESTING
        pdf: 1,
        video: 1,
        background: 100,
        enhance: Infinity // TEMPORARY HIGH LIMIT FOR TESTING
      };

      // Pro & Premium unlimited
      if (user.subscriptionStatus === "pro" || user.subscriptionStatus === "premium") {
        return next();
      }

      const used = user.usage[tool] || 0;
      const limit = freeLimits[tool];

      if (used >= limit) {
        return res.status(403).json({
          message: "Free plan limit reached",
          upgrade: true
        });
      }

      next();

    } catch (error) {

      console.error("Usage middleware error:", error);
      res.status(500).json({ message: "Usage check failed" });

    }

  };

};

module.exports = checkUsage;