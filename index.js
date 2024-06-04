import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import initApp from "./src/app.router.js";
import sendEmail from "./src/utils/email.js";
const app = express();
const port = process.env.PORT || 10000;

initApp(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
