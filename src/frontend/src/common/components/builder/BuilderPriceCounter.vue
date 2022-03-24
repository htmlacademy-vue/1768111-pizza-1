<template>
  <div class="content__result">
    <p>Итого: {{ orderPrice }} ₽</p>
    <button type="button" class="button" :disabled="isButtonDisabled">
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BuilderPizzaCounter",
  computed: {
    ...mapState("builder", ["pizzas", "order"]),
    ...mapGetters("builder", ["orderPrice"]),
    isButtonDisabled() {
      return this.order.name && !Object.keys(this.order.ingredients).length;
    },
  },
};
</script>
