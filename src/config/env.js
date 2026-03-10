import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 3000
export const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY