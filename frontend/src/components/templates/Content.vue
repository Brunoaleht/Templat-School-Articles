<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
import PageTitle from "./PageTitle.vue";
export default {
  name: "Content",
  components: {
    PageTitle,
  },
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>
