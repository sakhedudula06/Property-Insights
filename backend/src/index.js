import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

console.log("DB_URL:", process.env.DB_URL);
console.log("public_anonkey:", process.env.public_anonkey); 

import app from "./app.js";

const startServer = async () => {
  try {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`SERVER STARTS AT ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("failed to start server:", error);
    process.exit(1);
  }
};

startServer();