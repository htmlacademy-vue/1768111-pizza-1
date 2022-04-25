<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="sauce in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton
              name="sauce"
              :value="sauce.class"
              :checked="sauce.class === orderSauce.name"
              @click="setSauce($event)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredientSelector
              v-for="ingredient in ingredients"
              :key="ingredient.class"
              :ingredient="ingredient"
              :orderIngredients="orderIngredients"
              @setIngredients="setIngredients"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderIngredientSelector from "@/common/components/builder/BuilderIngredientSelector.vue";
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton, BuilderIngredientSelector },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    orderIngredients: {
      type: Object,
      required: true,
    },
    orderSauce: {
      type: Object,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setSauce(evt) {
      this.$emit("setSauce", evt.target.value);
    },
    setIngredients(ingredientName, ingredientCounter) {
      this.$emit("setIngredients", ingredientName, ingredientCounter);
    },
  },
};
</script>
