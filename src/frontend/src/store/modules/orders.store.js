export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async postOrder({ state }, postData) {
      await this.$api.orders.post(postData);
    },
  },
};
