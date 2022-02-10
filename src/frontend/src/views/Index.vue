<template>
  <div>
    <AppLayout :orderPrice="order.price" />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :doughs="pizzas.dough"
            @setDough="setDough"
            :orderDough="order.dough"
          />

          <BuilderSizeSelector
            :sizes="pizzas.sizes"
            @setSize="setSize"
            :orderSize="order.size"
          />

          <BuilderIngredientsSelector
            :ingredients="pizzas.ingredients"
            :sauces="pizzas.sauces"
            :orderIngredients="order.ingredients"
            :orderSauce="order.sauce"
            @setSauce="setSauce"
            @setIngredients="setIngredients"
          />

          <div class="content__pizza">
            <AppDrop @drop="transferIngredient">
              <BuilderPizzaView :order="order" @setName="setName" />
            </AppDrop>
            <BuilderPriceCounter :order="order" :orderPrice="orderPrice" />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import "@/static/misc.json";
import pizzas from "@/static/pizza.json";
import "@/static/user.json";
import { normalizePizzas } from "@/common/helpers.js";
import BuilderDoughSelector from "@/common/components/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/common/components/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/common/components/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/common/components/builder/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/common/components/builder/BuilderPriceCounter.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    AppLayout,
    AppDrop,
  },
  data() {
    return {
      pizzas: normalizePizzas(pizzas),
      order: {
        dough: {
          name: "light",
        },
        size: {
          name: "normal",
        },
        sauce: {
          name: "tomato",
        },
        ingredients: {},
        name: "",
        price: 0,
      },
    };
  },
  methods: {
    setName(name) {
      this.order.name = name;
    },
    setDough(dough) {
      this.order.dough.name = dough;
    },
    setSize(size) {
      this.order.size.name = size;
    },
    setSauce(sauce) {
      this.order.sauce.name = sauce;
    },
    setIngredients(ingredientName, ingredientCounter) {
      this.$set(this.order.ingredients, ingredientName, ingredientCounter);
      this.cleanEmptyIngredients();
    },
    cleanEmptyIngredients() {
      for (let propName in this.order.ingredients) {
        if (this.order.ingredients[propName] === 0) {
          delete this.order.ingredients[propName];
        }
      }
      return this.order.ingredients;
    },
    transferIngredient(ingredient) {
      this.order.ingredients = { ...this.order.ingredients, ...ingredient };
      if (this.order.ingredients[Object.keys(ingredient)[0]] < 3) {
        this.order.ingredients[Object.keys(ingredient)[0]] += 1;
      }
      return this.order.ingredients;
    },
  },
  computed: {
    doughPrice() {
      return this.pizzas.dough.find(
        (item) => item.class === this.order.dough.name
      ).price;
    },
    sizeMultiplier() {
      return this.pizzas.sizes.find(
        (item) => item.class === this.order.size.name
      ).multiplier;
    },
    saucePrice() {
      return this.pizzas.sauces.find(
        (item) => item.class === this.order.sauce.name
      ).price;
    },
    ingredientsPrice() {
      let result = 0;
      let keys = Object.keys(this.order.ingredients);

      for (let i = 0; i < keys.length; i++) {
        result +=
          this.pizzas.ingredients.find((item) => item.class === keys[i]).price *
          this.order.ingredients[keys[i]];
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
};
</script>
