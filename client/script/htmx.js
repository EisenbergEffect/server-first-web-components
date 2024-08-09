import htmx from "https://unpkg.com/htmx.org@2.0.1/dist/htmx.esm.js";

export function clearHTMXHistoryCache() {
  localStorage.removeItem('htmx-history-cache');
}

export function processHTMX(node) {
  htmx.process(node);
}

export function configureHTMX() {
  globalThis.addEventListener('htmx:pushedIntoHistory', () => {
    clearHTMXHistoryCache();
  });
  
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
  
  const obs = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement) {
          attachShadowRoots(node);
        }
      }
    }
  });
  
  obs.observe(document.body, { childList: true, subtree: true });
}