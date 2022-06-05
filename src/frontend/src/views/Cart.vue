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

        <CartForm @setData="setData" />
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
        <button type="submit" class="button" @click.prevent="postOrders">
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
import CartForm from "@/common/components/cart/CartForm.vue";
import phoneFormatter from "phone-formatter";

export default {
  name: "Cart",
  components: {
    CartPizza,
    CartAdd,
    CartForm,
  },
  data() {
    return {
      addressInfo: {
        orderType: "2",
        userStreet: "",
        userHouse: "",
        userApartment: "",
        userPhone: "",
      },
    };
  },
  computed: {
    ...mapState("cart", ["order", "pizzas"]),
    ...mapState("auth", ["user"]),
    ...mapGetters("cart", ["totalPrice", "isEmpty"]),
    ...mapGetters("auth", ["isAuth"]),
  },
  methods: {
    ...mapActions("cart", ["clearOrder"]),
    ...mapActions("orders", ["postOrder"]),
    setData(data) {
      this.addressInfo = { ...this.addressInfo, ...data };
    },
    // getMiscs() {
    //   let miscs = [];
    //   this.order.adds.map((el) => {
    //     miscs.push({
    //       miscId: el.id,
    //       quantity: el.amount,
    //     });
    //   });
    //   return miscs;
    // },
    // getPizzas() {
    //   let pizzas = [];
    //   this.order.pizzas.map((el) => {
    //     let ingredients = [];

    //     Object.entries(el.ingredients).map((item) => {
    //       ingredients.push({
    //         quantity: item[1],
    //         ingredientId: this.pizzas.ingredients.find(
    //           (el) => el.class === item[0]
    //         ).id,
    //       });
    //     });

    //     pizzas.push({
    //       name: el.name,
    //       sauceId: this.pizzas.sauces.find(
    //         (item) => item.class === el.sauce.name
    //       ).id,
    //       doughId: this.pizzas.dough.find(
    //         (item) => item.class === el.dough.name
    //       ).id,
    //       sizeId: this.pizzas.sizes.find((item) => item.class === el.size.name)
    //         .id,
    //       quantity: el.amount,
    //       ingredients: ingredients,
    //     });
    //   });
    //   return pizzas;
    // },
    async postOrders() {
      let miscs = [];
      this.order.adds.map((el) => {
        miscs.push({
          miscId: el.id,
          quantity: el.amount,
        });
      });
      let pizzas = [];
      this.order.pizzas.map((el) => {
        let ingredients = [];

        Object.entries(el.ingredients).map((item) => {
          ingredients.push({
            quantity: item[1],
            ingredientId: this.pizzas.ingredients.find(
              (el) => el.class === item[0]
            ).id,
          });
        });

        pizzas.push({
          name: el.name,
          sauceId: this.pizzas.sauces.find(
            (item) => item.class === el.sauce.name
          ).id,
          doughId: this.pizzas.dough.find(
            (item) => item.class === el.dough.name
          ).id,
          sizeId: this.pizzas.sizes.find((item) => item.class === el.size.name)
            .id,
          quantity: el.amount,
          ingredients: ingredients,
        });
      });
      const data = {
        userId: this.isAuth ? this.user.id : null,
        phone: this.addressInfo.userPhone
          ? phoneFormatter.format(
              this.addressInfo.userPhone,
              "+7 NNN-NNN-NN-NN"
            )
          : phoneFormatter.format(this.user.phone, "+7 NNN-NNN-NN-NN"),
        address: this.addressInfo.userStreet
          ? {
              street: this.addressInfo.userStreet || "",
              building: this.addressInfo.userHouse || "",
              flat: this.addressInfo.userApartment || "",
              comment: "",
            }
          : null,
        pizzas: pizzas,
        misc: miscs,
      };
      await this.postOrder(data);
      await this.$router.push({ name: "SuccessPopup" });
      await this.clearOrder();
    },
  },
};
</script>
