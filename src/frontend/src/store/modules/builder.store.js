import { normalizePizzas } from "@/common/helpers.js";
import pizzas from "@/static/pizza.json";
import {
  UPDATE_DOUGHS,
  UPDATE_SIZES,
  UPDATE_SAUCES,
  UPDATE_NAME,
  UPDATE_INGREDIENTS,
} from "@/store/mutations-types.js";

export default {
  namespaced: true,
  state: {
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
      price: 700,
    },
  },
  getters: {
    doughPrice(state) {
      return state.pizzas.dough.find(
        (item) => item.class === state.order.dough.name
      ).price;
    },
    sizeMultiplier(state) {
      return state.pizzas.sizes.find(
        (item) => item.class === state.order.size.name
      ).multiplier;
    },
    saucePrice(state) {
      return state.pizzas.sauces.find(
        (item) => item.class === state.order.sauce.name
      ).price;
    },
    ingredientsPrice(state) {
      let result = 0;
      let keys = Object.keys(state.order.ingredients);

      for (let i = 0; i < keys.length; i++) {
        result +=
          state.pizzas.ingredients.find((item) => item.class === keys[i])
            .price * state.order.ingredients[keys[i]];
      }

      return result;
    },
    orderPrice(state, getters) {
      return (
        getters.sizeMultiplier *
        (getters.doughPrice + getters.saucePrice + getters.ingredientsPrice)
      );
    },
  },
  mutations: {
    [UPDATE_NAME](state, name) {
      state.order.name = name;
    },
    [UPDATE_DOUGHS](state, dough) {
      state.order.dough.name = dough;
    },
    [UPDATE_SIZES](state, size) {
      state.order.size.name = size;
    },
    [UPDATE_SAUCES](state, sauce) {
      state.order.sauce.name = sauce;
    },
    [UPDATE_INGREDIENTS](state, ingredients) {
      state.order.ingredients = { ...state.order.ingredients, ...ingredients };
    },
  },
  actions: {
    updateName({ commit }, name) {
      commit(UPDATE_NAME, name);
    },
    updateDoughs({ commit }, dough) {
      commit(UPDATE_DOUGHS, dough);
    },
    updateSizes({ commit }, size) {
      commit(UPDATE_SIZES, size);
    },
    updateSauces({ commit }, sauce) {
      commit(UPDATE_SAUCES, sauce);
    },
    updateIngredients({ commit, state }, ingredients) {
      commit(UPDATE_INGREDIENTS, ingredients);
      for (let propName in state.order.ingredients) {
        if (state.order.ingredients[propName] === 0) {
          delete state.order.ingredients[propName];
        }
      }
    },
    transferIngredient({ commit, state }, ingredient) {
      let ingredients = { ...state.order.ingredients, ...ingredient };
      if (ingredients[Object.keys(ingredient)[0]] < 3) {
        ingredients[Object.keys(ingredient)[0]] += 1;
      }
      commit(UPDATE_INGREDIENTS, ingredients);
    },
  },
};
