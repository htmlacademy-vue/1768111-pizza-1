<template>
  <li>
    <div class="product cart-list__product">
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
          <li>{{ pizzaSize }}, {{ pizzaDough }}</li>
          <li>
            Соус:
            {{ pizzaSauce }}
          </li>
          <li>Начинка: {{ pizzaIngredients }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="amount <= 0"
        @click="decrease"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="pizza.amount"
        readonly
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        :disabled="amount >= 3"
        @click="increase"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.price * pizza.amount }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza()">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { cloneDeep } from "lodash";
import pizzas from "@/static/pizza.json";
import { normalizePizzas } from "@/common/helpers.js";

export default {
  name: "CartPizza",
  data() {
    return {
      pizzas: normalizePizzas(pizzas),
      amount: this.pizza.amount,
    };
  },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("cart", ["order"]),
    pizzaSize() {
      return this.pizzas.sizes.find(
        (item) => item.class == this.pizza.size.name
      ).name;
    },
    pizzaSauce() {
      return this.pizzas.sauces
        .find((item) => item.class == this.pizza.sauce.name)
        .name.toLowerCase();
    },
    pizzaDough() {
      return this.pizza.dough.name === "light"
        ? "на тонком тесте"
        : "на толстом тесте";
    },
    pizzaIngredients() {
      let result = "";
      let filteredIngredients = cloneDeep(this.pizza.ingredients);
      for (let propName in filteredIngredients) {
        if (filteredIngredients[propName] === 0) {
          delete filteredIngredients[propName];
        }
      }
      let keys = Object.keys(filteredIngredients);
      for (let i = 0; i < keys.length; i++) {
        result +=
          this.pizzas.ingredients
            .find((item) => item.class === keys[i])
            .name.toLowerCase() + ", ";
      }
      return result.substring(0, result.length - 2);
    },
  },
  methods: {
    ...mapActions("cart", ["updateAmount", "deletePizza"]),
    async updateAddAmount(
      obj = "pizzas",
      id = this.pizza.id,
      amount = this.amount
    ) {
      await this.updateAmount({ obj, id, amount });
    },
    async deleteOrderPizza() {
      await this.deletePizza(this.pizza.id);
    },
    changePizza() {
      this.$router.push({ path: "/" });
    },
    increase() {
      this.amount++;
      this.updateAddAmount();
    },
    async decrease() {
      this.amount--;
      this.amount === 0 ? this.deleteOrderPizza() : this.updateAddAmount();
    },
  },
  watch: {
    amount() {
      if (this.amount === 0) {
        this.deleteOrderPizza();
      }
    },
  },
};
</script>
