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

            <BuilderPriceCounter :order="order" />
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
          price: 0,
        },
        size: {
          name: "normal",
          price: 0,
        },
        sauce: {
          name: "tomato",
          price: 0,
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
  watch: {
    getPrices() {
      if (this.order.dough.name === "light") {
        this.order.dough.price = 300;
      }
      return this.order.dough.price;
    },
  },
};
</script>

<style lang="scss"></style>
