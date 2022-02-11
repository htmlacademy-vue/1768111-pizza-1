<template>
  <div id="app">
    <AppLayout>
      <router-view></router-view>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
