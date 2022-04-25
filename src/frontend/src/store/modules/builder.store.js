import { UPDATE_PIZZA, CLEAR_PIZZA } from "@/store/mutations-types.js";

export default {
  namespaced: true,
  state: {
    pizzaToUpdate: {},
  },
  getters: {},
  mutations: {
    [UPDATE_PIZZA](state, pizza) {
      state.pizzaToUpdate = pizza;
    },
    [CLEAR_PIZZA](state) {
      state.pizzaToUpdate = {};
    },
  },
  actions: {
    updatePizza({ commit }, pizza) {
      commit(UPDATE_PIZZA, pizza);
    },
    clearPizza({ commit }) {
      commit(CLEAR_PIZZA);
    },
  },
};
