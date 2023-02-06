<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input
        type="text"
        placeholder="Digite para filtrar..."
        v-model="treeFilter"
        class="filter-field"
      />
    </div>
    <Tree
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
    />
  </aside>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../../config/fileGlobal";
import Tree from "liquor-tree";
import { mapState } from "vuex";
export default {
  name: "MenuM",
  components: { Tree },
  data() {
    return {
      treeFilter: "",
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: {
          text: "name",
        },
        filter: {
          emptyText: "Categoria não encontrada",
        },
      },
    };
  },
  computed: mapState(["isMenuVisible"]),
  methods: {
    getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      return axios.get(url).then((res) => res.data);
    },
    onNodeSelect(node) {
      this.$router.push({
        name: "ArticlesByCategory",
        params: { id: node.id },
      });

      if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
      }
    },
  },
  mounted() {
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232323, #454545);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}
.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background-color: rgba(250, 250, 250, 0.1);
}
.tree-arrow.has-child {
  filter: brightness(2);
}
.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}
.menu .menu-filter i {
  margin-right: 12px;
  color: #aaa;
}
.menu input {
  color: #ccc;
  font-size: 1.3rem;
  width: 100%;
  border: none;
  outline: 0;
  background: transparent;
}
.tree-filter-empty {
  color: #aaa;
  margin-left: 15px;
  font-size: 1.3rem;
}
</style>
