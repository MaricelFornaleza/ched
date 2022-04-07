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

import ApplicationSteps from "../layout/ApplicationSteps.vue"
import NewApplicationSteps from "../layout/NewApplicationSteps.vue"

import FirstStep from "../components/newApplication/FirstStep.vue";
import SecondStep from "../components/newApplication/SecondStep.vue";
import ThirdStep from "../components/newApplication/ThirdStep.vue";
import FourthStep from "../components/newApplication/FourthStep.vue";
import FifthStep from "../components/newApplication/FifthStep.vue";


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
        meta:{
          breadcrumb: [
            {name: 'Home'},
          ]
        }
      },
      {
        path: "/hei",
        name: "hei",
        component: HEIView,
        meta:{
          breadcrumb: [
            {name: 'HEI'},
          ]
        }
      },
      {
        path: "/hei/new",
        name: "newHEI",
        component: NewHei,
        meta:{
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            {name: 'New'}
          ]
        }
      },
      {
        path: "/hei/upload",
        name: "uploadHEI",
        component: UploadHei,
        meta:{
          breadcrumb: [
            { name: 'HEI', link: '/hei' },
            {name: 'Upload Excel File'}
          ]
        }
      },
      {
        path: "/application",
        name: "application",
        component: ApplicationView,
        meta:{
          breadcrumb: [
            { name: 'Applications' },
           
          ]
        }
      },
      {
        path: "/application/new",
        component: NewApplicationSteps,
        children: [
          {
            path: "/application/new/1/:hei",
            name: "1stStep",
            component: FirstStep,
            props: true,
            
          },
          {
            path: "/application/new/2/:hei",
            name: "2ndStep",
            component: SecondStep,
            props: true,
          },
          {
            path: "/application/new/3/:hei",
            name: "3rdStep",
            component: ThirdStep,
            props: true,
          },
          {
            path: "/application/new/4/:hei",
            name: "4thStep",
            component: FourthStep,
            props: true,
          },
          {
            path: "/application/new/5/:hei",
            name: "5thStep",
            component: FifthStep,
            props: true,
          },
        ]
      },
      {
        path: "/application/additional",
        component: ApplicationSteps,
        children: [
          {
            path: "/application/additional/1/:application",
            name: "Step1",
            component: StepOne,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'Additional Graduates'},
                {name: 'Step 1'},
              ]
            }
           
          },
          {
            path: "/application/additional/2/:application",
            name: "Step2",
            component: StepTwo,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'Additional Graduates'},
                {name: 'Step 2'},
              ]
            }
          },
          {
            path: "/application/additional/3/:application",
            name: "Step3",
            component: StepThree,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'Additional Graduates'},
                {name: 'Step 3'},
              ]
            }
          },
          {
            path: "/application/additional/4/:application",
            name: "Step4",
            component: StepFour,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'Additional Graduates'},
                {name: 'Step 4'},
              ]
            }
          },
          {
            path: "/application/additional/5/:application",
            name: "Step5",
            component: StepFive,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'Additional Graduates'},
                {name: 'Step 5'},
              ]
            }
          },
        ]
      },
      {
        path: "/enrollment",
        name: "enrollment",
        component: EnrollmentView,
        meta:{
          breadcrumb: [
            { name: 'Summary of Enrollment' },
           
          ]
        }
      },
      {
        path: "/graduates",
        name: "graduates",
        component: GraduatesView,
        meta:{
          breadcrumb: [
            { name: 'Summary of Graduates' },
           
          ]
        }
      },
      {
        path: "/serial-numbers",
        name: "serial-numbers",
        component: SerialNumbersView,
        meta:{
          breadcrumb: [
            { name: 'Serial Numbers' },
           
          ]
        }
      },
      {
        path: "/report-summary",
        name: "report-summary",
        component: ReportSummaryView,
        meta:{
          breadcrumb: [
            { name: 'Report Summary' },
           
          ]
        }
      },

    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
