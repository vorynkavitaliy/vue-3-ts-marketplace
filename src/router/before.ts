import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
// import loadLayoutMiddleware from '../middleware/loadLayout.middleware';

export default async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  try {
    if (to.meta && to.meta.title && typeof to.meta.title === "string") {
      document.title = to.meta.title;
    } else {
      document.title = "Default Title";
    }

    // await loadLayoutMiddleware(to);

    // if (!to.meta.middleware) {
    //   return next();
    // }

    const middleware = (to.meta.middleware as ((context: any) => void)[]) || [];

    const context = {
      to,
      from,
      next,
    };

    if (middleware.length) {
      return middleware[0]({
        ...context,
      });
    }

    return next();
  } catch (error: any) {
    throw new Error(error);
  }
};
