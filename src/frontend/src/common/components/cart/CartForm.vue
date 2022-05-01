<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          v-model="orderData.orderType"
          @change="emitData"
        >
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3" v-if="isAuth">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="orderData.userPhone"
          @change="emitData"
        />
      </label>

      <div class="cart-form__address" v-if="orderData.orderType > 1">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              v-model="orderData.userStreet"
              @change="emitData"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              v-model="orderData.userHouse"
              @change="emitData"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              v-model="orderData.userApartment"
              @change="emitData"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartForm",
  data() {
    return {
      orderData: {
        orderType: "2",
        userStreet: "",
        userHouse: "",
        userApartment: "",
        userPhone: "",
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuth"]),
  },
  methods: {
    emitData() {
      this.$emit("setData", this.orderData);
    },
  },
};
</script>
