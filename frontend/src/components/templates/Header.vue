<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <UserMenu v-if="!hideUserMenu" />
  </header>
</template>

<script>
import UserMenu from "./UserMenu.vue";
export default {
  name: "Header",
  components: { UserMenu },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserMenu: Boolean,
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa-angle-left"
        : "fa-angle-down";
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #13747d, #0abfbc);

  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 1.3rem;
  font-weight: 100;
  color: #fff;
  flex-grow: 1;
  text-align: center;
}
.title a {
  text-decoration: none;
  color: #fff;
}
header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
header.header > a.toggle:hover {
  color: #fff;
  background-color: rgb(0, 0, 0, 0.1);
}
</style>
