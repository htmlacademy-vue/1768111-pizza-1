<template>
  <li class="ingredients__item">
    <AppDrag :transferData="{ [this.ingredientName]: this.ingredientCounter }">
      <span :class="'filling filling--' + ingredient.class">{{
        ingredient.name
      }}</span>
    </AppDrag>
    <div class="counter ingredients__counter counter--orange">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="ingredientCounter <= 0"
        @click="updateAmount('minus')"
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
        @click="updateAmount('plus')"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";
import AppDrag from "@/common/components/AppDrag.vue";

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
    orderIngredients: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("builder", ["pizzaToUpdate"]),
  },
  methods: {
    setIngredients() {
      this.$emit("setIngredients", this.ingredientName, this.ingredientCounter);
    },
    updateAmount(action) {
      action === "plus" ? this.ingredientCounter++ : this.ingredientCounter--;
      this.setIngredients();
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
  created() {
    if (Object.keys(this.pizzaToUpdate).length !== 0) {
      this.ingredientCounter =
        this.pizzaToUpdate.ingredients[this.ingredientName];
    }
  },
};
</script>
