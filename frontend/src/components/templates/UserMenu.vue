<template>
  <div class="user-menu">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-img">
        <Gravatar :email="user.email" alt="user" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-menu-content">
      <router-link to="/admin" v-if="user.admin">
        <i class="fa fa-cogs"></i>Administrador
      </router-link>
      <a href @click.prevent="logout"><i class="fa fa-sign-out"></i>Sair</a>
    </div>
  </div>
</template>

<script>
import { userKey } from "../../config/fileGlobal";
import { mapState } from "vuex";
import Gravatar from "vue-gravatar";
export default {
  name: "UserMenu",
  components: {
    Gravatar,
  },
  computed: mapState(["user"]),
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "AuthV" });
    },
  },
};
</script>

<style>
.user-menu {
  position: relative;
  height: 100%;
}
.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  height: 100%;
  padding: 0px 15px;
}
.user-menu:hover {
  background-color: rgb(0, 0, 0, 0.1);
}
.user-img {
  margin: 0px 10px;
}
.user-img > img {
  max-height: 37px;
  border-radius: 5px;
}
.user-menu-content {
  border-end-start-radius: 8px;
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgb(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s opacity 0.5s linear;
}
.user-menu:hover .user-menu-content {
  visibility: visible;
  opacity: 1;
}
.user-menu-content a {
  text-decoration: none;
  color: #333;
  padding: 10px;
}
.user-menu-content a:hover {
  background-color: rgb(0, 0, 0, 0.1);
}
</style>
