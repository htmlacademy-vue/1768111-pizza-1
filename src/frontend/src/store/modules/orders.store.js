import { cloneDeep } from "lodash";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    // eslint-disable-next-line no-unused-vars
    ordersPrices(state, getters, rootState) {
      let prices = [];
      state.orders.forEach((order, orderIndex) => {
        order.orderPizzas.forEach((pizza) => {
          const doughPrice = rootState.cart.pizzas.dough.find(
            (item) => item.id === pizza.doughId
          ).price;
          const saucePrice = rootState.cart.pizzas.sauces.find(
            (item) => item.id === pizza.sauceId
          ).price;
          const sizeMultiplier = rootState.cart.pizzas.sizes.find(
            (item) => item.id === pizza.sizeId
          ).multiplier;
          let ingredientsPrice = 0;
          const filteredIngredients = cloneDeep(pizza.ingredients).filter(
            (ingredient) => ingredient.quantity > 0
          );
          for (let i = 0; i < filteredIngredients.length; i++) {
            ingredientsPrice += rootState.cart.pizzas.ingredients.find(
              (ingredient) =>
                ingredient.id === filteredIngredients[i].ingredientId
            ).price;
          }
          const pizzaPrice =
            (ingredientsPrice + doughPrice + saucePrice) *
            sizeMultiplier *
            pizza.quantity;
          prices[orderIndex]
            ? (prices[orderIndex] += pizzaPrice)
            : (prices[orderIndex] = pizzaPrice);
        });
        order.orderMisc.forEach((add) => {
          prices[orderIndex] +=
            add.quantity *
            rootState.cart.order.adds.find((el) => el.id === add.miscId).price;
        });
      });
      return prices;
    },
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async postOrder({ state }, postData) {
      await this.$api.orders.post(postData);
    },
    async getOrders({ state }) {
      const orders = await this.$api.orders.query();
      state.orders = [];
      state.orders.push(...orders);
    },
    async deleteOrder({ dispatch }, orderId) {
      await this.$api.orders.delete(orderId);
      dispatch("getOrders");
    },
  },
};
