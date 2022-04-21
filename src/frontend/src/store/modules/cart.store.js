import {
  UPDATE_ORDER,
  UPDATE_AMOUNT,
  DELETE_PIZZA,
} from "@/store/mutations-types.js";
import Vue from "vue";
import adds from "@/static/misc.json";
import { normalizeOrderAdds } from "@/common/helpers.js";

export default {
  namespaced: true,
  state: {
    order: {
      pizzas: [],
      adds: normalizeOrderAdds(adds),
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
      order.amount = 1;
      order.id = Math.random().toString(16).slice(2);
      state.order.pizzas.push(order);
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
  },
};
