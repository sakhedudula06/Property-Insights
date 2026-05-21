import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js';
import tenantsRouter from './routes/tenants.router.js';
import propertiesRouter from './routes/properties.router.js'
import path from 'path'


const app = express();

const allowedOrigins = process.env.NODE_ENV === "production"
  ? process.env.FRONTEND_URL || 'https://property-insights-1.onrender.com'
  : 'http://localhost:5173'

app.use(cors({
  origin: allowedOrigins
}));


const __dirname = path.resolve()

app.use(express.json());

app.use("/api/v1/properties", propertiesRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tenants", tenantsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}


export default app;