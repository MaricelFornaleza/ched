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
import NewApplication1 from "../components/NewApplication-1.vue";
import NewApplication2 from "../components/NewApplication-2.vue";
import ApplicationSteps from "../layout/ApplicationSteps.vue"
import StepOne from '../components/additionalApplication/StepOne.vue'
import StepTwo from '../components/additionalApplication/StepTwo.vue'
import StepThree from '../components/additionalApplication/StepThree.vue'
import StepFour from '../components/additionalApplication/StepFour.vue'
import StepFive from '../components/additionalApplication/StepFive.vue'



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
        name: "newApplication1",
        component: NewApplication1,
        props: true,
      },
      {
        path: "/application/new/2",
        name: "newApplication2",
        component: NewApplication2,
      },
      {
        path: "/application/additional",
        component: ApplicationSteps,
        children: [
          {
            path: "/application/additional/1/:hei",
            name: "Step1",
            component: StepOne,
            props: true,
          },
          {
            path: "/application/additional/2/:hei",
            name: "Step2",
            component: StepTwo,
            props: true,
          },
          {
            path: "/application/additional/3/:hei",
            name: "Step3",
            component: StepThree,
            props: true,
          },
          {
            path: "/application/additional/4/:hei",
            name: "Step4",
            component: StepFour,
            props: true,
          },
          {
            path: "/application/additional/5/:hei",
            name: "Step5",
            component: StepFive,
            props: true,
          },
        ]
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
