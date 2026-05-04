import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js';
import tenantsRouter from './routes/tenants.router.js';
import path from 'path'


const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: 'http://localhost:5173'
  }));
}


const __dirname = path.resolve()

app.use(express.json());


app.use("/api/v1/users", userRouter);
app.use("/api/v1/tenants", tenantsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
})
}


export default app;