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
            :checked="size.class === order.size.name"
            @click="change($event.target.value)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  data() {
    return {};
  },
  computed: {
    ...mapState("builder", ["pizzas", "order"]),
  },
  methods: {
    ...mapActions("builder", ["updateSizes"]),
    async change(size) {
      await this.updateSizes(size);
    },
  },
};
</script>
