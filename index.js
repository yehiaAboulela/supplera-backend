import * as dotenv from "dotenv";

import express from "express";
import initApp from "./src/app.router.js";
import sendEmail from "./src/utils/email.js";
const app = express();
dotenv.config();
const port = 5000;

initApp(app, express);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
