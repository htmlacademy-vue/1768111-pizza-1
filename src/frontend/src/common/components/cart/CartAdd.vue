<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="this.imageSrc" width="39" height="60" :alt="add.name" />
      <span>{{ add.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          :disabled="amount <= 0"
          @click="decrease"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="amount"
          readonly
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          :disabled="amount >= 9"
          @click="increase"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>× {{ add.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartAdd",
  data() {
    return {
      amount: this.add.amount,
    };
  },
  props: {
    add: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageSrc() {
      return this.add.image.slice(8);
    },
  },
  methods: {
    ...mapActions("cart", ["updateAmount"]),
    async updateAddAmount(
      obj = "adds",
      id = this.add.id,
      amount = this.amount
    ) {
      await this.updateAmount({ obj, id, amount });
    },
    increase() {
      this.amount++;
      this.updateAddAmount();
    },
    decrease() {
      this.amount--;
      this.updateAddAmount();
    },
  },
};
</script>
