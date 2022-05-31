export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async postOrder({ state }, postData) {
      await this.$api.orders.post(postData);
    },
    async getOrders({ state }) {
      const orders = await this.$api.orders.query();
      state.orders.push(...orders);
    },
    async deleteOrder({ dispatch }, orderId) {
      await this.$api.orders.delete(orderId);
      dispatch("getOrders");
    },
  },
};
