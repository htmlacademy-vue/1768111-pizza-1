<template>
  <div>
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon" @click="getAddressToEdit">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <p>{{ `${address.street}, ${address.building}, ${address.flat}` }}</p>
    <small>{{ address.comment }}</small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddress",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getAddressToEdit() {
      const addressToEdit = {
        id: this.address.id,
        name: this.address.name,
        street: this.address.street,
        building: this.address.building,
        flat: this.address.flat,
        comment: this.address.comment,
      };
      this.$emit("enableEdit");
      this.$emit("setAddress", addressToEdit);
    },
  },
};
</script>
