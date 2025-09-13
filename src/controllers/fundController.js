import { Fund } from "../models/Fund.js";
import { FundLatestNav } from "../models/FundLatestNav.js";
import { FundNavHistory } from "../models/FundNavHistory.js";
// const Fund = require("../models/Fund");
// const FundLatestNav = require("../models/FundLatestNav");
// const FundNavHistory = require("../models/FundNavHistory");

// 📌 Get list of funds with search + pagination
const getFunds = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 20 } = req.query;

    const query = search
      ? { schemeName: { $regex: search, $options: "i" } }
      : {};

    const totalFunds = await Fund.countDocuments(query);
    const funds = await Fund.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        funds,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalFunds / limit),
          totalFunds,
          hasNext: page * limit < totalFunds,
          hasPrev: page > 1
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Get NAV history for a specific fund
const getFundNavHistory = async (req, res) => {
  try {
    const { schemeCode } = req.params;

    const fund = await Fund.findOne({ schemeCode });
    if (!fund) {
      return res.status(404).json({ success: false, message: "Fund not found" });
    }

    const latestNav = await FundLatestNav.findOne({ schemeCode });
    const history = await FundNavHistory.find({ schemeCode })
      .sort({ date: -1 })
      .limit(30);

    res.json({
      success: true,
      data: {
        schemeCode,
        schemeName: fund.schemeName,
        currentNav: latestNav?.nav || null,
        asOn: latestNav?.date || null,
        history: history.map(h => ({ date: h.date, nav: h.nav }))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default {getFunds,getFundNavHistory}