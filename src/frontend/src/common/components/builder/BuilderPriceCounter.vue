<template>
  <div class="content__result">
    <p>Итого: {{ orderPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isButtonDisabled"
      @click="setOrderPrice"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaCounter",
  props: {
    order: {
      type: Object,
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setOrderPrice() {
      this.order.price = this.orderPrice;
    },
  },
  computed: {
    isButtonDisabled() {
      return this.order.name && !Object.keys(this.order.ingredients).length;
    },
  },
};
</script>
