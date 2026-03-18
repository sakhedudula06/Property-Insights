import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;
console.log("DB_URL:", process.env.DB_URL);
console.log("public_anonkey:", process.env.public_anonkey); 

const startServer = async () => {
  try {
    const { default: app } = await import("./app.js");
    
    app.listen(PORT, () => {
      console.log(`SERVER STARTS AT ${PORT}`);
    });
  } catch (error) {
    console.error("failed to start server:", error);
    process.exit(1);
  }
};

startServer();