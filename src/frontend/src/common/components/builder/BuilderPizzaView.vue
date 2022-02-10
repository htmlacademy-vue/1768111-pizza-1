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
        v-model="pizzaName"
        @input="setName"
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
export default {
  name: "BuilderPizzaView",
  data() {
    return {
      pizzaName: "",
    };
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setName() {
      this.$emit("setName", this.pizzaName);
    },
  },
  computed: {
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
};
</script>
