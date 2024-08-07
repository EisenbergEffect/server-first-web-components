import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { engine } from "express-handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToStyleContent = new Map();

function getStyleContent(path) {
  let styles = pathToStyleContent.get(path);
  
  if (!styles) {
    styles = readFileSync(path, "utf-8");
    pathToStyleContent.set(path, styles);
  }

  return styles;
}

export function configureHandlebars(app, als) {
  const hbConfig = {
    extname: ".hbs",
    helpers: {
      "shared-styles": function(src) {
        const path = resolve(__dirname, "./views/partials", src);
        const store = als.getStore();
        let styleId = store.get(path);
        let html = "";
  
        if (!styleId) {
          const styles = getStyleContent(path);
          styleId = crypto.randomUUID();
          store.set(path, styleId)
          html = `<style id="${styleId}">${styles}</style>`;
        }

        return html + `<shared-styles style-id="${styleId}"></shared-styles>`;
      }
    }
  };

  app.engine(".hbs", engine(hbConfig));
  app.set("view engine", ".hbs");
  app.set("views", resolve(__dirname, "./views"));
}