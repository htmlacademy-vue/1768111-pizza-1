<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, index) in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton
              name="sauce"
              :value="sauce.class"
              :checked="index === 0 ? true : false"
              @change="setSauce"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredientSelector
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :ingredient="ingredient"
              @setIngredient="setIngredient"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderIngredientSelector from "@/modules/builder/BuilderIngredientSelector.vue";
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton, BuilderIngredientSelector },
  data() {
    return {
      ingredientToOrder: {},
    };
  },
  props: {
    ingredients: {
      type: Array,
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
    setIngredient(ingredientName, value) {
      let newIngredient = { ingredientName: value };
      Object.assign(this.ingredientToOrder, newIngredient);
      return this.ingredientToOrder;
    },
  },
};
</script>

<style lang="scss"></style>
