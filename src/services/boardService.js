import { StatusCodes } from "http-status-codes"
import { cloneDeep } from "lodash"
import { boardModel } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/formatters"

const createNew = async (reqBody) => {
  try {
    const newBoard = { ...reqBody, slug: slugify(reqBody.title) }
    const createdBoard = await boardModel.createNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found !")
    }

    const boardResponse = cloneDeep(board)
    boardResponse.columns.forEach((column) => {
      column.cards = boardResponse.cards.filter((card) => card.columnId.equals(column._id))
    })
    delete boardResponse.cards

    return boardResponse
  } catch (error) {
    throw error
  }
}

export const boardService = { createNew, getDetails }
