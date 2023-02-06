const queries = require("./queries.js");

module.exports = (App) => {
  const { existsOrError } = App.api.validation;
  const save = (req, res) => {
    const article = { ...req.body };
    if (req.params.id) article.id = req.params.id;
    try {
      existsOrError(article.name, "Nome não informado");
      existsOrError(article.description, "Não há description");
      existsOrError(article.categoryId, "Category não informado");
      existsOrError(article.userId, "Autor não informado");
      existsOrError(article.content, "Conteúdo não informado");
    } catch (msg) {
      res.status(400).send(msg);
    }

    if (article.id) {
      App.db("articles")
        .update(article)
        .where({ id: article.id })
        .then((_ = res.status(204).send()))
        .catch((err) => res.status(500).send(err));
    } else {
      App.db("articles")
        .insert(article)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await App.db("articles")
        .where({ id: req.params.id })
        .del();
      try {
        existsOrError(rowsDeleted, "Artigo não encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const limit = 5; //used the pagination
  const get = async (req, res) => {
    const page = req.query.page || 1;
    const result = await App.db("articles").count("id").first();
    const count = parseInt(result.count);

    App.db("articles")
      .select("id", "name", "description")
      .limit(limit)
      .offset(page * limit - limit)
      .then((articles) => res.json({ data: articles, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    App.db("articles")
      .where({ id: req.params.id })
      .first()
      .then((article) => {
        article.content = article.content.toString();
        return res.json(article);
      })
      .catch((err) => res.status(500).send(err));
  };

  const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    const page = req.query.page || 1;
    const categories = await App.db.raw(
      queries.categoryWithChildren,
      categoryId
    );
    const ids = categories.rows.map((c) => c.id);

    App.db({ a: "articles", u: "users" })
      .select("a.id", "a.name", "a.description", "a.imageUrl", {
        author: "u.name",
      })
      .limit(limit)
      .offset(page * limit - limit)
      .whereRaw("?? = ??", ["u.id", "a.userId"])
      .whereIn("categoryId", ids)
      .orderBy("a.id", "desc")
      .then((articles) => res.json(articles))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getById, getCategoryById };
};
