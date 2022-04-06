<template>
  <li class="ingredients__item">
    <AppDrag
      :transferData="{
        ingredient: this.ingredientName,
        value: this.ingredientCounter,
      }"
    >
      <span :class="'filling filling--' + ingredient.class">{{
        ingredient.name
      }}</span>
    </AppDrag>
    <div class="counter ingredients__counter counter--orange">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="ingredientCounter <= 0"
        @click="decrease"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        readonly
        :value="ingredientCounter"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        :disabled="ingredientCounter >= 3"
        @click="increase"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderIngredientSelector",
  components: { AppDrag },
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
  },
  computed: {
    ...mapState("builder", ["order"]),
    orderIngredients() {
      return this.order.ingredients;
    },
  },
  methods: {
    ...mapActions("builder", ["updateIngredients"]),
    async changeIngredients(
      ingredient = this.ingredientName,
      value = this.ingredientCounter
    ) {
      await this.updateIngredients({ ingredient, value });
    },
    increase() {
      this.ingredientCounter++;
      this.changeIngredients();
    },
    decrease() {
      this.ingredientCounter--;
      this.changeIngredients();
    },
  },
  watch: {
    orderIngredients: {
      handler(value) {
        if (value[this.ingredientName] <= 3) {
          this.ingredientCounter = value[this.ingredientName];
        }
      },
      deep: true,
    },
  },
  updated() {
    this.ingredientCounter = this.orderIngredients[this.ingredientName];
  },
};
</script>
