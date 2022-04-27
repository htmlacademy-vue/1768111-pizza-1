<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizzas.sizes"
          :key="size.id"
          :class="'diameter__input diameter__input--' + size.class"
        >
          <RadioButton
            name="diameter"
            :value="size.class"
            class="visually-hidden"
            :checked="size.class === orderSize.name"
            @click="setSize($event)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import { mapState } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  props: {
    orderSize: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("cart", ["pizzas"]),
  },
  methods: {
    setSize(evt) {
      this.$emit("setSize", evt.target.value);
    },
  },
};
</script>
