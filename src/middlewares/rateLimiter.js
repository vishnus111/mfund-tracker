import rateLimit from "express-rate-limit";

// . Login limiter → 5 attempts per minute per IP
export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again in 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// . General API limiter → 100 requests per minute per user
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  keyGenerator: (req, res) => req.user?.id || req.ip, // per user if logged in, otherwise per IP
  message: {
    success: false,
    message: "Too many requests. Try again in 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// . Portfolio update limiter → 10 updates per minute per user
export const portfolioUpdateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  keyGenerator: (req, res) => req.user?.id || req.ip,
  message: {
    success: false,
    message: "Too many portfolio updates. Try again in 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
