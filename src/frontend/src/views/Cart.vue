<template>
  <div class="sheet cart__empty" v-if="isEmpty">
    <p>В корзине нет ни одного товара</p>
  </div>
  <form action="test.html" method="post" class="layout-form" v-else>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <ul class="cart-list sheet">
          <CartPizza
            v-for="pizza in order.pizzas"
            :key="pizza.id"
            :pizza="pizza"
            class="cart-list__item"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdd v-for="add in order.adds" :key="add.id" :add="add" />
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select" v-model="orderType">
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
                v-model="userPhone"
              />
            </label>

            <div class="cart-form__address" v-if="orderType > 1">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" v-model="userStreet" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" v-model="userHouse" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" v-model="userApartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          class="button button--border button--arrow"
          :to="{ name: 'Index' }"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтобы собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button" @click.prevent="checkout">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import CartPizza from "@/common/components/cart/CartPizza.vue";
import CartAdd from "@/common/components/cart/CartAdd.vue";

export default {
  name: "Cart",
  components: {
    CartPizza,
    CartAdd,
  },
  data() {
    return {
      orderType: "2",
      userStreet: "",
      userHouse: "",
      userApartment: "",
      userPhone: "",
    };
  },
  computed: {
    ...mapState("cart", ["order"]),
    ...mapGetters("cart", ["totalPrice", "isEmpty"]),
    ...mapGetters("auth", ["isAuth"]),
    ...mapActions("cart", ["clearOrder"]),
  },
  methods: {
    async checkout() {
      await this.$router.push("/success");
      await this.clearOrder();
    },
  },
};
</script>
