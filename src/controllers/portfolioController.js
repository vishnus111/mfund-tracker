import {Portfolio} from "../models/Portfolio.js";
import { FundNavHistory } from "../models/FundNavHistory.js";
import {FundLatestNav} from "../models/FundLatestNav.js";
import {Fund} from "../models/Fund.js";

// 📌 Add fund to portfolio
const addFundToPortfolio = async (req, res) => {
  try {
    const { schemeCode, units } = req.body;
    if (!schemeCode || !units || units <= 0) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const fund = await Fund.findOne({ schemeCode });
    if (!fund) {
      return res.status(404).json({ success: false, message: "Scheme not found in fund list" });
    }

    const portfolio = new Portfolio({
      userId: req.user.id,
      schemeCode,
      units
    });

    await portfolio.save();

    res.json({
      success: true,
      message: "Fund added to portfolio successfully",
      portfolio
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 List user’s portfolio
const listPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id });
    res.json({ success: true, data: { totalHoldings: portfolio.length, holdings: portfolio } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Get portfolio value
const getPortfolioValue = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id });
    let totalInvestment = 0;
    let currentValue = 0;
    const holdings = [];

    for (const p of portfolio) {
      const latestNav = await FundLatestNav.findOne({ schemeCode: p.schemeCode });
      if (!latestNav) continue;

      const investedValue = p.units * 10; // 📌 placeholder (assuming ₹10 NAV at purchase)
      const currValue = p.units * latestNav.nav;
      const profitLoss = currValue - investedValue;

      totalInvestment += investedValue;
      currentValue += currValue;

      const fund = await Fund.findOne({ schemeCode: p.schemeCode });

      holdings.push({
        schemeCode: p.schemeCode,
        schemeName: fund?.schemeName || "Unknown",
        units: p.units,
        currentNav: latestNav.nav,
        currentValue: currValue,
        investedValue,
        profitLoss
      });
    }

    res.json({
      success: true,
      data: {
        totalInvestment,
        currentValue,
        profitLoss: currentValue - totalInvestment,
        profitLossPercent: totalInvestment > 0 ? ((currentValue - totalInvestment) / totalInvestment * 100).toFixed(2) : 0,
        asOn: new Date().toLocaleDateString("en-IN"),
        holdings
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Remove fund from portfolio
const removeFundFromPortfolio = async (req, res) => {
  try {
    const { schemeCode } = req.params;
    const result = await Portfolio.findOneAndDelete({ userId: req.user.id, schemeCode });

    if (!result) {
      return res.status(404).json({ success: false, message: "Fund not found in portfolio" });
    }

    res.json({ success: true, message: "Fund removed from portfolio successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Get portfolio history (last 30 days or custom range)
const getPortfolioHistory = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      // date range filter
      let dateFilter = {};
      if (startDate && endDate) {
        dateFilter.date = { $gte: startDate, $lte: endDate };
      }
  
      // get all user’s portfolio holdings
      const portfolio = await Portfolio.find({ userId: req.user.id });
      if (!portfolio.length) {
        return res.json({ success: true, data: [] });
      }
  
      // find NAV history for each holding
      const schemeCodes = portfolio.map(p => p.schemeCode);
      const navHistory = await FundNavHistory.find({ schemeCode: { $in: schemeCodes }, ...dateFilter });
  
      // group by date
      const historyMap = {};
      for (const nav of navHistory) {
        if (!historyMap[nav.date]) {
          historyMap[nav.date] = { date: nav.date, totalValue: 0 };
        }
  
        // calculate value for this scheme on that date
        const holding = portfolio.find(p => p.schemeCode === nav.schemeCode);
        if (holding) {
          historyMap[nav.date].totalValue += holding.units * nav.nav;
        }
      }
  
      // calculate profit/loss against invested value (assuming ₹10 NAV at purchase)
      const investedValue = portfolio.reduce((sum, p) => sum + (p.units * 10), 0);
  
      const responseData = Object.values(historyMap).map(h => ({
        date: h.date,
        totalValue: h.totalValue,
        profitLoss: h.totalValue - investedValue
      }));
  
      // sort by date ascending
      responseData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      res.json({ success: true, data: responseData });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

export default {addFundToPortfolio, removeFundFromPortfolio,getPortfolioValue,listPortfolio,getPortfolioHistory}