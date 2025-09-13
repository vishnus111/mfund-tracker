import axios from "axios";

async function fetchLatestNAV(schemeCode) {
  try {
    const url = `https://api.mfapi.in/mf/${schemeCode}`;
    const { data } = await axios.get(url);

    if (!data || !data.data || data.data.length === 0) {
      throw new Error("No NAV data available");
    }

    const latestEntry = data.data[0]; // latest NAV is first entry
    return {
      schemeCode,
      nav: parseFloat(latestEntry.nav),
      date: latestEntry.date
    };
  } catch (error) {
    console.error(`❌ Failed to fetch NAV for ${schemeCode}:`, error.message);
    return null;
  }
}

export default   fetchLatestNAV ;
