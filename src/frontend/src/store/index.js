/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import "@/store/mutations-types.js";

Vue.use(Vuex);

const initState = () => ({});

const state = initState();

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/query");
  },
};

export default new Vuex.Store({
  state,
  actions,
  modules,
});
