<template>
  <div class="popup">
    <a href="#" class="close" @click.prevent="returnBack">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="returnBack">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SuccessPopup",
  computed: {
    ...mapGetters("auth", ["isAuth"]),
  },
  methods: {
    async returnBack() {
      await this.$router.push(this.isAuth ? "/orders" : "/");
    },
  },
};
</script>
