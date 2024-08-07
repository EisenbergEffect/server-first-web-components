function defineHTMXElement(tag) {
  customElements.define(tag, class extends HTMLElement {
    constructor() {
      super();
      htmx.process(this.shadowRoot);
    }
  });
}

["test-element"].forEach(defineHTMXElement);