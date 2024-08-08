import filmSummaries from "../data/film-summaries.js";

const isHTMXRequest = (req) => !!req.get("HX-Request");

export default {
  "/films/:id": (req, res) => {
    const filmId = req.params.id;
    const selectedFilm = filmSummaries.find(x => x.id == filmId);

    if (isHTMXRequest(req)) {
      const viewModel = { selectedFilm, layout: false };
      res.render("partials/film-detail", viewModel);
    } else {
      const viewModel = { filmSummaries, selectedFilm };
      res.render("film-list", viewModel);
    }
  },
};