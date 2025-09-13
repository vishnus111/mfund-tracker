import cron from "node-cron";
import { Portfolio } from "../models/Portfolio.js";
import { FundLatestNav } from "../models/FundLatestNav.js";
import {FundNavHistory} from "../models/FundNavHistory.js";
import fetchLatestNAV from "./fetchNAV.js"


// Update NAV for all portfolio funds
async function updateNavJob() {
  console.log("⏳ Starting daily NAV update...");

  try {
    // 1. Get all unique scheme codes in portfolios
    const portfolioSchemes = await Portfolio.distinct("schemeCode");

    for (const schemeCode of portfolioSchemes) {
      const latestNav = await fetchLatestNAV(schemeCode);
      if (!latestNav) continue;

      // 2. Update fund_latest_nav
      await FundLatestNav.findOneAndUpdate(
        { schemeCode },
        { nav: latestNav.nav, date: latestNav.date, updatedAt: new Date() },
        { upsert: true }
      );

      // 3. Add to fund_nav_history
      const exists = await FundNavHistory.findOne({
        schemeCode,
        date: latestNav.date
      });

      if (!exists) {
        await FundNavHistory.create({
          schemeCode,
          nav: latestNav.nav,
          date: latestNav.date
        });
      }

      console.log(`✅ Updated NAV for Scheme ${schemeCode}: ₹${latestNav.nav}`);
    }

    console.log("🎉 NAV update completed successfully");
  } catch (error) {
    console.error("❌ NAV update failed:", error.message);
  }
}

// Schedule job: every day at 12:00 AM IST
cron.schedule("0 0 * * *", updateNavJob);

// module.exports = { updateNavJob };
export default updateNavJob