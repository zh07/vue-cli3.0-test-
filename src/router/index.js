import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/helloWorld",
    name: "HelloWorld",
    component: () => import("@/views/HelloWorld.vue")
  },
  {
    path: "/getPictrue",
    name: "GetPictrue",
    component: () => import("@/views/getPictrue.vue")
  },
  {
    path: "/echartsTest",
    name: "EchartsTest",
    component: () => import("@/views/echartsTest.vue")
  },
  {
    path: "/navIndex",
    name: "NavIndex",
    component: () => import("@/views/navIndex.vue"),
    children: [
      {
        path: "/test1",
        name: "Test1",
        component: () => import("@/views/test1.vue")
      },
      {
        path: "/test2",
        name: "Test2",
        component: () => import("@/views/test2.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
