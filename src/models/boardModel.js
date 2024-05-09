import Joi from "joi"
import { ObjectId } from "mongodb"
import { GET_DATABASE } from "~/config/mongodb"

const BOARD_COLLECTION_NAME = "boards"
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(200).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdBoard = await GET_DATABASE().collection(BOARD_COLLECTION_NAME).insertOne(validData)

    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DATABASE()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (id) => {
  try {
    const result = await GET_DATABASE()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails
}