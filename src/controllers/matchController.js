import { getMatchesByDate } from "../services/footballDataService.js"

export async function getMatchesToday(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD
    const matches = await getMatchesByDate(today)
    res.json(matches)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}