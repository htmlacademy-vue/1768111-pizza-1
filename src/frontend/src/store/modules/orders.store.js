export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async postOrder(order) {
      await this.$api.orders.post(order);
    },
  },
};
