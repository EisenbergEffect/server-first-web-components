import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { engine } from "express-handlebars";
import { getCurrentContext } from "./context.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToStyleContent = new Map();
const environment = process.env.NODE_ENV ?? "development";

function loadStyleContent(src) {
  const path = resolve(__dirname, "./views/partials", src);

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
      const context = getCurrentContext();
      const stylesAlreadySent = context.get(src);
      let html = "";

      if (!stylesAlreadySent) {
        const styles = loadStyleContent(src);
        context.set(src, true)
        html = `<style id="${src}">${styles}</style>`;
      }

      return html + `<shared-styles style-id="${src}"></shared-styles>`;
    }
  }
};

export function configureHandlebars(app) {
  app.engine(".hbs", engine(hbConfig));
  app.set("view engine", ".hbs");
  app.set("views", resolve(__dirname, "./views"));
}