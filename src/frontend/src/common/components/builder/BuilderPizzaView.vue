<template>
  <div>
    <label class="input" for="pizza">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        id="pizza"
        placeholder="Введите
      название пиццы"
        @change="change($event.target.value)"
        required
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="getFoundationClass">
        <div class="pizza__wrapper">
          <div
            v-for="(ingredient, name) in this.order.ingredients"
            :key="name + ingredient"
            class="pizza__filling"
            :class="[
              'pizza__filling--' + name,
              ingredient == 2 ? 'pizza__filling--second' : '',
              ingredient == 3 ? 'pizza__filling--third' : '',
            ]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderPizzaView",
  data() {
    return {};
  },
  computed: {
    ...mapState("builder", ["pizzas", "order"]),
    getFoundationClass() {
      let foundationClass = "";
      switch (this.order.sauce.name) {
        case "tomato":
          foundationClass =
            this.order.dough.name === "large"
              ? "pizza--foundation--big-tomato"
              : "pizza--foundation--small-tomato";
          break;
        case "creamy":
          foundationClass =
            this.order.dough.name === "large"
              ? "pizza--foundation--big-creamy"
              : "pizza--foundation--small-creamy";
          break;
      }
      return foundationClass;
    },
  },
  methods: {
    ...mapActions("builder", ["updateName"]),
    async change(name) {
      await this.updateName(name);
    },
  },
};
</script>
