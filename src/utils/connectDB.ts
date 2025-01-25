import { MongoClient, ServerApiVersion } from "mongodb";

type connectionType = {
  isConnected?: boolean;
  client?: MongoClient;
};

const connection: connectionType = {};

const connectDB = async () => {
  if (connection.isConnected) {
    return connection.client;
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();

    connection.isConnected = true;
    connection.client = client;

    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
