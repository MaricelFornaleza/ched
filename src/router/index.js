import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
import NewApplication from "../components/NewApplication.vue";
import NewAppCopy from "../components/NewAppCopy.vue";

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
        path: "/application/new",
        name: "newApplication",
        component: NewApplication,
      },
      {
        path: "/application/copy",
        name: "Copy app",
        component: NewAppCopy,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
