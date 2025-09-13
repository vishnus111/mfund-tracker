import axios from "axios";
import { Fund } from "../models/Fund.js";

async function importFunds() {
  try {
    const url = "https://api.mfapi.in/mf";
    const { data } = await axios.get(url);

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid fund data received");
    }

    for (const f of data) {
      await Fund.updateOne(
        { schemeCode: f.schemeCode },
        {
          schemeCode: f.schemeCode,
          schemeName: f.schemeName,
          fundHouse: f.fundHouse,
          schemeType: f.schemeType,
          schemeCategory: f.schemeCategory
        },
        { upsert: true }
      );
    }

    console.log("✅ Fund list imported successfully");
  } catch (err) {
    console.error("❌ Fund import failed:", err.message);
  }
}
export default   importFunds ;
