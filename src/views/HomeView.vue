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

      <div class="mt-16 grid gap-10 md:grid-cols-1 xl:grid-cols-3">
        <div
          ref="document"
          class="col-span-2 w-full bg-light-100 p-10 shadow-sm overflow-hidden"
        >
          <div class="flex justify-between mb-3 items-center">
            <div class="text-left">
              <div class="font-bold text-lg">NSTP Graduates</div>
              <div class="text-sm text-dark-100">
                Academic Year {{ academicYear }}
              </div>
            </div>
            <button
              class="bg-info p-2 rounded text-light-100 h-fit cursor-pointer"
            >
              <DownloadIcon @click="exportToPDF" class="h-4" />
            </button>
          </div>

          <BarChart
            v-if="testData != null"
            :chartData="testData"
            :options="options"
          />
          <div
            v-else
            class="py-20 flex flex-col justify-center w-full text-light-400"
          >
            <img :src="EmptyGraph" alt="" class="h-56 mb-10" />
            <h2 class="font-body">No Data Found</h2>
          </div>
          <div class="grid grid-cols-2 gap-10 py-5 px-20 mt-10">
            <progress-bar
              label="CWTS Graduates"
              :count="graduates.cwts"
              :total="graduates.total"
              bgColor="bg-warning-dark"
            />

            <progress-bar
              label="LTS Graduates"
              :count="graduates.lts"
              :total="graduates.total"
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
            <div
              v-if="recentApplications == null"
              class="py-20 flex flex-col justify-center w-full text-light-400"
            >
              <empty-state class="pt-0 mt-0">
                <p class="text-4xl font-bold text-light-400">
                  No Application Found
                </p>
              </empty-state>
            </div>

            <list-item
              v-for="application in recentApplications"
              :key="application"
              class="list-item cursor-pointer"
              :school="application.hei"
              :type="application.type"
              :date="application.dateApplied"
              :status="application.status"
              @click="viewApplication(application.type, application.id)"
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
import html2pdf from "html2pdf.js";
import EmptyState from "@/components/EmptyState.vue";
import EmptyGraph from "@/assets/img/EmptyGraph.svg";

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
    EmptyState,
    DataCount,
    BarChart,
    ProgressBar,
    ListItem,
  },
  data() {
    return {
      EmptyGraph,
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
        rejected: 0,
        approved: 0,
        pending: 0,
      },
      recentApplications: [],
      years: [],
      academicYear: "",

      testData: null,
      cwts: [],
      lts: [],
      options: null,
    };
  },
  async created() {
    this.getHeis();
    this.getApplications();
    this.getGraduates();
    this.getData();
  },
  computed: {
    reverseApplications() {
      return this.recentApplications.slice().reverse();
    },
  },
  methods: {
    exportToPDF() {
      var opt = {
        margin: 0.5,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 5, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(this.$refs.document)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          window.open(pdf.output("bloburl"), "_blank");
        });
    },
    async getData() {
      const Applications = Parse.Object.extend("Application");
      const query = new Parse.Query(Applications);

      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const nstpenrollment = new Parse.Query(NstpEnrollment);
      nstpenrollment.exists("serialNumber");

      query.descending("academicYear");
      query.limit(10);
      query.ascending("academicYear");
      query.distinct("academicYear").then(async (res) => {
        this.years = res;
        for (let i = 0; i < res.length; i++) {
          query.equalTo("academicYear", res[i]);
          // const result = await query.find();
          nstpenrollment.matchesKeyInQuery("applicationId", "objectId", query);

          nstpenrollment.startsWith("serialNumber", "C");
          this.cwts.push(await nstpenrollment.count());
          nstpenrollment.startsWith("serialNumber", "L");
          this.lts.push(await nstpenrollment.count());
        }

        this.setData();
      });
    },
    setData() {
      const testData = {
        labels: this.years,
        datasets: [
          {
            label: "CWTS",
            data: Object.values(this.cwts),
            backgroundColor: ["#FECA84"],
          },
          {
            label: "LTS",
            data: Object.values(this.lts),
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
      const start = this.years[0].substring(0, 4);
      const end = this.years[this.years.length - 1].slice(-4);

      this.academicYear = start + "-" + end;

      this.testData = testData;
      this.options = options;
    },
    async getHeis() {
      const heiQuery = new Parse.Query(Parse.User);
      heiQuery.equalTo("userType", "hei");
      const userSubscription = await heiQuery.subscribe();

      userSubscription.on("open", async () => {
        console.log("heiHome subscription opened");
        // can get the list here
        var heis = await heiQuery.find();
        this.hei.total = heis.length;
        this.hei.countLuc = heis.filter((data) =>
          data.get("type").match("LUC")
        ).length;
        this.hei.countSuc = heis.filter((data) =>
          data.get("type").match("SUC")
        ).length;
        this.hei.countPrivate = heis.filter((data) =>
          data.get("type").match("Private")
        ).length;
        this.hei.countOgs = heis.filter((data) =>
          data.get("type").match("OGS")
        ).length;
        // this.hei.total = await query.count();
        // query.equalTo("type", "LUC");
        // this.hei.countLuc = await query.count();
        // query.equalTo("type", "SUC");
        // this.hei.countSuc = await query.count();
        // query.equalTo("type", "Private");
        // this.hei.countPrivate = await query.count();
        // query.equalTo("type", "OGS");
        // this.hei.countOgs = await query.count();
      });

      userSubscription.on("create", (object) => {
        console.log("object created" + object);
        this.hei.total++;
        switch (object.get("type")) {
          case "LUC":
            this.hei.countLuc++;
            break;
          case "SUC":
            this.hei.countSuc++;
            break;
          case "Private":
            this.hei.countPrivate++;
            break;
          case "OGS":
            this.hei.countOgs++;
            break;
        }
      });

      userSubscription.on("update", async (object) => {
        console.log("object updated" + object);
        //just update them all
        var heis = await heiQuery.find();
        this.hei.total = heis.length;
        this.hei.countLuc = heis.filter((data) =>
          data.get("type").match("LUC")
        ).length;
        this.hei.countSuc = heis.filter((data) =>
          data.get("type").match("SUC")
        ).length;
        this.hei.countPrivate = heis.filter((data) =>
          data.get("type").match("Private")
        ).length;
        this.hei.countOgs = heis.filter((data) =>
          data.get("type").match("OGS")
        ).length;
      });

      userSubscription.on("enter", (object) => {
        console.log("object entered" + object);
        this.hei.total++;
        switch (object.get("type")) {
          case "LUC":
            this.hei.countLuc++;
            break;
          case "SUC":
            this.hei.countSuc++;
            break;
          case "Private":
            this.hei.countPrivate++;
            break;
          case "OGS":
            this.hei.countOgs++;
            break;
        }
      });

      userSubscription.on("leave", (object) => {
        console.log("object left" + object);
        this.hei.total--;
        switch (object.get("type")) {
          case "LUC":
            this.hei.countLuc--;
            break;
          case "SUC":
            this.hei.countSuc--;
            break;
          case "Private":
            this.hei.countPrivate--;
            break;
          case "OGS":
            this.hei.countOgs--;
            break;
        }
      });

      userSubscription.on("delete", (object) => {
        console.log("object deleted" + object);
        this.hei.total--;
        switch (object.get("type")) {
          case "LUC":
            this.hei.countLuc--;
            break;
          case "SUC":
            this.hei.countSuc--;
            break;
          case "Private":
            this.hei.countPrivate--;
            break;
          case "OGS":
            this.hei.countOgs--;
            break;
        }
      });

      userSubscription.on("close", () => {
        console.log("heiHome subscription closed");
      });
    },
    async getApplications() {
      //better if queue is used instead of the usual array
      const Applications = Parse.Object.extend("Application");
      const query = new Parse.Query(Applications);
      query.include("heiId");

      const appSubscription = await query.subscribe();
      appSubscription.on("open", async () => {
        console.log("appHome subscription opened");
        // can get the list here
        var list = [];
        query.limit(9);
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
            status: object.get("status"),
          });
        }
        this.recentApplications = list;
        this.countApplications();
      });

      appSubscription.on("create", (object) => {
        console.log("object created" + object);
        // console.log("length: " + this.recentApplications.length);
        if (this.recentApplications.length >= 9) {
          this.recentApplications.splice(8, 1); //remove oldest application if apps > 9
        }
        this.recentApplications.unshift({
          //place latest app in the first index
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
        this.countApplications();
      });

      appSubscription.on("update", (object) => {
        console.log("object updated" + object);
        this.countApplications();
      });

      appSubscription.on("enter", (object) => {
        console.log("object entered" + object);
        if (this.recentApplications.length >= 9) {
          this.recentApplications.splice(8, 1); //remove oldest application if apps > 9
        }
        this.recentApplications.unshift({
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
        this.countApplications();
      });

      appSubscription.on("leave", (object) => {
        console.log("object left" + object);

        var index = this.recentApplications.findIndex(
          (app) => app.id == object.id
        );
        if (index > -1) //only delete if it exists
          this.recentApplications.splice(index, 1); //remove the specific object in the array
        this.countApplications();
      });

      appSubscription.on("delete", (object) => {
        console.log("object deleted" + object);

        var index = this.recentApplications.findIndex(
          (app) => app.id == object.id
        );
        console.log(index);
        if (index > -1) //only delete if it exists
          this.recentApplications.splice(index, 1); //remove the specific object in the array
        this.countApplications();
      });

      appSubscription.on("close", () => {
        console.log("heiApp subscription closed");
      });
    },
    async countApplications() {
      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);
      this.applications.total = await query.count();
      query.equalTo("status", "For Approval");
      this.applications.forApproval = await query.count();
      query.equalTo("status", "Rejected");
      this.applications.rejected = await query.count();
      query.equalTo("status", "Approved");
      this.applications.approved = await query.count();
      query.notContainedIn("status", ["For Approval", "Rejected", "Approved"]);
      this.applications.pending = await query.count();
    },
    async getGraduates() {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.exists("serialNumber");
      query.equalTo("isGraduated", true);

      const gradsSubscription = await query.subscribe();
      gradsSubscription.on("open", async () => {
        console.log("gradsHome subscription opened");
        this.countGraduates(); //lazy counting
      });

      gradsSubscription.on("create", (object) => {
        console.log("object created" + object);
        this.countGraduates();
      });

      gradsSubscription.on("update", (object) => {
        console.log("object updated" + object);
        this.countGraduates();
      });

      gradsSubscription.on("enter", (object) => {
        console.log("object entered" + object);
        this.countGraduates();
      });

      gradsSubscription.on("leave", (object) => {
        console.log("object left" + object);
        this.countGraduates();
      });

      gradsSubscription.on("delete", (object) => {
        console.log("object deleted" + object);
        this.countGraduates();
      });

      gradsSubscription.on("close", () => {
        console.log("gradsApp subscription closed");
      });
    },
    async countGraduates() {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.exists("serialNumber");
      query.equalTo("isGraduated", true);
      this.graduates.total = await query.count();
      query.startsWith("serialNumber", "C");
      this.graduates.cwts = await query.count();
      query.startsWith("serialNumber", "L");
      this.graduates.lts = await query.count();
    },
    viewApplication(type, id) {
      if (type == "New Application") {
        router.push({
          name: "1stStep",
          params: { application: id },
        });
      } else if (type == "For Additional Graduates") {
        router.push({
          name: "Step1",
          params: { application: id },
        });
      }
    },
    goToApplications() {
      router.push({ name: "application" });
    },
  },
};
</script>
