function defineHTMXElement(tag) {
  customElements.define(tag, class extends HTMLElement {
    constructor() {
      super();
      htmx.process(this.shadowRoot);
    }
  });
}

["film-list"].forEach(defineHTMXElement);