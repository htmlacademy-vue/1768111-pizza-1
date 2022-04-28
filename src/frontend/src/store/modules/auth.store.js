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
      addresses: [],
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
      dispatch("getAddress");
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
        state.user = { ...state.user, ...data };
      } catch {
        dispatch("logOut", false);
      }
    },
    async getAddress({ state }) {
      const addresses = await this.$api.addresses.query();
      state.user.addresses.push(...addresses);
    },
    async postAddress({ dispatch }, address) {
      await this.$api.addresses.post(address);
      dispatch("getAddress");
    },
  },
};
