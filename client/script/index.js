import { FilmList } from "./film-list.js";
import { configureHTMX } from "./htmx.js";

configureHTMX();
customElements.define("film-list", FilmList);