const routes = {
  "/": (req, res) => {
    res.render("home");
  }
};

export function configureRoutes(app) {
  for (const [path, value] of Object.entries(routes)) {
    if (typeof value === "function") {
      app.get(path, value);
    } else {
      app[value.method.toLowerCase()](path, value.action);
    }
  }
}