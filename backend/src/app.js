import express from 'express'
import userRouter from './routes/user.router.js';
import tenantsRouter from './routes/tenants.router.js';

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tenants", tenantsRouter);

export default app;