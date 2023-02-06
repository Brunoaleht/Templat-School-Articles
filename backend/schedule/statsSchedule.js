const schedule = require("node-schedule");

module.exports = (App) => {
  schedule.scheduleJob("*/1 * * * *", async function () {
    const usersCount = await App.db("users").count("id").first();
    const categoriesCount = await App.db("categories").count("id").first();
    const articlesCount = await App.db("articles").count("id").first();

    const { Stat } = App.api.stats;
    const lastStat = await Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })

    const stat = new Stat({
      users: usersCount.count,
      categories: categoriesCount.count,
      articles: articlesCount.count,
      createdAt: new Date()
    })

    const changeUsers = !lastStat || stat.users !== lastStat.users
    const changeCategories = !lastStat || stat.categories !== lastStat.categories
    const changeArticles = !lastStat || stat.articles !== lastStat.articles

    if(changeUsers || changeCategories || changeArticles) {
      stat.save().then(() => console.log('[Stats] Atualizados no MongoDB'))
    }
  });
};
