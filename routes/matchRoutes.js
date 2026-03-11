import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = process.env.API_FOOTBALL_KEY; 

router.get("/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/CL/matches",
      {
        headers: {
          "X-Auth-Token": API_KEY,
        },
        params: {
          dateFrom: today,
          dateTo: today,
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

    res.json({ matches });
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    res.status(500).json({ error: "Error fetching matches" });
  }
});

export default router;