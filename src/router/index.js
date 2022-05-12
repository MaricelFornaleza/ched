import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ViewLayout from "../layout/ViewLayout.vue";
import LandingView from "../views/LandingView.vue";
import HEIView from "../views/HEIView.vue";
import ApplicationView from "../views/ApplicationView.vue";
import EnrollmentView from "../views/EnrollmentView.vue";
import GraduatesView from "../views/GraduatesView.vue";
import HeiGraduatesView from "../views/HeiGraduatesView.vue";
import SerialNumbersView from "../views/SerialNumbersView.vue";
import ReportSummaryView from "../views/ReportSummaryView.vue";
import StudentsView from "../views/StudentsView.vue";
import SampleView from "../views/SampleView.vue";
  
import NewHei from "../components/NewHei.vue";
import UploadHei from "../components/UploadHei.vue";

import ApplicationSteps from "../layout/ApplicationSteps.vue";
import NewApplicationSteps from "../layout/NewApplicationSteps.vue";

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
import EditHei from '../components/EditHei.vue'

import Parse from "parse";


const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
    beforeEnter: () => {
      if (Parse.User.current() !== null) {
        return { name: 'home' }
      } 
    }
  },
  {
    path: "/nstp",
    component: ViewLayout,
     
    children: [
      {
        path: "/sample",
        name: "sample",
        component: SampleView,
        meta:{
          breadcrumb: [
            {name: 'sample'},
          ]
        }
      },
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta:{
          breadcrumb: [
            {name: 'Home'},
          ]
        },
        // beforeEnter: () => {
        //   if (Parse.User.current().get("userType") !== "admin" ) {
        //     return { name: '403' }
        //   } 
        // },
      },
      {
        path: "/hei",
        name: "hei",
        component: HEIView,
        meta:{
          breadcrumb: [
            {name: 'HEI'},
          ]
        },
        
        beforeEnter: () => {
          if (Parse.User.current().get("userType") !== "admin" ) {
            return { name: '403' }
          } 
        },
        
        
      },
      {
        path: "/hei/new",
        name: "newHEI",
        component: NewHei,
        meta: {
          breadcrumb: [{ name: "HEI", link: "/hei" }, { name: "New" }],
        },
        beforeEnter: () => {
          if (Parse.User.current().get("userType") !== "admin" ) {
            return { name: '403' }
          } 
        },
        
      },
      {
        path: "/hei/edit/:id",
        name: "editHei",
        component: EditHei,
        meta: {
          breadcrumb: [{ name: "HEI", link: "/hei" }, { name: "Edit" }],
        },
        
      },
      
      {
        path: "/my-account/edit/:id",
        name: "myAccount",
        component: EditHei,
        meta: {
          breadcrumb: [{ name: "My Account" }, { name: "Edit" }],
        },
        
      },
      {
        path: "/hei/upload",
        name: "uploadHEI",
        component: UploadHei,
        meta: {
          breadcrumb: [
            { name: "HEI", link: "/hei" },
            { name: "Upload Excel File" },
          ],
        },
        beforeEnter: () => {
          if (Parse.User.current().get("userType") !== "admin" ) {
            return { name: '403' }
          } 
        },
      },
      {
        path: "/application",
        name: "application",
        component: ApplicationView,
        meta: {
          breadcrumb: [{ name: "Applications" }],
        },
      },
      {
        path: "/application/new",
        component: NewApplicationSteps,
        children: [
          {
            path: "/application/new/1/:application",
            name: "1stStep",
            component: FirstStep,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'New Application'},
                {name: 'Step 1'},
              ]
            }
          },
          {
            path: "/application/new/2/:application",
            name: "2ndStep",
            component: SecondStep,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'New Application'},
                {name: 'Step 2'},
              ]
            }
          },
          {
            path: "/application/new/3/:application",
            name: "3rdStep",
            component: ThirdStep,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'New Application'},
                {name: 'Step 3'},
              ]
            }
          },
          {
            path: "/application/new/4/:application",
            name: "4thStep",
            component: FourthStep,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'New Application'},
                {name: 'Step 4'},
              ]
            }
          },
          {
            path: "/application/new/5/:application",
            name: "5thStep",
            component: FifthStep,
            props: true,
            meta:{
              breadcrumb: [
                { name: 'Application', link: '/application' },
                {name: 'New Application'},
                {name: 'Step 5'},
              ]
            }
          },
        ],
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
            meta: {
              breadcrumb: [
                { name: "Application", link: "/application" },
                { name: "Additional Graduates" },
                { name: "Step 1" },
              ],
            },
          },
          {
            path: "/application/additional/2/:application",
            name: "Step2",
            component: StepTwo,
            props: true,
            meta: {
              breadcrumb: [
                { name: "Application", link: "/application" },
                { name: "Additional Graduates" },
                { name: "Step 2" },
              ],
            },
          },
          {
            path: "/application/additional/3/:application",
            name: "Step3",
            component: StepThree,
            props: true,
            meta: {
              breadcrumb: [
                { name: "Application", link: "/application" },
                { name: "Additional Graduates" },
                { name: "Step 3" },
              ],
            },
          },
          {
            path: "/application/additional/4/:application",
            name: "Step4",
            component: StepFour,
            props: true,
            meta: {
              breadcrumb: [
                { name: "Application", link: "/application" },
                { name: "Additional Graduates" },
                { name: "Step 4" },
              ],
            },
          },
          {
            path: "/application/additional/5/:application",
            name: "Step5",
            component: StepFive,
            props: true,
            meta: {
              breadcrumb: [
                { name: "Application", link: "/application" },
                { name: "Additional Graduates" },
                { name: "Step 5" },
              ],
            },
          },
        ],
      },
      {
        path: "/enrollment",
        name: "enrollment",
        component: EnrollmentView,
        meta: {
          breadcrumb: [{ name: "Summary of Enrollment" }],
        },
        beforeEnter: () => {
          if (Parse.User.current().get("userType") !== "admin" ) {
            return { name: '403' }
          } 
        },
      },
    
      {
        path: "/graduates",
        name: "graduates",
        component: GraduatesView,
        meta: {
          breadcrumb: [{ name: "Summary of Graduates" }],
        },
      },
      {
        path: "/hei/graduates",
        name: "heiGraduates",
        component: HeiGraduatesView,
        meta: {
          breadcrumb: [{ name: "Summary of Graduates" }],
        },
      },
      {
        path: "/view-students/:sem/:year/:id",
        name: "viewStudents",
        component: StudentsView,
        meta: {
          breadcrumb:[{name: "View Students"}],
        }
      },
    
      {
        path: "/serial-numbers",
        name: "serial-numbers",
        component: SerialNumbersView,
        meta: {
          breadcrumb: [{ name: "Serial Numbers" }],
        },
        beforeEnter: () => {
          if (Parse.User.current().get("userType") !== "admin" ) {
            return { name: '403' }
          } 
        },
      },
      {
        path: "/report-summary",
        name: "report-summary",
        component: ReportSummaryView,
        meta: {
          breadcrumb: [{ name: "Report Summary" }],
        },
        beforeEnter: () => {
          if (Parse.User.current().get("userType") !== "admin" ) {
            return { name: '403' }
          } 
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'landing' && Parse.User.current() === null) next({ name: 'landing' })
    else next()
})

export default router;
