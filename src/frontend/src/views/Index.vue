<template>
  <div>
    <AppLayout />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector :doughs="pizzas.dough" @setDough="setDough" />

          <BuilderSizeSelector :sizes="pizzas.sizes" @setSize="setSize" />

          <BuilderIngredientsSelector
            :ingredients="pizzas.ingredients"
            :sauces="pizzas.sauces"
            @setSauce="setSauce"
          />

          <div class="content__pizza">
            <BuilderPizzaView />

            <BuilderPriceCounter :order="order" :orderPrice="orderPrice" />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import "@/static/misc.json";
import pizzas from "@/static/pizza.json";
import "@/static/user.json";
import { normalizePizzas } from "@/common/helpers.js";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter.vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    AppLayout,
  },
  data() {
    return {
      pizzas: normalizePizzas(pizzas),
      order: {
        dough: {
          name: "light",
        },
        size: {
          name: "normal",
        },
        sauce: {
          name: "tomato",
        },
      },
    };
  },
  methods: {
    setDough(dough) {
      this.order.dough.name = dough;
    },
    setSize(size) {
      this.order.size.name = size;
    },
    setSauce(sauce) {
      this.order.sauce.name = sauce;
    },
  },
  computed: {
    doughPrice() {
      return this.pizzas.dough.find(
        (item) => item.class === this.order.dough.name
      ).price;
    },
    sizeMultiplier() {
      return this.pizzas.sizes.find(
        (item) => item.class === this.order.size.name
      ).multiplier;
    },
    saucePrice() {
      return this.pizzas.sauces.find(
        (item) => item.class === this.order.sauce.name
      ).price;
    },
    orderPrice() {
      return this.sizeMultiplier * (this.doughPrice + this.saucePrice);
    },
  },
};
</script>

<style lang="scss"></style>
