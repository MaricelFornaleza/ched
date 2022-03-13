import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LandingView from "../views/LandingView.vue";
import HEIView from "../views/HEIView.vue"
import ApplicationView from "../views/ApplicationView.vue"
import EnrollmentView from "../views/EnrollmentView.vue"
import GraduatesView from "../views/GraduatesView.vue"
import SerialNumbersView from "../views/SerialNumbersView.vue"
import ReportSummaryView from "../views/ReportSummaryView.vue"





const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/hei",
    name: "hei",
    component: HEIView,
  },{
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
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
