import { RouteRecordRaw } from "vue-router";

import HomeRoutes from "@/entities/home/routes";
import CoursesRoutes from "@/entities/courses/routes";
import CourseRoutes from "@/entities/course/routes";

const routes: RouteRecordRaw[] = [
  ...HomeRoutes,
  ...CoursesRoutes,
  ...CourseRoutes,
];

export default routes;
