import express from "express";
import fundRoutes from "../controllers/fundController.js";
const {
  getFunds,
  getFundNavHistory
} = fundRoutes;

const router = express.Router();

router.get("/", getFunds); 
router.get("/:schemeCode/nav", getFundNavHistory);

export default  router;
