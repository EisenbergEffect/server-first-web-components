import filmSummaries from "./data/film-summaries.js";

const routes = {
  "/": (req, res) => {
    const selectedFilm = filmSummaries[0];
    const viewModel = { filmSummaries, selectedFilm };

    res.render("film-list", viewModel);
  },

  "/films/:id": (req, res) => {
    const selectedFilm = filmSummaries.find(x => x.id == req.params.id);
    const viewModel = { filmSummaries, selectedFilm };

    res.render("film-list", viewModel);
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