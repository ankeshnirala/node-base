import "express-async-errors";
import express, { json } from "express";

import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";

// import { addCampaignRouter } from "./routers";
// import { listCampaignRouter } from "./routers";
// import { viewCampaignRouter } from "./routers";

const baseURL = "/api/v1";
const app = express();
declare module "express-serve-static-core" {
  interface Request {
    data?: any;
    status?: number;
  }
}
app.set("trust proxy", true);
app.use(json());

// app.use(baseURL, addCampaignRouter);
// app.use(baseURL, listCampaignRouter);
// app.use(baseURL, viewCampaignRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
