import filmSummaries from "./data/film-summaries.js";

const isHTMXRequest = (req) => !!req.get("HX-Request");

const routes = {
  "/": (req, res) => {
    const selectedFilm = filmSummaries[0];
    const viewModel = { filmSummaries, selectedFilm };

    res.render("film-list", viewModel);
  },

  "/films/:id": (req, res) => {
    const selectedFilm = filmSummaries.find(x => x.id == req.params.id);

    if (isHTMXRequest(req)) {
      const viewModel = { selectedFilm, layout: false };
      res.render("partials/film-detail", viewModel);
    } else {
      const viewModel = { filmSummaries, selectedFilm };
      res.render("film-list", viewModel);
    }
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