<template>
  <div class="stat">
    <div class="stat-icon">
      <i :class="icon" :style="style"></i>
    </div>
    <div class="stat-info">
      <span class="stat-title">{{ title }}</span>
      <span class="stat-value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stat",
  props: ["title", "icon", "colorIcon", "value"],
  computed: {
    style() {
      return "color: " + (this.colorIcon || "#444");
    },
  },
};
</script>

<style>
.stat {
  flex: 1;
  display: flex;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
  transition: transform 100ms ease-in-out;
}
.stat:hover {
  transform: scale(1.05);
}
.stat-icon {
  display: flex;
  align-items: center;
}
.stat-icon i {
  font-size: 5rem;
}
.stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.stat-title {
  font-size: 1.3rem;
}
.stat-value {
  font-size: 3rem;
}
</style>
