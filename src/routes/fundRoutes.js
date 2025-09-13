import express from "express";
import fundRoutes from "../controllers/fundController.js";
const {
  getFunds,
  getFundNavHistory
} = fundRoutes;

const router = express.Router();

router.get("/", getFunds); // /api/funds?search=bluechip&page=1&limit=20
router.get("/:schemeCode/nav", getFundNavHistory);

export default  router;
