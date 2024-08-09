import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { engine } from "express-handlebars";
import { getCurrentContext } from "./context.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToStyleContent = new Map();
const environment = process.env.NODE_ENV ?? "development";

function getStyleContent(path, env) {
  if (environment === "development") {
    return readFileSync(path, "utf-8");
  }

  let styles = pathToStyleContent.get(path);
  
  if (!styles) {
    styles = readFileSync(path, "utf-8");
    pathToStyleContent.set(path, styles);
  }

  return styles;
}

const hbConfig = {
  extname: ".hbs",
  helpers: {
    "shared-styles": function(src, options) {
      const path = resolve(__dirname, "./views/partials", src);
      const context = getCurrentContext();
      
      let styleId = context.get(path);
      let html = "";

      if (!styleId) {
        const styles = getStyleContent(path);
        styleId = crypto.randomUUID();
        context.set(path, styleId)
        html = `<style id="${styleId}">${styles}</style>`;
      }

      return html + `<shared-styles style-id="${styleId}"></shared-styles>`;
    }
  }
};

export function configureHandlebars(app) {
  app.engine(".hbs", engine(hbConfig));
  app.set("view engine", ".hbs");
  app.set("views", resolve(__dirname, "./views"));
}