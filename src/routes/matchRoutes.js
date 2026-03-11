import express from "express"
import { getMatchesToday } from "../controllers/matchController.js"

const router = express.Router()

router.get("/today", getMatchesToday)

export default router