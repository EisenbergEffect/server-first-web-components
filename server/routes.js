import filmSummaries from "./data/film-summaries.js";

const routes = {
  "/": (req, res) => {
    res.render("home", { filmSummaries });
  },

  "/film/:id": (req, res) => {
    const film = filmSummaries.find(x => x.id == req.params.id);
    res.render("film", { film });
  },
};

export function configureRoutes(app) {
  for (const [path, value] of Object.entries(routes)) {
    if (typeof value === "function") {
      app.get(path, value);
    } else {
      app[value.method.toLowerCase()](path, value.action);
    }
  }
}