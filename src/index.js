import * as path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { engine } from "express-handlebars";

const port = 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handlebarsConfig = {
  extname: ".hbs"
};

app.engine(".hbs", engine(handlebarsConfig));
app.set("view engine", ".hbs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () =>  console.log(`App listening on port ${port}`));