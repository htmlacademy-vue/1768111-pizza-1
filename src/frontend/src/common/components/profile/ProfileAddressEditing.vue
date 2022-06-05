<template>
  <div class="layout__address">
    <form
      action="test.html"
      method="post"
      class="address-form address-form--opened sheet"
    >
      <div class="address-form__header">
        <b>{{ name }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              v-model="name"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              v-model="street"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              v-model="building"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
              v-model="flat"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
              v-model="comment"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="deleteAddresses(deleteEditData)"
        >
          Удалить
        </button>
        <button
          type="submit"
          class="button"
          @click.prevent="publishAddresses()"
        >
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProfileAddressEditing",
  data() {
    return {
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
      isEdit: false,
    };
  },
  props: {
    addressToEdit: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("auth", ["user"]),
    postData() {
      return {
        userId: this.user.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };
    },
    editData() {
      return {
        id: this.id,
        userId: this.user.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };
    },
    deleteEditData() {
      return this.id;
    },
  },
  methods: {
    ...mapActions("auth", ["postAddress", "deleteAddress", "editAddress"]),
    clearAddress() {
      this.id = null;
      this.name = this.street = this.building = this.flat = this.comment = "";
    },
    async publishAddresses() {
      if (!this.addressToEdit.id) {
        await this.postAddress(this.postData);
      } else {
        await this.editAddress(this.editData);
      }
      this.clearAddress();
      this.$emit("clearAddressToEdit");
      this.$emit("disableEdit");
    },
    async editAddresses(postData) {
      await this.editAddress(postData);
      this.clearAddress();
      this.$emit("clearAddressToEdit");
      this.$emit("disableEdit");
    },
    async deleteAddresses(deleteData) {
      await this.deleteAddress(deleteData);
      this.clearAddress();
      this.$emit("clearAddressToEdit");
      this.$emit("disableEdit");
    },
  },
  created() {
    if (this.addressToEdit.id !== null) {
      this.id = this.addressToEdit.id;
      this.name = this.addressToEdit.name;
      this.street = this.addressToEdit.street;
      this.building = this.addressToEdit.building;
      this.flat = this.addressToEdit.flat;
      this.comment = this.addressToEdit.comment;
    }
  },
};
</script>
