<template>
  <div class="content__result">
    <p>Итого: 0 ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
