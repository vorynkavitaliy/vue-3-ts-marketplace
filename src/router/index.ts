import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import before from "./before";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach(before);

export default router;
