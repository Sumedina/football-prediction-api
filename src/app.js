import express from "express"
import cors from "cors"

import predictionRoutes from "./routes/predictionRoutes.js"
import matchRoutes from "./routes/matchRoutes.js" 

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/predictions", predictionRoutes)
app.use("/api/matches", matchRoutes)

export default app