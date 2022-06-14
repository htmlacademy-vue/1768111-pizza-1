<template>
  <transition name="fade" appear>
    <div class="popup">
      <a href="#" class="close" @click.prevent="returnBack">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a href="#" class="button" @click.prevent="returnBack"
          >Отлично, я жду!</a
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SuccessPopup",
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuth"]),
  },
  methods: {
    async returnBack() {
      this.isShow = false;
      setTimeout(() => {
        this.$router.push(this.isAuth ? "/orders" : "/");
      }, 500);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}
.fade-leave-active {
  opacity: 0;
}
</style>
