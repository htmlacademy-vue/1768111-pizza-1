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
        <ProfileAddress
          class="sheet address-form"
          v-for="address in user.addresses"
          :key="address.id"
          :address="address"
          @setAddress="setAddress"
          @enableEdit="enableEdit"
        />
      </div>
      <ProfileAddressEditing
        v-if="isEditing"
        :addressToEdit="addressToEdit"
        @disableEdit="disableEdit"
        @clearAddressToEdit="clearAddressToEdit"
      />

      <div class="layout__button">
        <button type="button" class="button button--border" @click="enableEdit">
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import ProfileAddressEditing from "@/common/components/profile/ProfileAddressEditing.vue";
import ProfileAddress from "@/common/components/profile/ProfileAddress.vue";
import { mapState } from "vuex";

export default {
  name: "Profile",
  components: {
    ProfileAddressEditing,
    ProfileAddress,
  },
  data() {
    return {
      isEditing: false,
      addressToEdit: {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    imageSrc() {
      return this.user.avatar.slice(8);
    },
  },
  methods: {
    enableEdit() {
      this.isEditing = true;
    },
    disableEdit() {
      this.isEditing = false;
    },
    setAddress(address) {
      this.addressToEdit = { ...this.addressToEdit, ...address };
    },
    clearAddressToEdit() {
      this.addressToEdit = {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },
  },
};
</script>
