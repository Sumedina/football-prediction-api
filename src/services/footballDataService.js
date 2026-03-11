import axios from "axios"
import { API_FOOTBALL_KEY } from "../config/env.js"

const API_URL = "https://api.football-data.org/v4"
const headers = {
  "X-Auth-Token": API_FOOTBALL_KEY
}

export async function getMatchesByDate(date, competitionCode = null) {
  try {
    const url = competitionCode
      ? `${API_URL}/competitions/${competitionCode}/matches`
      : `${API_URL}/matches`

    const response = await axios.get(url, {
      headers,
      params: {
        dateFrom: date,
        dateTo: date
      }
    })

    const matches = response.data.matches.map(match => ({
      homeTeamId: match.homeTeam.id,
      awayTeamId: match.awayTeam.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      league: match.competition.name,
      date: match.utcDate
    }))

    return matches
  } catch (error) {
    console.error("Error fetching matches:", error.response?.data || error.message)
    throw new Error("Failed to fetch matches")
  }
}