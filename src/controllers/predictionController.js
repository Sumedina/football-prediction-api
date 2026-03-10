import { getLastMatches, getHeadToHead } from "../services/footballService.js"
import { analyzeMatch } from "../services/openaiService.js"
import { calculateStats } from "../utils/statsProcessor.js"
import buildPrompt from "../utils/promptBuilder.js"

export async function getPrediction(req, res) {
  try {
    const { homeTeamId, awayTeamId, homeTeam, awayTeam, league, date } = req.body

    const homeMatchesRaw = await getLastMatches(homeTeamId)
    const awayMatchesRaw = await getLastMatches(awayTeamId)

    const homeMatches = homeMatchesRaw.filter(m => m.status === "FINISHED")
    const awayMatches = awayMatchesRaw.filter(m => m.status === "FINISHED")

    const h2hRaw = await getHeadToHead(homeTeamId, awayTeamId)
    const h2h = h2hRaw.filter(m => m.status === "FINISHED")

    const homeStats = calculateStats(homeMatches)
    const awayStats = calculateStats(awayMatches)

    const prompt = buildPrompt({
      homeTeam,
      awayTeam,
      league,
      date,
      homeStats,
      awayStats,
      h2h
    })

    const prediction = await analyzeMatch(prompt)

    res.json({ prediction })
  } catch (error) {
    console.error(error.response?.data || error.message || error)
    res.status(500).json({
      error: "Prediction failed",
      details: error.response?.data || error.message
    })
  }
}