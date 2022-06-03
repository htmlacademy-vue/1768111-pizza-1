<template>
  <div>
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>
            {{ pizzas.sizes.find((size) => size.id == pizza.sizeId).name }},
            {{ pizza.doughId === 1 ? "на тонком тесте" : "на толстом тесте" }}
          </li>
          <li>
            Соус:
            {{
              pizzas.sauces
                .find((sauce) => sauce.id == pizza.sauceId)
                .name.toLowerCase()
            }}
          </li>
          <li>Начинка: {{ pizzaIngredients }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      {{ pizza.quantity > 1 ? `x${pizza.quantity}` : "" }}{{ pizzaPrice }} ₽
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { cloneDeep } from "lodash";

export default {
  name: "OrdersPizza",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("cart", ["pizzas"]),
    ...mapState("orders", ["orders"]),
    pizzaIngredients() {
      let result = "";
      let filteredIngredients = cloneDeep(this.pizza.ingredients).filter(
        (ingredient) => ingredient.quantity > 0
      );
      for (let i = 0; i < filteredIngredients.length; i++) {
        result +=
          this.pizzas.ingredients
            .find(
              (ingredient) =>
                ingredient.id === filteredIngredients[i].ingredientId
            )
            .name.toLowerCase() + ", ";
      }
      return result.substring(0, result.length - 2);
    },
    pizzaPrice() {
      const doughPrice = this.pizzas.dough.find(
        (item) => item.id === this.pizza.doughId
      ).price;
      const saucePrice = this.pizzas.sauces.find(
        (item) => item.id === this.pizza.sauceId
      ).price;
      const sizeMultiplier = this.pizzas.sizes.find(
        (item) => item.id === this.pizza.sizeId
      ).multiplier;
      let ingredientsPrice = 0;
      const filteredIngredients = cloneDeep(this.pizza.ingredients).filter(
        (ingredient) => ingredient.quantity > 0
      );
      for (let i = 0; i < filteredIngredients.length; i++) {
        ingredientsPrice += this.pizzas.ingredients.find(
          (ingredient) => ingredient.id === filteredIngredients[i].ingredientId
        ).price;
      }
      return (ingredientsPrice + doughPrice + saucePrice) * sizeMultiplier;
    },
  },
};
</script>
