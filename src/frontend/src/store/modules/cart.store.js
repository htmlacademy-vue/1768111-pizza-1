import {
  UPDATE_ORDER,
  UPDATE_AMOUNT,
  DELETE_PIZZA,
  CLEAR_ORDER,
  GET_ADDS,
  GET_PIZZAS,
  REPEAT_ORDER,
} from "@/store/mutations-types.js";
import { getIngredientsList } from "@/common/helpers.js";
import Vue from "vue";
import { normalizeOrderAdds, normalizePizzas } from "@/common/helpers.js";

export default {
  namespaced: true,
  state: {
    pizzas: {},
    order: {
      pizzas: [],
      adds: [],
    },
  },
  getters: {
    isEmpty(state) {
      return Object.keys(state.order.pizzas).length === 0;
    },
    pizzasPrice(state, getters) {
      return !getters.isEmpty
        ? Object.values(state.order.pizzas).map(
            (item) => item.price * item.amount
          )
        : 0;
    },
    addsPrice(state, getters) {
      return !getters.isEmpty
        ? Object.values(state.order.adds).map(
            (item) => item.price * item.amount
          )
        : 0;
    },
    totalPrice(state, getters) {
      if (Object.keys(state.order.pizzas).length !== 0) {
        return [...getters.pizzasPrice, ...getters.addsPrice].reduce(
          (acc, item) => acc + item,
          0
        );
      } else {
        return 0;
      }
    },
  },
  mutations: {
    [UPDATE_ORDER](state, order) {
      if (!order.id) {
        order.amount = 1;
        order.id = state.order.pizzas.length + 1;
        state.order.pizzas.push(order);
      } else {
        state.order.pizzas[
          state.order.pizzas.findIndex((el) => el.id === order.id)
        ] = Object.assign(
          {},
          state.order.pizzas.find((el) => el.id === order.id),
          order
        );
      }
    },
    [UPDATE_AMOUNT](state, { obj, id, amount }) {
      if (obj === "adds") {
        id--;
        state.order[obj][id].amount = amount;
      }
      if (obj === "pizzas") {
        state.order[obj].find((el) => el.id === id).amount = amount;
      }
    },
    [DELETE_PIZZA](state, id) {
      Vue.delete(
        state.order.pizzas,
        state.order.pizzas.findIndex((el) => el.id === id)
      );
    },
    [CLEAR_ORDER](state) {
      state.order.pizzas = [];
    },
    [GET_ADDS](state, adds) {
      for (let i = 0; i < Object.keys(adds).length; i++) {
        state.order.adds.push(adds[i]);
      }
    },
    [GET_PIZZAS](state, pizzas) {
      state.pizzas = pizzas;
    },
    [REPEAT_ORDER](state, orderToRepeat) {
      state.order.adds.forEach(
        (add) =>
          (add.amount = orderToRepeat.orderMisc.find(
            (misc) => misc.miscId === add.id
          ).quantity)
      );
      orderToRepeat.orderPizzas.forEach((pizza) => {
        let ingredients = getIngredientsList(state.pizzas.ingredients);
        for (let i = 0; i < Object.keys(ingredients).length; i++) {
          ingredients[Object.keys(ingredients)[i]] =
            pizza.ingredients[i].quantity;
        }
        state.order.pizzas.push({
          dough: {
            name: state.pizzas.dough.find((dough) => dough.id === pizza.doughId)
              .class,
          },
          size: {
            name: state.pizzas.sizes.find((size) => size.id === pizza.sizeId)
              .class,
          },
          sauce: {
            name: state.pizzas.sauces.find(
              (sauce) => sauce.id === pizza.sauceId
            ).class,
          },
          ingredients: ingredients,
          name: pizza.name,
          price: 700,
          id: state.order.pizzas.length,
          amount: pizza.quantity,
        });
      });
    },
  },
  actions: {
    updateOrder({ commit }, newOrder) {
      commit(UPDATE_ORDER, newOrder);
    },
    updateAmount({ commit }, { obj, id, amount }) {
      commit(UPDATE_AMOUNT, { obj, id, amount });
    },
    deletePizza({ commit }, id) {
      commit(DELETE_PIZZA, id);
    },
    clearOrder({ commit }) {
      commit(CLEAR_ORDER);
    },
    repeatOrder({ commit }, orderToRepeat) {
      commit(CLEAR_ORDER);
      commit(REPEAT_ORDER, orderToRepeat);
    },
    async getAdds({ commit }) {
      const adds = await this.$api.misc.query();
      commit(GET_ADDS, normalizeOrderAdds(adds));
    },
    async getPizzas({ commit }) {
      const dough = await this.$api.dough.query();
      const ingredients = await this.$api.ingredients.query();
      const sauces = await this.$api.sauces.query();
      const sizes = await this.$api.sizes.query();
      const pizzas = {};
      pizzas.dough = dough;
      pizzas.ingredients = ingredients;
      pizzas.sauces = sauces;
      pizzas.sizes = sizes;
      const normalizedPizzas = normalizePizzas(pizzas);
      commit(GET_PIZZAS, normalizedPizzas);
    },
  },
};
