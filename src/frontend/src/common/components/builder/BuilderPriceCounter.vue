<template>
  <div class="content__result">
    <p>Итого: {{ orderPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isButtonDisabled"
      @click="changeOrder(order)"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPizzaCounter",
  computed: {
    ...mapState("builder", ["pizzas", "order"]),
    ...mapGetters("builder", ["orderPrice"]),
    isButtonDisabled() {
      return (
        this.order.name.length &&
        !Object.values(this.order.ingredients).some((item) => item >= 1)
      );
    },
  },
  methods: {
    ...mapActions("cart", ["updateOrder"]),
    ...mapActions("builder", ["clearOrder", "updatePrice"]),
    async changeOrder(order) {
      await this.updatePrice(this.orderPrice);
      await this.updateOrder(order);
      await this.clearOrder();
    },
  },
};
</script>
