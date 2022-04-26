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
  actions: {
    async logIn({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async logOut(sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
    },
    async getMe({ dispatch }) {
      try {
        /* eslint-disable */
        const data = await this.$api.auth.getMe();
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch("logOut", false);
      }
    },
  },
};
