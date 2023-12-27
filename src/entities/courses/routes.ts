import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "courses",
    path: "/courses",
    component: () => import("./courses.view.vue"),
    meta: {
      title: "Courses",
    },
  },
];

export default routes;
