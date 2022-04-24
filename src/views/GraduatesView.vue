<template>
  <div v-if="loading" class="text-center">Loading...</div>
  <div v-else class="hei h-full w-full flex flex-col">
    <!-- render empty state if there is no data found -->
    <!-- <EmptyState /> -->
    <div class="w-full text-center p-10">
      <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        <advanced-widget bgColor="bg-warning-light" textColor="text-warning">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>{{ CWTS.maleNum + CWTS.femaleNum }}</template>
          <template v-slot:label
            >A/Y {{ year }} <strong>CWTS</strong> Enrollees</template
          >
          <template v-slot:data>
            <data-count :dataCount="CWTS.maleNum" dataLabel="Male"></data-count>
            <data-count
              :dataCount="CWTS.femaleNum"
              dataLabel="Female"
            ></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-info-light" textColor="text-info">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>{{ LTS.maleNum + LTS.femaleNum }}</template>
          <template v-slot:label
            >A/Y {{ year }} <strong>LTS</strong> Enrollees</template
          >
          <template v-slot:data>
            <data-count :dataCount="LTS.maleNum" dataLabel="Male"></data-count>
            <data-count
              :dataCount="LTS.femaleNum"
              dataLabel="Female"
            ></data-count>
          </template>
        </advanced-widget>

        <advanced-widget bgColor="bg-error-light" textColor="text-error">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>{{
            this.TOTAL.femaleNum + this.TOTAL.maleNum
          }}</template>
          <template v-slot:label
            >A/Y {{ year }} <strong>Total</strong> Enrollees</template
          >
          <template v-slot:data>
            <data-count
              :dataCount="TOTAL.maleNum"
              dataLabel="Male"
            ></data-count>
            <data-count
              :dataCount="TOTAL.femaleNum"
              dataLabel="Female"
            ></data-count>
          </template>
        </advanced-widget>
      </div>
    </div>

    <!-- dataTables  -->
    <div>
      <summary-data-table :objects="objects">
        <template v-slot:button>
          <select
            @change="setYear($event)"
            name="acadyear"
            id="acadyear"
            class="
              w-fit
              ml-auto
              text-light-100
              bg-brand-blue
              hover:bg-blue-800
              focus:ring-4 focus:ring-blue-300
              font-medium
              rounded-sm
              text-sm
              px-4
              py-2
              text-center
              inline-flex
              space-x-2
              items-center
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            "
          >
            <option
              v-for="(academicYear, index) in academicYears"
              :key="index"
              :value="academicYear"
              class="bg-light-100 text-dark-300"
            >
              {{ academicYear }}
            </option>
          </select>
        </template>
      </summary-data-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";
// import EmptyState from "@/components/EmptyState.vue";
import { AcademicCapIcon } from "@heroicons/vue/solid";
import SummaryDataTable from "@/partials/SummaryDataTable.vue";
import Parse from "parse";

export default {
  name: "EnrollmentView",
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    SummaryDataTable,
    DataCount,
  },
  data() {
    return {
      academicYears: [],
      year: "",

      objects: [],
      loading: true,
      CWTS: { femaleNum: 0, maleNum: 0 },
      LTS: { femaleNum: 0, maleNum: 0 },
      ROTC: { femaleNum: 0, maleNum: 0 },
      TOTAL: { femaleNum: 0, maleNum: 0 },
    };
  },
  async created() {
    await this.getYear();
    await this.getHeis();
    this.loading = false;
  },
  methods: {
    async getYear() {
      var acadYears = [];

      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);

      query.exists("academicYear");
      query.distinct("academicYear").then((results) => {
        for (let index = 0; index < results.length; index++) {
          const element = results[index];
          acadYears.push(element);
        }
        this.year = results[0];
      });

      this.academicYears = acadYears;
      // console.log(this.academicYears);
    },
    reset() {
      this.CWTS.femaleNum = 0;
      this.CWTS.maleNum = 0;
      this.LTS.femaleNum = 0;
      this.LTS.maleNum = 0;
      this.TOTAL.femaleNum = 0;
      this.TOTAL.maleNum = 0;
    },
    async getHeis() {
      this.reset();
      const query = new Parse.Query(Parse.User);
      query.equalTo("userType", "hei");
      query.ascending("name");
      const heis = await query.find();

      var heiData = [];
      // var index = 0;
      for (let index = 0; index < heis.length; index++) {
        const hei = heis[index];
        const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
        const enrollment = new Parse.Query(NstpEnrollment);
        enrollment.include("applicationId");
        enrollment.include("studentId");
        enrollment.include("nstpId");

        const Application = Parse.Object.extend("Application");
        const application = new Parse.Query(Application);
        application.equalTo("heiId", new Parse.Object("_User", { id: hei.id }));
        application.equalTo("academicYear", this.year);

        const Nstp = Parse.Object.extend("Nstp");
        const nstp = new Parse.Query(Nstp);
        nstp.equalTo("programName", "CWTS");

        const Student = Parse.Object.extend("Student");
        const student = new Parse.Query(Student);
        student.equalTo("heiId", new Parse.Object("_User", { id: hei.id }));
        student.equalTo("gender", "F");

        enrollment.equalTo("isGraduated", true);
        enrollment.matchesQuery("applicationId", application);
        enrollment.matchesQuery("nstpId", nstp);
        enrollment.matchesQuery("studentId", student);

        var femaleNum = await enrollment.count();
        this.CWTS.femaleNum += femaleNum;
        student.equalTo("gender", "M");
        enrollment.matchesQuery("studentId", student);
        var maleNum = await enrollment.count();
        this.CWTS.maleNum += maleNum;

        var cwtsObject = {
          male: maleNum,
          female: femaleNum,
          total: maleNum + femaleNum,
        };

        nstp.equalTo("programName", "LTS");
        student.equalTo("gender", "F");
        enrollment.matchesQuery("nstpId", nstp);
        enrollment.matchesQuery("studentId", student);

        femaleNum = await enrollment.count();
        this.LTS.femaleNum += femaleNum;
        student.equalTo("gender", "M");
        enrollment.matchesQuery("studentId", student);
        maleNum = await enrollment.count();
        this.LTS.maleNum += maleNum;

        var ltsObject = {
          male: maleNum,
          female: femaleNum,
          total: maleNum + femaleNum,
        };

        var heiObject = {
          id: hei.id,
          hei_name: hei.get("name"),
          cwts: cwtsObject,
          lts: ltsObject,
          rotc: ltsObject,
        };

        heiData.push(heiObject);
      }
      this.objects = heiData;
      // console.log(heiData);
      this.TOTAL.femaleNum = this.CWTS.femaleNum + this.LTS.femaleNum;
      this.TOTAL.maleNum = this.CWTS.maleNum + this.LTS.maleNum;
      // this.componentKey++;
    },
    setYear(e) {
      this.year = e.target.value;
      this.getHeis();
    },
  },
};
</script>