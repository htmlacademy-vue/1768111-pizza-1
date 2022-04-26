/* eslint-disable no-unused-vars */
import { uniqueId } from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "@/store/mutations-types.js";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

Vue.use(Vuex);

const initState = () => ({});

const state = initState();

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/query");
  },
  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };
    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

export default new Vuex.Store({
  state,
  actions,
  modules,
  plugins: [VuexPlugins],
});
