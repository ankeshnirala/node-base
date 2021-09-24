import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: "config.env" });

import { app } from "./app";

const start = async () => {
  process.on("uncaughtException", (error: Error) => {
    console.log("UNCAUGHT EXCEPTION - SHUTTING DWON");
    console.log(`
            ERROR NAME: ${error.name}
            ERROR MESSAGE: ${error.message}
            ERROR STACK: ${error.stack}
        `);
    process.exit(1);
  });

  if (!process.env.CLOUD_MONGODB_URI) {
    throw new Error("CLOUD_MONGODB_URL must be defined!!");
  }

  if (!process.env.APP_PORT) {
    throw new Error("APP_PORT must be defined!!");
  }

  if (!process.env.MONGODB_DATABASE) {
    throw new Error("MONGODB_DATABASE must be defined!!");
  }

  if (!process.env.MONGODB_PASSWORD) {
    throw new Error("MONGODB_PASSWORD must be defined!!");
  }

  try {
    const connectionURI = process.env.CLOUD_MONGODB_URI.replace(
      "PASSWORD",
      process.env.MONGODB_PASSWORD
    ).replace("DATABASE", process.env.MONGODB_DATABASE);

    await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Campaign - Connected to MongoDB");
  } catch (error) {
    console.log("DB Connection Error", error);
  }

  const server = app.listen(process.env.APP_PORT);
  console.log(`CAMPAIGN IS STARTED ON PORT ${process.env.APP_PORT}!`);

  process.on("unhandledRejection", (error: Error) => {
    console.log("UNHANDLED REJECTION - SHUTTING DWON");
    console.log(`
            ERROR NAME: ${error.name}
            ERROR MESSAGE: ${error.message}
            ERROR STACK: ${error.stack}
        `);
    server.close(() => process.exit(1));
  });
};

start();
