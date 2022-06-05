import doughClasses from "@/common/classes/doughClasses.js";
import ingredientsClasses from "@/common/classes/ingredientsClasses.js";
import saucesClasses from "@/common/classes/saucesClasses.js";
import sizesClasses from "@/common/classes/sizesClasses.js";

import { RESOURCES } from "@/common/constants";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.services";

export const normalizePizzas = (pizzas) => {
  pizzas.dough.forEach((n) => (n.class = doughClasses[n.id]));
  pizzas.ingredients.forEach((n) => (n.class = ingredientsClasses[n.id]));
  pizzas.sauces.forEach((n) => (n.class = saucesClasses[n.id]));
  pizzas.sizes.forEach((n) => (n.class = sizesClasses[n.id]));
  return {
    ...pizzas,
  };
};

export const normalizeOrderAdds = (adds) => {
  adds.forEach((n) => (n.amount = 1));
  return {
    ...adds,
  };
};

export const getIngredientsList = (obj) => {
  let result = {};
  for (let i = 0; i < obj.length; i++) {
    result[obj[i].class] = 0;
  }
  return result;
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const createResources = (notifier) => {
  return {
    [RESOURCES.AUTH]: new AuthApiService(notifier),
    [RESOURCES.USER]: new ReadOnlyApiService(RESOURCES.USER, notifier),
    [RESOURCES.INGREDIENT]: new ReadOnlyApiService(
      RESOURCES.INGREDIENT,
      notifier
    ),
    [RESOURCES.DOUGH]: new ReadOnlyApiService(RESOURCES.DOUGH, notifier),
    [RESOURCES.MISC]: new ReadOnlyApiService(RESOURCES.MISC, notifier),
    [RESOURCES.MISC]: new ReadOnlyApiService(RESOURCES.MISC, notifier),
    [RESOURCES.SAUCE]: new ReadOnlyApiService(RESOURCES.SAUCE, notifier),
    [RESOURCES.SIZE]: new ReadOnlyApiService(RESOURCES.SIZE, notifier),
    [RESOURCES.ORDER]: new CrudApiService(RESOURCES.ORDER, notifier),
    [RESOURCES.ADDRESS]: new CrudApiService(RESOURCES.ADDRESS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("auth/getMe");
};
