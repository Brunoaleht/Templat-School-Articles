const admin = require("./admin");

module.exports = (App) => {
  //auth:
  App.post("/signup", App.api.user.save);
  App.post("/signin", App.api.auth.signin);
  App.post("/validateToke", App.api.auth.validateToken);
  //Users:

  App.route("/users")
    .all(App.config.passport.authenticate())
    .post(admin(App.api.user.save))
    .get(admin(App.api.user.get));

  App.route("/users/:id")
    .all(App.config.passport.authenticate())
    .put(admin(App.api.user.save))
    .get(admin(App.api.user.getById))
    .delete(admin(App.api.user.remove));

  //categories:
  App.route("/categories")
    .all(App.config.passport.authenticate())
    .get(admin(App.api.category.get))
    .post(admin(App.api.category.save));

  //cuidado com a ordem das rotas
  App.route("/categories/tree")
    .all(App.config.passport.authenticate())
    .get(App.api.category.getTree);

  App.route("/categories/:id")
    .all(App.config.passport.authenticate())
    .get(App.api.category.getById)
    .put(admin(App.api.category.save))
    .delete(admin(App.api.category.remove));

  //articles:
  App.route("/articles")
    .all(App.config.passport.authenticate())
    .get(admin(App.api.article.get))
    .post(admin(App.api.article.save));
  App.route("/articles/:id")
    .all(App.config.passport.authenticate())
    .get(App.api.article.getById)
    .put(admin(App.api.article.save))
    .delete(admin(App.api.article.remove));

  App.route("/categories/:id/articles")
    .all(App.config.passport.authenticate())
    .get(App.api.article.getCategoryById);

  //stas:
  App.route("/stats")
    .all(App.config.passport.authenticate())
    .get(App.api.stats.get);
};
