<template>
  <li class="ingredients__item">
    <AppDrag :transferData="{ [this.ingredientName]: this.value }">
      <span :class="'filling filling--' + ingredient.class">{{
        ingredient.name
      }}</span>
    </AppDrag>
    <ItemCounter
      class="ingredients__counter counter--orange"
      :value="value"
      @setIngredients="setIngredients"
    />
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";

export default {
  name: "BuilderIngredientSelector",
  components: { ItemCounter, AppDrag },
  data() {
    return {
      ingredientName: this.ingredient.class,
      value: 0,
    };
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    orderIngredients: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setIngredients(value) {
      this.value = value;
      this.$emit("setIngredients", this.ingredientName, value);
    },
  },
  watch: {
    orderIngredients: function (value) {
      if (Object.keys(this.orderIngredients).includes(this.ingredientName)) {
        if (value[this.ingredientName] <= 3)
          this.value = value[this.ingredientName];
      }
    },
  },
};
</script>

<style></style>
