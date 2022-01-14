<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value === 0 ? true : false"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      v-on="$listeners"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value === 3 ? true : false"
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
      value: 0,
    };
  },
  methods: {
    increase() {
      return this.value++;
    },
    decrease() {
      return this.value--;
    },
  },
};
</script>
