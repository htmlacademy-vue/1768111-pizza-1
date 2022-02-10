<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="setFoundationClass">
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
  props: {
    order: {
      type: Object,
      required: true,
    },
    data() {
      return {};
    },
  },
  computed: {
    setFoundationClass() {
      let foundationClass = "";
      if (
        this.order.sauce.name === "tomato" &&
        this.order.dough.name === "large"
      ) {
        foundationClass = "pizza--foundation--big-tomato";
      } else if (
        this.order.sauce.name === "tomato" &&
        this.order.dough.name === "light"
      ) {
        foundationClass = "pizza--foundation--small-tomato";
      } else if (
        this.order.sauce.name === "creamy" &&
        this.order.dough.name === "light"
      ) {
        foundationClass = "pizza--foundation--small-creamy";
      } else if (
        this.order.sauce.name === "creamy" &&
        this.order.dough.name === "large"
      ) {
        foundationClass = "pizza--foundation--big-creamy";
      }
      return foundationClass;
    },
  },
  cleanEmptyIngredients() {
    for (let propName in this.order.ingredients) {
      if (this.order.ingredients[propName] === 0) {
        delete this.order.ingredients[propName];
      }
    }
    this.$forceUpdate();
    return this.order.ingredients;
  },
};
</script>

<style lang="scss"></style>
