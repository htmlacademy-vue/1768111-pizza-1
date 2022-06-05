<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link
        class="layout__link"
        active-class="layout__link--active"
        :to="{ name: 'Orders' }"
        >История заказов</router-link
      >
      <router-link class="layout__link" :to="{ name: 'Profile' }"
        >Мои данные</router-link
      >
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <div v-if="orders.length">
        <section
          v-for="(order, index) in orders"
          :key="order.id"
          class="sheet order"
        >
          <div class="order__wrapper">
            <div class="order__number">
              <b>Заказ #{{ order.id }}</b>
            </div>

            <div class="order__sum">
              <span>Сумма заказа: {{ ordersPrices[index] }} ₽</span>
            </div>

            <div class="order__button">
              <button
                type="button"
                class="button button--border"
                @click="deleteOrder(order.id)"
              >
                Удалить
              </button>
            </div>
            <div class="order__button">
              <button type="button" class="button" @click="renewOrder(order)">
                Повторить
              </button>
            </div>
          </div>

          <ul class="order__list">
            <OrdersPizza
              v-for="pizza in order.orderPizzas"
              :key="pizza.id"
              :pizza="pizza"
              class="order__item"
            />
          </ul>

          <ul class="order__additional">
            <OrdersAdd
              v-for="add in order.orderMisc"
              :key="add.id"
              :add="add"
            />
          </ul>

          <p class="order__address">
            Адрес доставки:
            {{ order.orderAddress ? order.orderAddress.name : "Самовывоз" }}
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import OrdersPizza from "@/common/components/orders/OrdersPizza.vue";
import OrdersAdd from "@/common/components/orders/OrdersAdd.vue";

export default {
  name: "Orders",
  components: {
    OrdersPizza,
    OrdersAdd,
  },
  computed: {
    ...mapState("cart", ["order", "pizzas"]),
    ...mapState("orders", ["orders"]),
    ...mapGetters("orders", ["ordersPrices"]),
  },
  methods: {
    ...mapActions("orders", ["getOrders", "deleteOrder", "repeatOrder"]),
    ...mapActions("cart", ["repeatOrder"]),
    async renewOrder(order) {
      await this.repeatOrder(order);
      await this.$router.push({ name: "Cart" });
    },
  },
  async mounted() {
    await this.getOrders();
  },
};
</script>
