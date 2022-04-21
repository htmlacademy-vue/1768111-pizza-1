<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :doughs="pizzas.dough"
            @setDough="setDough"
            :orderDough="pizzaToOrder.dough"
          />
          <BuilderSizeSelector
            :sizes="pizzas.sizes"
            @setSize="setSize"
            :orderSize="pizzaToOrder.size"
          />
          <BuilderIngredientsSelector
            :ingredients="pizzas.ingredients"
            :sauces="pizzas.sauces"
            :orderIngredients="pizzaToOrder.ingredients"
            :orderSauce="pizzaToOrder.sauce"
            @setSauce="setSauce"
            @setIngredients="setIngredients"
          />

          <div class="content__pizza">
            <AppDrop @drop="transferIngredient">
              <BuilderPizzaView
                :pizzaToOrder="pizzaToOrder"
                @setName="setName"
              />
            </AppDrop>
            <BuilderPriceCounter
              :pizzaToOrder="pizzaToOrder"
              :orderPrice="orderPrice"
              @setDefaultSettings="setDefaultSettings"
            />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { normalizePizzas, getIngredientsList } from "@/common/helpers.js";
import pizzas from "@/static/pizza.json";

import BuilderDoughSelector from "@/common/components/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/common/components/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/common/components/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/common/components/builder/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/common/components/builder/BuilderPriceCounter.vue";
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    AppDrop,
  },
  data() {
    return {
      pizzas: normalizePizzas(pizzas),
      pizzaToOrder: {
        dough: {
          name: "light",
        },
        size: {
          name: "normal",
        },
        sauce: {
          name: "tomato",
        },
        ingredients: getIngredientsList(pizzas.ingredients),
        name: "",
      },
    };
  },
  computed: {
    doughPrice() {
      return this.pizzas.dough.find(
        (item) => item.class === this.pizzaToOrder.dough.name
      ).price;
    },
    sizeMultiplier() {
      return this.pizzas.sizes.find(
        (item) => item.class === this.pizzaToOrder.size.name
      ).multiplier;
    },
    saucePrice() {
      return this.pizzas.sauces.find(
        (item) => item.class === this.pizzaToOrder.sauce.name
      ).price;
    },
    ingredientsPrice() {
      let result = 0;
      let keys = Object.keys(this.pizzaToOrder.ingredients);

      for (let i = 0; i < keys.length; i++) {
        result +=
          this.pizzas.ingredients.find((item) => item.class === keys[i]).price *
            this.pizzaToOrder.ingredients[keys[i]] || 0;
      }
      return result;
    },
    orderPrice() {
      return (
        this.sizeMultiplier *
        (this.doughPrice + this.saucePrice + this.ingredientsPrice)
      );
    },
  },
  methods: {
    setName(name) {
      this.pizzaToOrder.name = name;
    },
    setDough(dough) {
      this.pizzaToOrder.dough.name = dough;
    },
    setSize(size) {
      this.pizzaToOrder.size.name = size;
    },
    setSauce(sauce) {
      this.pizzaToOrder.sauce.name = sauce;
    },
    setIngredients(ingredientName, ingredientCounter) {
      this.pizzaToOrder.ingredients[ingredientName] = ingredientCounter;
    },
    transferIngredient(ingredient) {
      if (this.pizzaToOrder.ingredients[Object.keys(ingredient)[0]] < 3) {
        this.pizzaToOrder.ingredients[Object.keys(ingredient)[0]] += 1;
      }
      return this.pizzaToOrder.ingredients;
    },
    setDefaultSettings() {
      this.pizzaToOrder = Object.assign({}, this.pizzaToOrder, {
        dough: {
          name: "light",
        },
        size: {
          name: "normal",
        },
        sauce: {
          name: "tomato",
        },
        ingredients: getIngredientsList(pizzas.ingredients),
        name: "",
      });
    },
  },
};
</script>
