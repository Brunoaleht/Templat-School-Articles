<template>
  <footer class="footer">
    <span>Copywriter <strong>B.A.</strong> 2023</span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #04575e;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
}
</style>
