import { normalizePizzas, getIngredientsList } from "@/common/helpers.js";
import pizzas from "@/static/pizza.json";
import {
  UPDATE_DOUGHS,
  UPDATE_SIZES,
  UPDATE_SAUCES,
  UPDATE_NAME,
  UPDATE_INGREDIENTS,
  UPDATE_TRANSFER_INGREDIENTS,
  CLEAR_ORDER,
  CHANGE_ORDER,
  UPDATE_PRICE,
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
      ingredients: getIngredientsList(pizzas.ingredients),
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
            .price * state.order.ingredients[keys[i]] || 0;
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
    [CLEAR_ORDER](state) {
      state.order = {
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
        price: 700,
      };
    },
    [CHANGE_ORDER](state, order) {
      state.order = order;
    },
    [UPDATE_NAME](state, name) {
      state.order.name = name;
    },
    [UPDATE_PRICE](state, price) {
      state.order.price = price;
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
    [UPDATE_INGREDIENTS](state, { ingredient, value }) {
      state.order.ingredients[ingredient] = value;
    },
    [UPDATE_TRANSFER_INGREDIENTS](state, { ingredient, value }) {
      state.order.ingredients[ingredient] += value;
    },
  },
  actions: {
    clearOrder({ commit }) {
      commit(CLEAR_ORDER);
    },
    changeOrder({ commit }, order) {
      commit(CHANGE_ORDER, order);
    },
    updateName({ commit }, name) {
      commit(UPDATE_NAME, name);
    },
    updatePrice({ commit }, price) {
      commit(UPDATE_PRICE, price);
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
    updateIngredients({ commit }, { ingredient, value }) {
      commit(UPDATE_INGREDIENTS, { ingredient, value });
    },
    transferIngredient({ commit, state }, { ingredient, value }) {
      if (state.order.ingredients[ingredient] < 3) {
        value = 1;
        commit(UPDATE_TRANSFER_INGREDIENTS, { ingredient, value });
      }
    },
  },
};
