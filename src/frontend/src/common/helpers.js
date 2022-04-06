import doughClasses from "@/common/classes/doughClasses.js";
import ingredientsClasses from "@/common/classes/ingredientsClasses.js";
import saucesClasses from "@/common/classes/saucesClasses.js";
import sizesClasses from "@/common/classes/sizesClasses.js";

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
