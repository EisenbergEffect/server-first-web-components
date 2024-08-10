import { DOM } from "./dom.js";

export class FilmList extends HTMLElement {
  #links;

  connectedCallback() {
    this.#links = Array.from(this.shadowRoot.querySelectorAll("a"));

    DOM.applyBehaviors(this.shadowRoot);
    DOM.onHistoryChange(this.#selectActiveLink);

    this.#selectActiveLink();
  }

  #selectActiveLink = () => {
    for (const link of this.#links) {
      if (link.href.endsWith(location.pathname)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }

    DOM.clearHistoryCache();
  }

  static define() {
    customElements.define("film-list", this);
  }
}