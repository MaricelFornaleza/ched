<template>
  <div class="home">
    <div class="h-full w-full text-center p-10">
      <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        <advanced-widget bgColor="bg-info-light" textColor="text-info">
          <template v-slot:icon><LibraryIcon class="h-8" /></template>
          <template v-slot:count>{{ hei.total }}</template>
          <template v-slot:label>Higher Education Institutions</template>
          <template v-slot:data>
            <data-count :dataCount="hei.countSuc" dataLabel="SUC"></data-count>
            <data-count :dataCount="hei.countLuc" dataLabel="LUC"></data-count>
            <data-count
              :dataCount="hei.countPrivate"
              dataLabel="Private"
            ></data-count>
            <data-count :dataCount="hei.countOgs" dataLabel="OGS"></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-error-light" textColor="text-error">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>{{ graduates.total }}</template>
          <template v-slot:label>NSTP Graduates</template>
          <template v-slot:data
            ><data-count
              :dataCount="graduates.cwts"
              dataLabel="CWTS"
            ></data-count>
            <data-count :dataCount="graduates.lts" dataLabel="LTS"></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-warning-light" textColor="text-warning">
          <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
          <template v-slot:count>{{ applications.total }}</template>
          <template v-slot:label>Total Applications</template>
          <template v-slot:data
            ><data-count
              :dataCount="applications.pending"
              dataLabel="Pending"
            ></data-count>
            <data-count
              :dataCount="applications.forApproval"
              dataLabel="For Approval"
            ></data-count>
            <data-count
              :dataCount="applications.forRevision"
              dataLabel="For Revision"
            ></data-count>
            <data-count
              :dataCount="applications.approved"
              dataLabel="Approved"
            ></data-count>
          </template>
        </advanced-widget>
      </div>

      <div class="mt-16 grid gap-10 md:grid-cols-1 xl:grid-cols-3">
        <div
          class="col-span-2 w-full bg-light-100 p-10 shadow-sm overflow-hidden"
        >
          <div class="flex justify-between mb-3 items-center">
            <div class="text-left">
              <div class="font-bold text-lg">NSTP Graudates</div>
              <div class="text-sm text-dark-100">Academic Year 2001-2011</div>
            </div>
            <button class="bg-info p-2 rounded text-light-100 h-fit">
              <DownloadIcon class="h-4" />
            </button>
          </div>
          <BarChart :chartData="testData" :options="options" />
          <div class="grid grid-cols-2 gap-10 py-5 px-20 mt-10">
            <progress-bar
              label="CWTS Graduates"
              count="345"
              total="500"
              bgColor="bg-warning-dark"
            />

            <progress-bar
              label="LTS Graduates"
              count="123"
              total="500"
              bgColor="bg-error"
            />
          </div>
        </div>
        <div class="flex justify-center bg-light-100">
          <ul class="list-group bg-white border border-light-300 w-full">
            <li
              class="
                flex
                justify-between
                px-6
                py-3
                bg-brand-blue
                text-light-100
              "
            >
              <div class="flex items-center">
                <DocumentTextIcon class="h-5 mr-2" />
                <div class="text-base">Recent Applications</div>
              </div>
              <button @click="goToApplications" class="text-xs underline">
                View all
              </button>
            </li>

            <list-item
              v-for="application in recentApplications"
              :key="application"
              class="list-item"
              :school="application.hei"
              :type="application.type"
              :date="application.dateApplied"
            ></list-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.list-group .list-item:nth-child(odd) {
  background-color: theme("colors.light.200");
}
</style>
<script>
// @ is an alias to /src

import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";
import ProgressBar from "@/partials/ProgressBar.vue";
import ListItem from "@/partials/ListItem.vue";
import { ref } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import Parse from "parse";
import router from "../router";
import {
  AcademicCapIcon,
  LibraryIcon,
  DocumentTextIcon,
  DownloadIcon,
} from "@heroicons/vue/solid";

Chart.register(...registerables);
export default {
  name: "HomeView",
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    LibraryIcon,
    DocumentTextIcon,
    DownloadIcon,
    DataCount,
    BarChart,
    ProgressBar,
    ListItem,
  },
  data() {
    return {
      hei: {
        total: 0,
        countSuc: 0,
        countLuc: 0,
        countPrivate: 0,
        countOgs: 0,
      },
      graduates: {
        total: 0,
        cwts: 0,
        lts: 0,
      },
      applications: {
        total: 0,
        forApproval: 0,
        forRevision: 0,
        approved: 0,
        pending: 0,
      },
      recentApplications: [],
    };
  },
  mounted() {
    this.getHeis();
    this.getApplications();
    this.getGaduates();
  },
  setup() {
    const testData = {
      labels: [
        "2001-02",
        "2002-03",
        "2003-04",
        "2004-05",
        "2005-06",
        "2006-07",
        "2007-08",
        "2008-09",
        "2009-10",
        "2010-11",
      ],
      datasets: [
        {
          label: "CWTS",
          data: [130, 140, 160, 170, 15, 10, 40, 90, 123, 54],
          backgroundColor: ["#FECA84"],
        },
        {
          label: "LTS",
          data: [10, 40, 90, 123, 54, 130, 140, 160, 170, 15],
          backgroundColor: ["#E93B5A"],
        },
      ],
    };

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    });

    return { testData, options };
  },

  methods: {
    async getHeis() {
      const query = new Parse.Query(Parse.User);
      query.equalTo("userType", "hei");
      this.hei.total = await query.count();
      query.equalTo("type", "LUC");
      this.hei.countLuc = await query.count();
      query.equalTo("type", "SUC");
      this.hei.countSuc = await query.count();
      query.equalTo("type", "Private");
      this.hei.countPrivate = await query.count();
      query.equalTo("type", "OGS");
      this.hei.countOgs = await query.count();
    },
    async getApplications() {
      var list = [];
      const Applications = Parse.Object.extend("Application");
      const query = new Parse.Query(Applications);
      query.limit(9);
      query.include("heiId");
      query.descending("dateApplied");

      var results = await query.find();
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        list.push({
          dateApplied: object.get("dateApplied").toLocaleDateString("en", {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          hei: object.get("heiId").get("name"),
          type: object.get("applicationType"),
        });
      }
      this.recentApplications = list;

      this.applications.total = await query.count();
      query.equalTo("status", "For Approval");
      this.applications.forApproval = await query.count();
      query.equalTo("status", "For Revision");
      this.applications.forRevision = await query.count();
      query.equalTo("status", "Approved");
      this.applications.approved = await query.count();
      query.notContainedIn("status", [
        "For Approval",
        "For Revision",
        "Approved",
      ]);
      this.applications.pending = await query.count();
    },
    async getGaduates() {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.exists("serialNumber");
      this.graduates.total = await query.count();
      query.startsWith("serialNumber", "C");
      this.graduates.cwts = await query.count();
      query.startsWith("serialNumber", "L");
      this.graduates.lts = await query.count();
    },
    goToApplications() {
      router.push({ name: "application" });
    },
  },
};
</script>
