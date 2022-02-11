<template>
  <div>
    <AppLayoutDefaultHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutDefaultHeader from "@/layouts/AppLayoutDefaultHeader.vue";
export default {
  name: "AppLayoutDefault",
  components: { AppLayoutDefaultHeader },
};
</script>
