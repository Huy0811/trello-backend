/* eslint-disable no-console */

import exitHook from "async-exit-hook"
import cors from "cors"
import express from "express"
import { corsOptions } from "~/config/cors"
import { env } from "~/config/environment"
import { CLOSE_DATABASE, CONNECT_DATABASE } from "~/config/mongodb"
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware"
import { APIs_V1 } from "~/routes/v1"

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use("/v1", APIs_V1)

  app.use(errorHandlingMiddleware)

  app.get("/", async (req, res) => {
    res.end("<h1>Hello World!</h1><hr>")
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`)
  })

  exitHook(() => {
    console.log("Disconnecting to MongoDB Cloud Atlas...")
    CLOSE_DATABASE()
    console.log("Disconnected to MongoDB Cloud Atlas !")
  })
}

;(async () => {
  try {
    console.log("Connecting to MongoDB Cloud Atlas...")
    await CONNECT_DATABASE()
    console.log("Connected to MongoDB Cloud Atlas !")
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DATABASE()
//   .then(
//     () => console.log("Connected to MongoDB Cloud Atlas !")
//   )
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
