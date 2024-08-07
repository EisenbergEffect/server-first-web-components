import express from "express";
import { AsyncLocalStorage } from "async_hooks";
import { configureHandlebars } from "./handlebars.js";

const port = 3000;
const app = express();
const als = new AsyncLocalStorage();

configureHandlebars(app, als);

app.get("/", (req, res) => {
  als.run(new Map(), () => res.render("home"));
});

app.listen(port, () => console.log(`App listening on port ${port}`));