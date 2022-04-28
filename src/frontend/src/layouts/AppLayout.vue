<template>
  <div class="app-layout">
    <component :is="layout">
      <slot />
    </component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppLayout",
  computed: {
    ...mapGetters("auth", ["isAuth"]),
    layoutDefault() {
      return this.isAuth ? "AppLayoutAuth" : "AppLayoutDefault";
    },
    layout() {
      const layout = this.$route.meta?.layout || this.layoutDefault;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
