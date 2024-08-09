import { clearHTMXHistoryCache, processHTMX } from "./htmx.js";

export class FilmList extends HTMLElement {
  #links;

  connectedCallback() {
    processHTMX(this.shadowRoot);
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

    clearHTMXHistoryCache();
  }
}