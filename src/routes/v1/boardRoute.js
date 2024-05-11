import express from "express"
import { boardController } from "~/controllers/boardController"
import { boardValidation } from "~/validations/boardValidation"

const Router = express.Router()

Router.route("/").post(boardValidation.createNew, boardController.createNew)

Router.route("/:id").get(boardController.getDetails).put(boardValidation.update, boardController.update)

export const boardRoute = Router
