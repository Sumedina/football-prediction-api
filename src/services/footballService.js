import axios from "axios"
import { API_FOOTBALL_KEY } from "../config/env.js"

const API_URL = "https://api.football-data.org/v4"

const headers = {
  "X-Auth-Token": API_FOOTBALL_KEY
}

export async function getLastMatches(teamId) {
  const response = await axios.get(`${API_URL}/teams/${teamId}/matches`, {
    headers,
    params: {
      status: "FINISHED", 
      limit: 10
    }
  })

  return response.data.matches || []
}

export async function getHeadToHead(team1Id, team2Id) {
  const response = await axios.get(`${API_URL}/teams/${team1Id}/matches`, {
    headers,
    params: {
      status: "FINISHED",
      limit: 20
    }
  })

  const h2h = (response.data.matches || []).filter(
    match => match.homeTeam.id === team2Id || match.awayTeam.id === team2Id
  )

  return h2h
}