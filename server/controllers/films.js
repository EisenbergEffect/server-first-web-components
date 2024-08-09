import filmSummaries from "../data/film-summaries.js";

const isAJAX = (req) => !!req.get("HX-Request");

export default {
  "/films/:id": (req, res) => {
    const filmId = req.params.id;
    const film = filmSummaries.find(x => x.id == filmId);

    if (isAJAX(req)) {
      const viewModel = { film, layout: false };
      res.render("partials/film-detail", viewModel);
    } else {
      const viewModel = { filmSummaries, selectedFilm: film };
      res.render("film-list", viewModel);
    }
  },
};