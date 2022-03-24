<template>
  <header class="header">
    <div class="header__logo">
      <router-link class="logo" :to="{ name: 'Index' }">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }">{{ orderPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link v-if="isAuthorized" :to="{ name: 'Profile' }">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="img/users/user5.jpg"
            srcset="img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <router-link
        v-if="!isAuthorized"
        class="header__login"
        :to="{ name: 'Login' }"
      >
        <span>Войти</span></router-link
      >
      <router-link v-else class="header__logout" :to="{ name: 'Index' }"
        ><span>Выйти</span></router-link
      >
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppLayoutDefaultHeader",
  computed: {
    ...mapGetters("builder", ["orderPrice"]),
    isAuthorized() {
      return ["Cart", "Orders", "Profile"].includes(this.$route.name);
    },
  },
};
</script>
