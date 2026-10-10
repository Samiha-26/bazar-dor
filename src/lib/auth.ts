import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL environment variable is missing. Please add it to your .env file or your deployment environment variables.");
}

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("bazar-dor");


export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});