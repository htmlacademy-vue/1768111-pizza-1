import Vue from "vue";
import Router from "vue-router";
import routes from "@/router/routes";
import store from "@/store";
import { middlewarePipeline } from "@/middlewares";

Vue.use(Router);

export default Promise.all(routes).then((routes) => {
  const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  router.beforeEach((to, from, next) => {
    const middlewares = to.meta.middlewares;

    if (!middlewares?.length) {
      return next();
    }

    const context = { to, from, next, store };
    const firstMiddlewareIndex = 0;
    const nextMiddlewareIndex = 1;

    return middlewares[firstMiddlewareIndex]({
      ...context,
      nextMiddleware: middlewarePipeline(
        context,
        middlewares,
        nextMiddlewareIndex
      ),
    });
  });
});
