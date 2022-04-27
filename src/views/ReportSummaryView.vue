<template>
  <div class="p-10">
    <div class="">
      <div class="flex justify-end space-x-5 mb-5">
        <select
          v-if="monthly"
          name="month"
          id="month"
          class="
            text-light-100
            px-3
            py-3
            block
            rounded-md
            sm:text-sm
            bg-brand-blue
          "
        >
          <option
            v-for="month in months"
            :key="month"
            value="{{month}}"
            class="bg-light-100 text-dark-300"
          >
            {{ month }}
          </option>
        </select>
        <select
          v-if="!monthly"
          name="year"
          id="year"
          class="
            text-light-100
            px-3
            py-3
            block
            rounded-md
            sm:text-sm
            bg-brand-blue
          "
        >
          <option
            v-for="year in years"
            :key="year"
            value="{{year}}"
            class="bg-light-100 text-dark-300"
          >
            {{ year }}
          </option>
        </select>
        <div class="inline-flex">
          <button
            @click="setToMonth"
            class="
              transition
              duration-200
              hover:bg-dark-100 hover:border-dark-100
              font-bold
              py-2
              px-4
              rounded-l-lg
            "
            :class="
              monthly
                ? ' bg-dark-200 text-light-100 border-2 border-dark-200'
                : 'bg-transparent border-2 border-dark-200   hover:text-light-100'
            "
          >
            Monthly
          </button>
          <button
            @click="setToMonth"
            class="
              transition
              duration-200
              border-2 border-dark-200
              hover:bg-dark-100 hover:border-dark-100 hover:text-light-100
              font-bold
              py-2
              px-4
              rounded-r-lg
            "
            :class="monthly ? '' : ' bg-dark-200 text-light-100'"
          >
            Annual
          </button>
        </div>
      </div>
    </div>

    <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
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
        <template v-slot:icon><UsersIcon class="h-8" /></template>
        <template v-slot:count>{{ enrollees.total }}</template>
        <template v-slot:label>NSTP Enrollees</template>
        <template v-slot:data
          ><data-count
            :dataCount="enrollees.first"
            dataLabel="1st Semester"
          ></data-count>
          <data-count
            :dataCount="enrollees.second"
            dataLabel="2nd Semester"
          ></data-count>
        </template>
      </advanced-widget>
      <advanced-widget bgColor="bg-success-light" textColor="text-success">
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
    <div
      class="
        col-span-2
        w-full
        bg-light-100
        p-10
        mt-10
        shadow-sm
        overflow-hidden
      "
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
      <div class="grid grid-cols-3 gap-10 py-5 px-20 mt-10">
        <progress-bar
          label="For Approval"
          count="345"
          total="1000"
          bgColor="bg-warning-dark"
        />

        <progress-bar
          label="For Revision"
          count="123"
          total="1000"
          bgColor="bg-error"
        />
        <progress-bar
          label="Approved"
          count="456"
          total="1000"
          bgColor="bg-success-dark"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";
import ProgressBar from "@/partials/ProgressBar.vue";
import { ref } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import Parse from "parse";
import {
  AcademicCapIcon,
  LibraryIcon,
  DocumentTextIcon,
  DownloadIcon,
  UsersIcon,
} from "@heroicons/vue/solid";
// import Parse from "parse";
Chart.register(...registerables);
export default {
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    LibraryIcon,
    DocumentTextIcon,
    DownloadIcon,
    DataCount,
    BarChart,
    ProgressBar,
    UsersIcon,
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
      enrollees: {
        total: 0,
        first: 0,
        second: 0,
      },
      monthly: true,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        2022,
      ],
    };
  },
  created() {
    this.getHeis();
    this.getApplications();
    this.getGraduates();
  },
  methods: {
    setToMonth() {
      this.monthly = !this.monthly;
    },
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
          id: object.id,
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
    async getGraduates() {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      this.enrollees.total = await query.count();
      query.equalTo("takenNstp1", true);
      this.enrollees.first = await query.count();
      query.equalTo("takenNstp2", true);
      this.enrollees.second = await query.count();

      query.exists("serialNumber");
      this.graduates.total = await query.count();
      query.startsWith("serialNumber", "C");
      this.graduates.cwts = await query.count();
      query.startsWith("serialNumber", "L");
      this.graduates.lts = await query.count();
    },
  },
  setup() {
    const testData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "For Approval",
          data: [130, 140, 160, 170, 15, 10, 40, 90, 123, 54, 54, 54],
          backgroundColor: ["#FECA84"],
        },
        {
          label: "For Revision",
          data: [10, 40, 90, 123, 54, 130, 140, 160, 170, 15, 15, 15],
          backgroundColor: ["#FF5C5C"],
        },
        {
          label: "Approved",
          data: [130, 140, 160, 170, 15, 10, 40, 90, 123, 54, 54, 54],
          backgroundColor: ["#47D28F"],
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
};
</script>

<style>
</style>