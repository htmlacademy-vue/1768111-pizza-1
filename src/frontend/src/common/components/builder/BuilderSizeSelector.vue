<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          :class="'diameter__input diameter__input--' + size.class"
        >
          <RadioButton
            name="diameter"
            :value="size.class"
            class="visually-hidden"
            :checked="size.class === orderSize.name"
            @change="setSize"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  data() {
    return {};
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    orderSize: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setSize(evt) {
      this.$emit("setSize", evt.target.value);
    },
  },
};
</script>
