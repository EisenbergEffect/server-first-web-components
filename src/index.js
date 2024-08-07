import * as path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { engine } from "express-handlebars";

const port = 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, "./views"));

app.get('/', (req, res) => {
  res.render("home");
});

app.listen(port, () =>  console.log(`App listening on port ${port}`));