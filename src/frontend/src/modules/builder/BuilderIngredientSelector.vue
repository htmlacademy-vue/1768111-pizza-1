<template>
  <li class="ingredients__item">
    <span :class="'filling filling--' + ingredient.class">{{
      ingredient.name
    }}</span>
    <ItemCounter
      class="ingredients__counter counter--orange"
      @setValue="setValue"
      @click="setIngredient()"
      :value="value"
    />
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter.vue";

export default {
  name: "BuilderIngredientSelector",
  components: { ItemCounter },
  data() {
    return {
      value: 0,
      ingredientName: this.ingredient.class,
    };
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setValue(value) {
      this.value = value;
    },
    setIngredient(ingredientName, value) {
      return this.$emit("setIngredient", ingredientName, value);
    },
  },
};
</script>

<style></style>
