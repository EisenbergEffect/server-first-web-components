import { DOM } from "./dom.js";

export class FilmList extends HTMLElement {
  #links;

  connectedCallback() {
    DOM.applyBehaviors(this.shadowRoot);

    this.#links = Array.from(this.shadowRoot.querySelectorAll("a"));
    this.#links.forEach(x => x.addEventListener("click", () => setTimeout(this.selectActiveLink, 16)));
    this.selectActiveLink();
  }

  selectActiveLink = () => {
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