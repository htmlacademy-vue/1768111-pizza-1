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
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <img :src="imageSrc" :alt="user.name" width="72" height="72" />
        <div class="user__name">
          <span>{{ user.name }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ user.phone }}</span>
        </p>
      </div>

      <div class="layout__address" v-if="user.addresses">
        <div
          class="sheet address-form"
          v-for="address in user.addresses"
          :key="address.id"
        >
          <div class="address-form__header">
            <b>{{ address.name }}</b>
            <div class="address-form__edit">
              <button type="button" class="icon">
                <span class="visually-hidden">Изменить адрес</span>
              </button>
            </div>
          </div>
          <p>{{ `${address.street}, ${address.building}, ${address.flat}` }}</p>
          <small>{{ address.comment }}</small>
        </div>
      </div>

      <AddressEditing v-if="isEditing" />

      <div class="layout__button">
        <button
          type="button"
          class="button button--border"
          @click="isEditing = !isEditing"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import AddressEditing from "@/common/components/profile/AddressEditing.vue";
import { mapState } from "vuex";

export default {
  name: "Profile",
  components: {
    AddressEditing,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    imageSrc() {
      return this.user.avatar.slice(8);
    },
  },
};
</script>
