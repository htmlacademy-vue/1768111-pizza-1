<template>
  <div class="content__result">
    <p>Итого: {{ orderPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isButtonDisabled"
      @click="changeOrder()"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "BuilderPriceCounter",
  props: {
    pizzaToOrder: {
      type: Object,
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isButtonDisabled() {
      return (
        this.pizzaToOrder.name.length &&
        !Object.values(this.pizzaToOrder.ingredients).some((item) => item >= 1)
      );
    },
  },
  methods: {
    ...mapActions("cart", ["updateOrder"]),
    async changeOrder() {
      this.pizzaToOrder.price = this.orderPrice;
      await this.updateOrder(this.pizzaToOrder);
      this.$emit("setDefaultSettings");
    },
  },
};
</script>
