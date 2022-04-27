<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in pizzas.dough"
          :key="dough.id"
          :class="'dough__input dough__input--' + dough.class"
        >
          <RadioButton
            name="dought"
            :value="dough.class"
            class="visually-hidden"
            :checked="dough.class === orderDough.name"
            @click="setDough($event)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import { mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  props: {
    orderDough: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("cart", ["pizzas"]),
  },
  methods: {
    setDough(evt) {
      this.$emit("setDough", evt.target.value);
    },
  },
};
</script>
