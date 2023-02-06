import Vue from "vue";
import VueRouter from "vue-router";

import HomeV from "../components/pages/Home/HomeV";
import AdminPages from "../components/pages/AdminPages/AdminPages";
import ArticlesByCategory from "../components/article/ArticlesByCategory";
import PostArticle from "../components/article/PostArticle";
import AuthV from "../components/auth/AuthV";
import { userKey } from "./fileGlobal";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeV,
  },
  {
    name: "AdminPages",
    path: "/admin",
    component: AdminPages,
    meta: { requiresAdmin: true },
  },
  {
    name: "ArticlesByCategory",
    path: "/categories/:id/articles",
    component: ArticlesByCategory,
  },
  {
    name: "PostArticle",
    path: "/articles/:id",
    component: PostArticle,
  },
  {
    name: "AuthV",
    path: "/auth",
    component: AuthV,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey);

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.admin ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
