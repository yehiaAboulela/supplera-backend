import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import initApp from "./src/app.router.js";
import sendEmail from "./src/utils/email.js";
const app = express();
const port = 5000;

initApp(app, express);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${port}!`)
);
