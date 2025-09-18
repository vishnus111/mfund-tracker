import express from "express"
import auth  from "../middlewares/authMiddleware.js";
import portfolioController from "../controllers/portfolioController.js";
import  {portfolioUpdateLimiter}  from "../middlewares/rateLimiter.js";

const { addFundToPortfolio, removeFundFromPortfolio,listPortfolio,getPortfolioValue,getPortfolioHistory } = portfolioController;




const router = express.Router();


router.post("/add", auth,portfolioUpdateLimiter, addFundToPortfolio);
router.get("/list", auth, listPortfolio);
router.get("/value", auth, getPortfolioValue);
router.get("/history", auth, getPortfolioHistory);
router.delete("/remove/:schemeCode", auth,portfolioUpdateLimiter, removeFundFromPortfolio);



export default router