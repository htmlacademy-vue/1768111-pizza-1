export default {
  namespaced: true,
  state: {
    user: false,
  },
  getters: {
    isAuth(state) {
      return state.user;
    },
  },
  mutations: {},
  actions: {},
};
