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
      pizzas: {},
      adds: normalizeOrderAdds(adds),
    },
  },
  getters: {
    isEmpty(state) {
      return Object.keys(state.order.pizzas).length === 0;
    },
    totalPrice(state) {
      if (Object.keys(state.order.pizzas).length !== 0) {
        let pizzasPrice = Object.values(state.order.pizzas).map(
          (item) => item.price * item.amount
        );

        let addsPrice = Object.values(state.order.adds).map(
          (item) => item.price * item.amount
        );

        return (
          [...pizzasPrice, ...addsPrice].reduce((acc, item) => acc + item, 0) ||
          0
        );
      } else {
        return 0;
      }
    },
  },
  mutations: {
    [UPDATE_ORDER](state, newOrder) {
      newOrder.amount = 1;
      newOrder.id = newOrder.name;
      state.order.pizzas[newOrder.id] = newOrder;
    },
    [UPDATE_AMOUNT](state, { obj, id, amount }) {
      if (obj === "adds") id--;
      state.order[obj][id].amount = amount;
    },
    [DELETE_PIZZA](state, id) {
      Vue.delete(state.order.pizzas, id);
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
