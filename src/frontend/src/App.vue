<template>
  <div id="app">
    <AppLayout>
      <transition name="fade" mode="out-in" appear>
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  methods: {
    ...mapActions("cart", ["getAdds", "getPizzas"]),
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    // Note: check auth
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.getAdds();
    this.getPizzas();
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
