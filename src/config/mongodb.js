import { MongoClient, ServerApiVersion } from "mongodb"
import { env } from "~/config/environment"

let databaseInstance = null
const clientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DATABASE = async () => {
  await clientInstance.connect()

  databaseInstance = clientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DATABASE = async () => {
  await clientInstance.close()
}

export const GET_DATABASE = () => {
  if (!databaseInstance) {
    throw new Error("Connect to database first !")
  }

  return databaseInstance
}
