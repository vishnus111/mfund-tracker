import express from "express"
import auth  from "../middlewares/authMiddleware.js";
import portfolioController from "../controllers/portfolioController.js";

const { addFundToPortfolio, removeFundFromPortfolio,listPortfolio,getPortfolioValue,getPortfolioHistory } = portfolioController;


// import {
//     addFundToPortfolio,
//   listPortfolio,
//   getPortfolioValue,
//   removeFundFromPortfolio
// } from  "../controllers/portfolioController.js";

const router = express.Router();

// Protected routes (need JWT)
router.post("/add", auth, addFundToPortfolio);
router.get("/list", auth, listPortfolio);
router.get("/value", auth, getPortfolioValue);
router.get("/history", auth, getPortfolioHistory);
router.delete("/remove/:schemeCode", auth, removeFundFromPortfolio);

// module.exports = router;

export default router