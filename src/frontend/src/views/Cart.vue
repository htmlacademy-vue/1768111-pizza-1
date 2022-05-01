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
        <button type="submit" class="button" @click.prevent="postOrders()">
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
    async checkout() {
      await this.$router.push("/success");
      await this.clearOrder();
    },
    setData(data) {
      this.addressInfo = { ...this.addressInfo, ...data };
    },
    getMiscs() {
      const miscs = [];
      const misc = {
        miscID: this.order.adds[0].id,
        quantity: this.order.adds[0].amount,
      };
      miscs.push(misc);
      return miscs;
    },
    // getMiscs() {
    //   this.order.adds
    //     .filter((el) => el.amount > 0)
    //     .map((el) => {
    //       return {
    //         miscId: el.id,
    //         quantity: el.amount,
    //       };
    //     });
    // },
    getPizzas() {
      const pizzas = [];
      const pizza = {
        name: this.order.pizzas[0].name,
        sauceId: this.pizzas.sauces.find(
          (item) => item.class === this.order.pizzas[0].sauce.name
        ).id,
        doughId: this.pizzas.dough.find(
          (item) => item.class === this.order.pizzas[0].dough.name
        ).id,
        sizeId: this.pizzas.sizes.find(
          (item) => item.class === this.order.pizzas[0].size.name
        ).id,
        ingredients: [
          {
            ingredientId: 1,
            quantity: 1,
          },
        ],
        quantity: this.order.pizzas[0].amount,
      };
      pizzas.push(pizza);
      return pizzas;
    },
    async postOrders() {
      const data = {
        userId: this.isAuth ? this.user.id : null,
        phone: this.addressInfo.userPhone,
        address: {
          street: this.addressInfo.userStreet,
          building: this.addressInfo.userHouse,
          flat: this.addressInfo.userApartment,
          comment: "",
        },
        pizzas: this.getPizzas(),
        misc: this.getMiscs(),
      };
      console.log(data);
      await this.postOrder(data);
    },
  },
};
</script>
