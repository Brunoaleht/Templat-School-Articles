<template>
  <div class="post-article">
    <PageTitle
      icon="fa fa-file-o"
      :main="article.name"
      :sub="article.description"
    />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import "highlightjs/styles/dracula.css";
import hljs from "highlightjs/highlight.pack.js";
import { baseApiUrl } from "../../config/fileGlobal";
import axios from "axios";
import PageTitle from "../templates/PageTitle.vue";
export default {
  name: "PostArticle",
  components: { PageTitle },
  data() {
    return {
      article: {},
    };
  },
  methods: {
    getArticle() {
      const url = `${baseApiUrl}/articles/${this.$route.params.id}`;
      axios.get(url).then((res) => (this.article = res.data));
    },
  },
  mounted() {
    this.getArticle();
  },
  updated() {
    document.querySelectorAll(".article-content pre.ql-syntax").forEach((e) => {
      hljs.highlightBlock(e);
    });
  },
};
</script>

<style>
.article-content {
  background-color: rgb(219, 216, 250);
  border-radius: 8px;
  padding: 25px;
}
.article-content pre {
  padding: 20px;
  border-radius: 8px;
  background-color: #282a36;
  color: #fff;
  font-size: 1.2rem;
}
.article-content img {
  max-width: 100%;
}
.article-content :last-child {
  margin-bottom: 0px;
}
</style>
