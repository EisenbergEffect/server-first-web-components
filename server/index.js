import express from "express";
import { configureHandlebars } from "./handlebars.js";
import { runInNewContext } from "./context.js";

const port = 3000;
const app = express();

configureHandlebars(app);
app.use(express.static("client"));

app.get("/", (req, res) => {
  runInNewContext(() => res.render("home"));
});

app.listen(port, () => console.log(`App listening on port ${port}`));