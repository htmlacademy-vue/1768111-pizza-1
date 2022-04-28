import Vue from "vue";
import Router from "vue-router";
import routes from "@/router/routes";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters["auth/isAuth"];
  const authReq = to.meta?.authReq;
  if (!isAuth && to.name !== "Login" && authReq) {
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;
