<template>
  <div>
    <img
      :src="imageSrc"
      width="20"
      height="30"
      :alt="order.adds.find((el) => el.id === add.miscId).name"
    />
    <p>
      <span>{{ order.adds.find((el) => el.id === add.miscId).name }}</span>
      <b
        >{{ order.adds.find((el) => el.id === add.miscId).price }} ₽
        {{ add.quantity > 1 ? `x${add.quantity}` : "" }}</b
      >
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrdersAdd",
  props: {
    add: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("cart", ["order"]),
    imageSrc() {
      return this.order.adds
        .find((el) => el.id === this.add.miscId)
        .image.slice(8);
    },
  },
};
</script>
