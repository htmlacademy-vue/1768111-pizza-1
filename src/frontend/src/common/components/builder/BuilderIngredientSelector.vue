<template>
  <li class="ingredients__item">
    <AppDrag :transferData="{ [this.ingredientName]: this.ingredientCounter }">
      <span :class="'filling filling--' + ingredient.class">{{
        ingredient.name
      }}</span>
    </AppDrag>
    <ItemCounter
      class="ingredients__counter counter--orange"
      :value="ingredientCounter"
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
      ingredientCounter: 0,
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
      this.ingredientCounter = value;
      this.$emit("setIngredients", this.ingredientName, this.ingredientCounter);
    },
  },
  watch: {
    orderIngredients: function (value) {
      if (Object.keys(this.orderIngredients).includes(this.ingredientName)) {
        if (value[this.ingredientName] <= 3)
          this.ingredientCounter = value[this.ingredientName];
      }
    },
  },
};
</script>

<style></style>
