import express from "express";
import { configureHandlebars } from "./handlebars.js";
import { configureRoutes } from "./routes.js";
import { contextMiddleware } from "./context.js";

const port = 3000;
const app = express();

app.use(express.static("client"));
app.use(contextMiddleware);
configureHandlebars(app);
configureRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));