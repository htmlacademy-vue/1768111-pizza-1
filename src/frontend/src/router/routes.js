import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
  },

  {
    path: "/success",
    name: "SuccessPopup",
    component: () => import("@/views/SuccessPopup.vue"),
  },

  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: { layout: "AppLayoutAuth", middlewares: [auth, isLoggedIn] },
  },

  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { layout: "AppLayoutAuth", middlewares: [auth, isLoggedIn] },
  },
];
