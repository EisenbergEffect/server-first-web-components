import filmSummaries from "../data/film-summaries.js";

export default {
  "/": (req, res) => {
    const selectedFilm = filmSummaries[0];
    const viewModel = { filmSummaries, selectedFilm };

    res.render("film-list", viewModel);
  }
};