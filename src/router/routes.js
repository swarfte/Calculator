const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("pages/IndexPage.vue"),
  },
  {
    path: "/general",
    name: "GeneralPage",
    component: () => import("pages/GeneralPage.vue"),
  },
  {
    path: "/matrix",
    name: "MatrixPage",
    component: () => import("pages/MatrixPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
