import films from "../data/films.js";

export default {
  "/": (req, res) => {
    const viewModel = { films, selectedFilm: films[0] };
    res.render("film-list", viewModel);
  }
};