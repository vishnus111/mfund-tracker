import express from "express";
import auth from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminMiddleware.js";
import adminController from "../controllers/adminController.js"
const {
  getAllUsers,
  getAllPortfolios,
  getPopularFunds,
  getSystemStats
}  = adminController ;

const router = express.Router();


router.get("/users", auth, adminOnly, getAllUsers);
router.get("/portfolios", auth, adminOnly, getAllPortfolios);
router.get("/popular-funds", auth, adminOnly, getPopularFunds);
router.get("/stats", auth, adminOnly, getSystemStats);

export default  router;
