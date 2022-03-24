import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
<<<<<<< HEAD

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
=======
import ViewLayout from "../layout/ViewLayout.vue";
import LandingView from "../views/LandingView.vue";
import HEIView from "../views/HEIView.vue"
import ApplicationView from "../views/ApplicationView.vue"
import EnrollmentView from "../views/EnrollmentView.vue"
import GraduatesView from "../views/GraduatesView.vue"
import SerialNumbersView from "../views/SerialNumbersView.vue"
import ReportSummaryView from "../views/ReportSummaryView.vue"
import NewHei from "../components/NewHei.vue";
import UploadHei from "../components/UploadHei.vue";
const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: "/nstp",
    component: ViewLayout,
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
      },
      {
        path: "/hei",
        name: "hei",
        component: HEIView,
      },
      {
        path: "/hei/new",
        name: "newHEI",
        component: NewHei,
      },
      {
        path: "/hei/upload",
        name: "uploadHEI",
        component: UploadHei,
      },
      {
        path: "/application",
        name: "application",
        component: ApplicationView,
      },
      {
        path: "/enrollment",
        name: "enrollment",
        component: EnrollmentView,
      },
      {
        path: "/graduates",
        name: "graduates",
        component: GraduatesView,
      },
      {
        path: "/serial-numbers",
        name: "serial-numbers",
        component: SerialNumbersView,
      },
      {
        path: "/report-summary",
        name: "report-summary",
        component: ReportSummaryView,
      },

    ]
  },
  
  
>>>>>>> f4d48e83982bc2872ada99abb37290858786a83e
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
