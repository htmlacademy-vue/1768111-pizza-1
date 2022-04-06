<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="sauce in pizzas.sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton
              name="sauce"
              :value="sauce.class"
              :checked="sauce.class === order.sauce.name"
              @click="changeSauce($event.target.value)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderIngredientSelector
              v-for="ingredient in pizzas.ingredients"
              :key="ingredient.class"
              :ingredient="ingredient"
              :orderIngredients="order.ingredients"
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
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton, BuilderIngredientSelector },
  computed: {
    ...mapState("builder", ["pizzas", "order"]),
  },
  methods: {
    ...mapActions("builder", ["updateSauces"]),
    async changeSauce(sauce) {
      await this.updateSauces(sauce);
    },
  },
};
</script>
