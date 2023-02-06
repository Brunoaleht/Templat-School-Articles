<template>
  <div class="article-card">
    <router-link :to="{ name: 'PostArticle', params: { id: article.id } }">
      <div class="article-card-img d-none d-sm-block">
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          height="150"
          width="150"
          alt="Article"
        />
        <img
          v-else
          src="../../assets/article.png"
          height="150"
          width="150"
          alt="Article"
        />
      </div>
      <div class="article-card-info">
        <h2>{{ article.name }}</h2>
        <p>{{ article.description }}</p>
        <span class="article-card-author">
          <strong>Author: </strong>{{ article.author }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ["article"],
};
</script>

<style>
.article-card {
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: rgb(219, 216, 250);
  padding: 20px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
}
.article-card a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}
.article-card a:hover {
  color: #000;
  text-decoration: none;
}
.article-card h2 {
  font-size: 1.7rem;
}
.article-card-img {
  padding-right: 20px;
  margin-right: 20px;
  border-right: solid 1px #aaa;
}
.article-card-img img {
  border-radius: 5px;
}
.article-card-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}
.article-card-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>
