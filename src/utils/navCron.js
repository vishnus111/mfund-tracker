import cron from "node-cron";
import { Portfolio } from "../models/Portfolio.js";
import { FundLatestNav } from "../models/FundLatestNav.js";
import {FundNavHistory} from "../models/FundNavHistory.js";
import fetchLatestNAV from "./fetchNAV.js"


// Update NAV for all portfolio funds
async function updateNavJob() {
  console.log(" Starting daily NAV update...");

  try {
    //  Get all unique scheme codes in portfolios
    const portfolioSchemes = await Portfolio.distinct("schemeCode");

    for (const schemeCode of portfolioSchemes) {
      const latestNav = await fetchLatestNAV(schemeCode);
      if (!latestNav) continue;

      // Update fund latest nav
      await FundLatestNav.findOneAndUpdate(
        { schemeCode },
        { nav: latestNav.nav, date: latestNav.date, updatedAt: new Date() },
        { upsert: true }
      );

      //  Add to fundnavhistory
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


cron.schedule("0 0 * * *", updateNavJob);


export default updateNavJob