import { User } from "../models/User.js";
import { Portfolio } from "../models/Portfolio.js";
import { Fund } from "../models/Fund.js";


//  Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-passwordHash"); 
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  Get all portfolios
const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate("userId", "name email");
    res.json({ success: true, data: portfolios });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  Most popular funds most invested by users
const getPopularFunds = async (req, res) => {
  try {
    const popularFunds = await Portfolio.aggregate([
      { $group: { _id: "$schemeCode", totalUnits: { $sum: "$units" }, count: { $sum: 1 } } },
      { $sort: { totalUnits: -1 } },
      { $limit: 10 }
    ]);

    // join with fund details
    const enriched = await Promise.all(
      popularFunds.map(async (f) => {
        const fund = await Fund.findOne({ schemeCode: f._id });
        return {
          schemeCode: f._id,
          schemeName: fund?.schemeName || "Unknown",
          totalUnits: f.totalUnits,
          investors: f.count
        };
      })
    );

    res.json({ success: true, data: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  System statistics
const getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPortfolios = await Portfolio.countDocuments();
    const uniqueFunds = await Portfolio.distinct("schemeCode");

    res.json({
      success: true,
      data: {
        totalUsers,
        totalPortfolios,
        uniqueFunds: uniqueFunds.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export default {getAllUsers,getAllPortfolios,getSystemStats,getPopularFunds,}