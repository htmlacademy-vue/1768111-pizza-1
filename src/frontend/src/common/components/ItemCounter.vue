<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value <= 0"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="counter" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value >= 3"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  data() {
    return {
      counter: this.value,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    increase() {
      this.$emit("setIngredients", ++this.counter);
    },
    decrease() {
      this.$emit("setIngredients", --this.counter);
    },
  },
  watch: {
    value: function (value) {
      this.counter = value;
    },
  },
};
</script>
