<template>
  <div v-if="loading" class="text-center">Loading...</div>
  <div class="p-10" v-else>
    <div class="flex justify-between">
      <div class="flex justify-start space-x-5 mb-5">
        <div class="inline-flex">
          <button
            @click="setToMonth"
            class="
              transition
              duration-200
              hover:bg-dark-100 hover:border-dark-100
              py-1
              px-3
              text-sm
              rounded-l-sm
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
              py-1
              px-3
              text-sm
              rounded-r-sm
            "
            :class="monthly ? '' : ' bg-dark-200 text-light-100'"
          >
            Annual
          </button>
        </div>
        <select
          @change="setCondition"
          v-model="month"
          v-if="monthly"
          name="month"
          id="month"
          class="
            text-light-100
            px-3
            py-1
            block
            rounded-sm
            sm:text-sm
            bg-brand-blue
          "
        >
          <option
            v-for="(month, index) in months"
            :key="index"
            class="bg-light-100 text-dark-300"
          >
            {{ month }}
          </option>
        </select>
        <select
          @change="setCondition"
          v-if="!monthly"
          v-model="year"
          name="year"
          id="year"
          class="
            text-light-100
            px-3
            py-1
            block
            rounded-sm
            sm:text-sm
            bg-brand-blue
          "
        >
          <option
            v-for="(year, index) in years"
            :key="index"
            class="bg-light-100 text-dark-300"
          >
            {{ year }}
          </option>
        </select>
      </div>
      <div class="">
        <button
          @click="exportToPDF"
          class="
            bg-error
            p-2
            rounded-sm
            text-light-100
            h-fit
            flex
            items-center
            text-sm
            space-x-3
          "
        >
          <span>Export to PDF</span>
          <DownloadIcon class="h-4" />
        </button>
      </div>
    </div>
    <div ref="report">
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
              :dataCount="applications.rejected"
              dataLabel="Rejected"
            ></data-count>
            <data-count
              :dataCount="applications.approved"
              dataLabel="Approved"
            ></data-count>
          </template>
        </advanced-widget>
      </div>
      <div
        ref="graph"
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
            <div class="font-bold text-lg">Serial Number Applications</div>
            <div class="text-sm text-dark-100">
              {{ filter.type }}: {{ filter.condition }}
            </div>
          </div>
          <button
            @click="exportGraphToPdf"
            class="bg-info p-2 rounded text-light-100 h-fit"
          >
            <DownloadIcon class="h-4" />
          </button>
        </div>
        <BarChart :chartData="testData" :options="options" />
        <div class="grid grid-cols-4 gap-10 py-5 px-5 lg:px-20 mt-10">
          <progress-bar
            label="Pending"
            :count="count.pending"
            :total="count.total"
            bgColor="bg-info-dark"
          />
          <progress-bar
            label="For Approval"
            :count="count.forApproval"
            :total="count.total"
            bgColor="bg-warning-dark"
          />

          <progress-bar
            label="Rejected"
            :count="count.rejected"
            :total="count.total"
            bgColor="bg-error"
          />
          <progress-bar
            label="Approved"
            :count="count.approved"
            :total="count.total"
            bgColor="bg-success-dark"
          />
        </div>
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
import html2pdf from "html2pdf.js";
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
        approved: 0,
        pending: 0,
        rejected: 0,
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
      years: [],
      labels: [],
      count: [],
      filter: { type: "Month", condition: null },
      testData: null,
      options: null,
      approved: [],
      forApproval: [],
      pending: [],
      rejected: [],
      month: null,
      year: null,

      loading: true,
    };
  },
  async created() {
    this.filter.condition = new Date().toLocaleString("en", { month: "long" });

    this.month = new Date().toLocaleString("en", { month: "long" });
    await this.getHeis();
    await this.getApplications();
    // this.year = this.years[0];
    await this.getGraduates();
    await this.getMonthlyData();

    this.loading = false;
  },
  methods: {
    exportToPDF() {
      var opt = {
        margin: 0.5,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 5, letterRendering: true },
        jsPDF: { unit: "in", format: "legal", orientation: "landscape" },
      };

      html2pdf()
        .set(opt)
        .from(this.$refs.report)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          window.open(pdf.output("bloburl"), "_blank");
        });
    },
    exportGraphToPdf() {
      var opt = {
        margin: 0.5,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 5, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(this.$refs.graph)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          window.open(pdf.output("bloburl"), "_blank");
        });
    },
    setToMonth() {
      this.monthly = !this.monthly;
      this.getMonthlyData();
    },

    setCondition(e) {
      this.filter.condition = e.target.value;
      this.getMonthlyData();
    },
    async getMonthlyData() {
      // reset all variables
      this.reset();
      var data = [];
      // get all of the Applications
      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);
      var res = await query.find();
      // put all applications in array.
      // include: status and date updated
      for (let i = 0; i < res.length; i++) {
        data.push({
          status: res[i].get("status"),
          updatedAt: res[i].updatedAt.toLocaleDateString("en", {
            month: "long",
            year: "numeric",
          }),
        });
      }
      // set labels
      if (this.monthly) {
        this.labels.push(this.month);
        this.filter.type = "Month";
        this.filter.condition = this.month;
      } else {
        this.labels = this.months;
        this.filter.type = "Year";
        this.filter.condition = this.year;
      }

      // if filtered MONTHLY make sure to include only the applications on the current year
      if (this.monthly) {
        data = data.filter((data) => data.updatedAt.match(this.year));
      }
      // filter according to condition
      data = data.filter((data) => data.updatedAt.match(this.filter.condition));

      for (let i = 0; i < this.labels.length; i++) {
        this.forApproval.push(
          data.filter(
            (data) =>
              data.updatedAt.match(this.labels[i]) &&
              data.status.match(/For Approval/)
          ).length
        );

        // this.forRevision.push(
        //   data.filter(
        //     (data) =>
        //       data.updatedAt.match(this.labels[i]) &&
        //       data.status.match(/For Revision/)
        //   ).length
        // );

        this.approved.push(
          data.filter(
            (data) =>
              data.updatedAt.match(this.labels[i]) &&
              data.status.match(/Approved/)
          ).length
        );
        this.pending.push(
          data.filter(
            (data) =>
              data.updatedAt.match(this.labels[i]) && data.status.match(/of 4/)
          ).length
        );

        this.rejected.push(
          data.filter(
            (data) =>
              data.updatedAt.match(this.labels[i]) &&
              data.status.match(/Rejected/)
          ).length
        );
      }
      const fa = this.sum(this.forApproval);
      const a = this.sum(this.approved);
      const p = this.sum(this.pending);
      const r = this.sum(this.rejected);
      this.count = {
        forApproval: fa,
        approved: a,
        pending: p,
        rejected: r,
        total: fa + a + p + r,
      };

      this.setData();
    },
    reset() {
      this.approved = [];
      this.forApproval = [];
      this.pending = [];
      this.rejected = [];
      this.labels = [];
      this.count = [];
      // this.year = new Date().toLocaleString("en", {
      //   year: "numeric",
      // });  //this will cause to
      // this.year = this.years[0];
    },
    sum(array) {
      var count = 0;
      for (let i = 0; i < array.length; i++) {
        count += array[i];
      }
      return count;
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
      // var list = [];
      const Applications = Parse.Object.extend("Application");
      const query = new Parse.Query(Applications);
      // query.limit(9);
      // query.include("heiId");
      // query.descending("dateApplied");

      // var results = await query.find();      //not needed
      // for (let i = 0; i < results.length; i++) {
      //   const object = results[i];
      //   list.push({
      //     id: object.id,
      //     dateApplied: object.get("dateApplied").toLocaleDateString("en", {
      //       weekday: "short",
      //       year: "numeric",
      //       month: "long",
      //       day: "numeric",
      //     }),
      //     hei: object.get("heiId").get("name"),
      //     type: object.get("applicationType"),
      //   });
      // }
      // this.recentApplications = list;

      // query.distinct("updatedAt").then((res) => {
      //   console.log(res);
      //   this.years = res;
      //   this.year = this.years[0];
      // });
      query.descending("updatedAt");
      const result = await query.find();
      let temp = [];
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        temp.push(
          element.get("updatedAt").toLocaleDateString("en", {
            year: "numeric",
          })
        );
      }
      this.years = [...new Set(temp)];
      this.year = this.years[0];

      this.applications.total = await query.count();
      query.equalTo("status", "For Approval");
      this.applications.forApproval = await query.count();
      // query.equalTo("status", "For Revision");
      // this.applications.forRevision = await query.count();
      query.equalTo("status", "Approved");
      this.applications.approved = await query.count();
      query.equalTo("status", "Rejected");
      this.applications.rejected = await query.count();
      query.notContainedIn("status", ["For Approval", "Approved", "Rejected"]);
      this.applications.pending = await query.count();
    },
    async getGraduates() {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.include("applicationId");

      const result = await query.find();
      this.enrollees.total = result.filter(
        (data) => data.get("applicationId").get("status") != "Rejected"
      ).length;
      // this.enrollees.total = await query.count();
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

    setData() {
      const testData = {
        labels: this.labels,
        datasets: [
          {
            label: "Pending",
            data: Object.values(this.pending),
            backgroundColor: ["#23AAE3"],
          },
          {
            label: "For Approval",
            data: Object.values(this.forApproval),
            backgroundColor: ["#FECA84"],
          },
          {
            label: "Approved",
            data: Object.values(this.approved),
            backgroundColor: ["#47D28F"],
          },
          {
            label: "Rejected",
            data: Object.values(this.rejected),
            backgroundColor: ["#FF5C5C"],
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
      this.testData = testData;
      this.options = options;
    },
  },
  computed: {},
};
</script>

<style>
</style>