<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="(dough, index) in doughs"
          :key="dough.id"
          :class="'dough__input dough__input--' + dough.class"
        >
          <RadioButton
            name="dought"
            :value="dough.class"
            class="visually-hidden"
            :checked="index === 0 ? true : false"
            @change="setDough"
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

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {};
  },
  props: {
    doughs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setDough(evt) {
      this.$emit("setDough", evt.target.value);
    },
  },
};
</script>

<style lang="scss"></style>
