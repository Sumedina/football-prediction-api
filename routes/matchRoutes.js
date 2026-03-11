import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = process.env.API_FOOTBALL_KEY; 

router.get("/today", async (req, res) => {
  try {
    const today = new Date();
    const yyyy = today.getUTCFullYear();
    const mm = String(today.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(today.getUTCDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/CL/matches",
      {
        headers: {
          "X-Auth-Token": API_KEY,
        },
        params: {
          dateFrom: todayStr,
          dateTo: todayStr,
          status: "SCHEDULED",
        },
      }
    );

    const matches = response.data.matches.map((match) => ({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      league: match.competition.name,
      date: match.utcDate,
      homeTeamId: match.homeTeam.id,
      awayTeamId: match.awayTeam.id,
    }));

    res.json(matches); 
  } catch (error) {
    console.error("Error fetching matches:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching matches" });
  }
});

export default router;