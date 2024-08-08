import home from "./controllers/home.js";
import films from "./controllers/films.js";

export function configureRoutes(app) {
  for (const routes of [home, films]) {
    for (const [path, value] of Object.entries(routes)) {
      if (typeof value === "function") {
        app.get(path, value);
      } else {
        app[value.method.toLowerCase()](path, value.action);
      }
    }
  }
}