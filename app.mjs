import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import "./database/connection.mjs";
import AppErrorHandler from "./config/error.mjs";
import { morganErrorHandler, morganSuccessHandler } from "./config/morgan.mjs";

import { BASE_URL } from "./common/constants.js";
import usersRoutes from "./server/users/index.js";


const app = express();

app.use(morganSuccessHandler);
app.use(morganErrorHandler);
app.use(cors());

app.use(helmet());

app.use(bodyParser.json());
app.use(compression());

app.get(`${BASE_URL}/healthCheck`, (req, res, next) => {
    res.status(200).send("it works!!!");
});

app.use(`${BASE_URL}/book`, usersRoutes);


app.use(AppErrorHandler.handler);
app.use(AppErrorHandler.notFound);

export default app;
