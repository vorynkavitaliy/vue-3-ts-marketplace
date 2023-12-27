import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "home",
    path: "/",
    component: () => import("./home.view.vue"),
    meta: {
      title: "Home",
    },
  },
];

export default routes;
