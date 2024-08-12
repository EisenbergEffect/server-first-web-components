import htmx from "https://unpkg.com/htmx.org@2.0.1/dist/htmx.esm.js";

export const DOM = Object.freeze({
  clearHistoryCache() {
    localStorage.removeItem('htmx-history-cache');
  },

  onHistoryChange(callback) {
    globalThis.addEventListener("htmx:pushedIntoHistory", callback);
  },

  applyBehaviors(node) {
    htmx.process(node);
  },

  configure() {
    htmx.config.refreshOnHistoryMiss = true;
  
    function attachShadowRoots(root) {
      root.querySelectorAll("template[shadowrootmode]").forEach(template => {
        const mode = template.getAttribute("shadowrootmode");
        const shadowRoot = template.parentNode.attachShadow({ mode });
        shadowRoot.appendChild(template.content);
        template.remove();
        attachShadowRoots(shadowRoot);
      });
    }

    if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode')) { 
      attachShadowRoots(document);
    }
    
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof HTMLElement) {
            attachShadowRoots(node);
          }
        }
      }
    }).observe(document, { childList: true, subtree: true });
  }
});