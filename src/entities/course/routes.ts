import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "course",
    path: "/course/:id",
    component: () => import("./course.view.vue"),
    meta: {
      title: "Course",
    },
  },
];

export default routes;
