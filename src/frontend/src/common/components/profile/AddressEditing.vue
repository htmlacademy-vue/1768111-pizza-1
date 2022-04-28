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
          @click="clearAddress"
        >
          Удалить
        </button>
        <button type="submit" class="button" @click.prevent="post(postData)">
          Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddressEditing",
  data() {
    return {
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    userID() {
      return this.user.addresses.lenght;
    },
    postData() {
      return {
        userId: this.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };
    },
  },
  methods: {
    ...mapActions("auth", ["postAddress"]),
    clearAddress() {
      this.id = null;
      this.name = this.street = this.building = this.flat = this.comment = "";
    },
    async post(postData) {
      await this.postAddress(postData);
      this.clearAddress();
    },
  },
};
</script>
