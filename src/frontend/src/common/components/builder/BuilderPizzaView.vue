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
        v-model.trim="pizzaName"
        maxlength="30"
        @input="setName($event.target.value)"
        required
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="getFoundationClass">
        <div class="pizza__wrapper">
          <div
            v-for="(ingredient, name) in this.pizzaToOrder.ingredients"
            :key="name + ingredient"
            class="pizza__filling"
            :class="[
              ingredient >= 1 ? 'pizza__filling--' + name : '',
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
    pizzaToOrder: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getFoundationClass() {
      let foundationClass = "";
      switch (this.pizzaToOrder.sauce.name) {
        case "tomato":
          foundationClass =
            this.pizzaToOrder.dough.name === "large"
              ? "pizza--foundation--big-tomato"
              : "pizza--foundation--small-tomato";
          break;
        case "creamy":
          foundationClass =
            this.pizzaToOrder.dough.name === "large"
              ? "pizza--foundation--big-creamy"
              : "pizza--foundation--small-creamy";
          break;
      }
      return foundationClass;
    },
  },
  methods: {
    setName() {
      this.$emit("setName", this.pizzaName);
    },
  },
  watch: {
    pizzaToOrder: {
      handler(value) {
        this.pizzaName = value.name;
      },
      deep: true,
    },
  },
  created() {
    if (Object.keys(this.pizzaToOrder.name)) {
      this.pizzaName = this.pizzaToOrder.name;
    }
  },
};
</script>
