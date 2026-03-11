import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

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