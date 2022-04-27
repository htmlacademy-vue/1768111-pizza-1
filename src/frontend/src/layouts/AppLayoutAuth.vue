<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'Index' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }">{{ totalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link :to="{ name: 'Index' }" class="header__login" v-if="!isAuth"
        ><span>Войти</span></router-link
      >
      <router-link :to="{ name: 'Profile' }" v-if="isAuth">
        <picture>
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a class="header__logout" v-if="isAuth" @click="logOut"
        ><span>Выйти</span></a
      >
    </div>
  </header>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "AppLayoutAuth",
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["isAuth"]),
    ...mapGetters("cart", ["totalPrice"]),
  },
  methods: {
    ...mapActions("auth", ["logOut"]),
  },
};
</script>
