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
          <transition-group name="ingredients">
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
          </transition-group>
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
      let size = this.pizzaToOrder.dough.name === "large" ? "big" : "small";
      let sauce =
        this.pizzaToOrder.sauce.name === "tomato" ? "tomato" : "creamy";
      return `pizza--foundation--${size}-${sauce}`;
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

<style lang="scss" scoped>
// Transitions
.ingredients-enter-active,
.ingredients-leave-active {
  transition: transform 0.5s, opacity 0.6s;
  transition-timing-function: ease;
}
.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.2);
  opacity: 0;
}
</style>
