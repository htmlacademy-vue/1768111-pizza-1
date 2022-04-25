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
    ...mapActions("builder", ["clearPizza"]),
    async changeOrder() {
      this.pizzaToOrder.price = this.orderPrice;
      this.pizzaToOrder.amount = 1;
      await this.updateOrder(this.pizzaToOrder);
      await this.clearPizza();
      this.$emit("setDefaultSettings");
    },
  },
};
</script>
