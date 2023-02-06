<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base of Knowledge" />
    <div class="stats">
      <Stat
        title="Categories"
        :value="stat.categories"
        icon="fa fa-folder"
        colorIcon="#d54d50"
      />
      <Stat
        title="Artigos"
        :value="stat.articles"
        icon="fa fa-file"
        colorIcon="#3bc480"
      />
      <Stat
        title="Usuário"
        :value="stat.users"
        icon="fa fa-user"
        colorIcon="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../../templates/PageTitle.vue";
import Stat from "./Stat.vue";
import { baseApiUrl } from "../../../config/fileGlobal";
import axios from "axios";
export default {
  name: "HomeV",
  components: { PageTitle, Stat },
  data() {
    return {
      stat: {},
    };
  },
  methods: {
    getStat() {
      axios.get(`${baseApiUrl}/stats`).then((res) => (this.stat = res.data));
    },
  },
  mounted() {
    this.getStat();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
