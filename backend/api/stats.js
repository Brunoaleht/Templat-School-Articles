module.exports = (App) => {
  const Stat = App.mongoose.model("Stat", {
    users: Number,
    categories: Number,
    articles: Number,
    createdAt: Date,
  });

  const get = (req, res) => {
    Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })
      .then((stat) => {
        const stasDefault = {
          users: 0,
          categories: 0,
          articles: 0,
        };
      res.json(stat || stasDefault);
      });
  };

  return { Stat, get };
};
