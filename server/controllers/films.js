import allFilms from "../data/films.js";

const isAJAX = (req) => !!req.get("HX-Request");

export default {
  "/films/:id": (req, res) => {
    const filmId = req.params.id;
    const film = allFilms.find(x => x.id == filmId);

    if (isAJAX(req)) {
      const viewModel = { film, layout: false };
      res.render("partials/film-detail", viewModel);
    } else {
      const viewModel = { films: allFilms, selectedFilm: film };
      res.render("film-list", viewModel);
    }
  },
};