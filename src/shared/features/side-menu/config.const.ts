import { IPath } from "./../../interfaces/IPath";

export interface IRoute {
  name: string;
  icon: string;
  path: IPath;
  protect: boolean;
}

export default [
  {
    name: "Home",
    icon: "home",
    path: { name: "home" },
    protect: false,
  },

  {
    name: "Courses",
    icon: "category",
    path: { name: "courses" },
    protect: false,
  },
] as IRoute[];
