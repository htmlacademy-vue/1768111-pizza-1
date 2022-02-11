<template>
  <div class="app-layout">
    <component :is="layout">
      <slot />
    </component>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta?.layout || "AppLayoutDefault";
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
