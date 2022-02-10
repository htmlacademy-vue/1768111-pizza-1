<template>
  <input type="radio" v-on="$listeners" :checked="checked" />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
