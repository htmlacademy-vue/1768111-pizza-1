<template>
  <div class="content__result">
    <p>Итого: {{ orderPrice }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
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
};
</script>

<style lang="scss"></style>
