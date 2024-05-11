import express from "express"
import { StatusCodes } from "http-status-codes"
import { boardRoute } from "~/routes/v1/boardRoute"
import { cardRoute } from "~/routes/v1/cardRoute"
import { columnRoute } from "~/routes/v1/columnRoute"

const Router = express.Router()

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs V1 are ready to use !" })
})

Router.use("/boards", boardRoute)
Router.use("/columns", columnRoute)
Router.use("/cards", cardRoute)

export const APIs_V1 = Router
