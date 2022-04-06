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
            :checked="dough.class === order.dough.name"
            @click="changeDough($event.target.value)"
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
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {};
  },
  computed: {
    ...mapState("builder", ["pizzas", "order"]),
  },
  methods: {
    ...mapActions("builder", ["updateDoughs"]),
    async changeDough(dough) {
      await this.updateDoughs(dough);
    },
  },
};
</script>
