import router from "@/router";

export default {
  namespaced: true,
  state: {
    user: {
      userToken: null,
      avatar: null,
      email: null,
      id: null,
      name: null,
      phone: null,
    },
  },
  getters: {
    isAuth(state) {
      return !!state.user.userToken;
    },
  },
  mutations: {},
  actions: {
    async logIn({ dispatch, state }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      state.user.userToken = data.token;
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async logOut({ state }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      state.user.userToken = "";
      router.push("/");
    },
    async getMe({ dispatch, state }) {
      try {
        const data = await this.$api.auth.getMe();
        const addresses = await this.$api.addresses.query();
        state.user = { ...state.user, ...data, ...addresses };
      } catch {
        dispatch("logOut", false);
      }
    },
  },
};
