import {MongoClient} from "mongodb";

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!uri) {
    throw new Error(
        "Please define URI"
    )
}

if (!dbName) {
    throw new Error(
        "Please define db name"
    )
}

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {client: cachedClient, db: cachedDb}
    }
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxIdleTimeMS: 10000,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 20000
    })

    const db = await client.db(dbName)

    cachedClient = client
    cachedDb = db

    return {client, db}
}
