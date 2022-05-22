<template>
  <div>
    <div v-if="!allow" class="w-fit mx-auto">
      <AlertWidget className="alert-warning">
        Please complete the previous steps.
      </AlertWidget>
    </div>
    <div v-else>
      <div
        class="
          shadow-md
          p-5
          border
          text-left
          border-light-200
          my-10
          grid
          xl:grid-cols-2
          w-full
          xl:w-1/2 xl:divide-x
          divide-light-300
          space-y-2
          mx-auto
        "
      >
        <div class="flex flex-col space-y-2">
          <div class="grid grid-cols-2 text-sm">
            <div class="font-bold">Application Date:</div>
            <div class="">{{ data.dateApplied }}</div>
          </div>
          <div class="grid grid-cols-2 text-sm">
            <div class="font-bold">Date Approved:</div>
            <div class="">{{ data.dateApproved }}</div>
          </div>
          <div class="grid grid-cols-2 text-sm">
            <div class="font-bold">No. of Graduates:</div>
            <div class="">{{ data.graduates }}</div>
          </div>
        </div>
        <div class="flex flex-col space-y-2 xl:pl-5">
          <div class="grid grid-cols-2 text-sm">
            <div class="font-bold">NSTP Program:</div>
            <div class="">{{ data.program }}</div>
          </div>
          <div class="grid grid-cols-2 text-sm">
            <div class="font-bold">Award Year:</div>
            <div class="">{{ data.awardYear }}</div>
          </div>
          <div class="grid grid-cols-2 text-sm">
            <div class="font-bold">Serial Number Range:</div>
            <div class="">{{ data.snRange }}</div>
          </div>
        </div>
      </div>
      <view-students-datatable
        :students="students"
        :key="componentKey"
      ></view-students-datatable>

      <div class="flex justify-center space-x-5">
        <button
          @click="$emit('previousStep')"
          class="btn-sm btn-default btn-outline"
        >
          Back
        </button>

        <button
          @click="goToApplication()"
          class="btn-sm text-light-100 bg-brand-blue"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import AlertWidget from "@/partials/AlertWidget.vue";
import * as XLSX from "xlsx";
import ViewStudentsDatatable from "@/partials/ViewStudentsDatatable.vue";
export default {
  components: {
    AlertWidget,
    ViewStudentsDatatable,
  },
  data() {
    return {
      completed: false,
      data: {
        dateApplied: "",
        dateApproved: "",
        graduates: 0,
        program: "",
        awardYear: "",
        snRange: "",
      },
      students: [],
      componentKey: 0,
    };
  },
  props: {
    isCompleted: Boolean,
    appId: String,
    allow: Boolean,
    hei_username: String,
  },

  async created() {
    this.getData();
    await this.getStudents();
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    variant(stats) {
      if (stats == "Approved") {
        return "badge-success";
      } else if (stats == "For Approval") {
        return "badge-warning";
      } else if (stats == "For Revision") {
        return "badge-error";
      } else {
        //Ongoing
        return "badge";
      }
    },
    async getStudents() {
      var data = [];

      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      query.include("applicationId");
      query.include("studentId");
      query.include("nstpId");
      const results = await query.find();

      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        data.push({
          no: i,
          awardYear: object.get("applicationId").get("academicYear"),
          nstpProgram: object.get("nstpId").get("programName"),
          region:
            object.get("applicationId").get("heiId").get("address").regionNo +
            " - " +
            object.get("applicationId").get("heiId").get("address").regionName,
          serialNumber: object.get("serialNumber"),
          name: object.get("studentId").get("name"),
          birthdate: object.get("studentId").get("birthdate"),
          gender: object.get("studentId").get("gender"),
          address: object.get("studentId").get("address"),
          heiName: object.get("applicationId").get("heiId").get("name"),
          institutionalCode: object
            .get("applicationId")
            .get("heiId")
            .get("institutionalCode"),
          heiType: object.get("applicationId").get("heiId").get("type"),
          program: object.get("studentId").get("program"),
          emailAddress: object.get("studentId").get("emailAddress"),
          contactNumber: object.get("studentId").get("contactNumber"),
        });
      }
      this.students = data;
      this.forceRerender();
    },
    async downloadSN() {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      query.include("applicationId");
      query.include("studentId");
      query.include("nstpId");
      query.exists("serialNumber");

      const results = await query.find();

      let students = [];
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        students.push({
          awardYear: element.get("applicationId").get("awardYear"),
          programName: element.get("nstpId").get("programName"),
          lastName: element.get("studentId").get("name").lastName,
          firstName: element.get("studentId").get("name").firstName,
          middleName: element.get("studentId").get("name").middleName,
          extensionName: element.get("studentId").get("name").extensionName,
          serialNumber: element.get("serialNumber"),
        });
      }
      /* generate worksheet and workbook */
      const worksheet = XLSX.utils.json_to_sheet(students);
      const worksheetName = "NSTP LIST OF GRADUATES WITH SN";
      const workbook = XLSX.utils.book_new();
      const currentDate = new Date()
        .toLocaleDateString()
        .replace(/[^\w\s]/gi, "-");
      const workbookName = `Issued-SN-${this.hei_username}_${currentDate}.xlsx`; //update to include name of HEI
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);

      /* fix headers */
      // currently, styling cell values is only supported in SheetJS pro version :(
      // although, there are community forks alternatives to make this possible such as xlsx-js-style
      // ... to be updated
      const headers = [
        "AWARD YEAR",
        "PROGRAM NAME",
        "LAST NAME",
        "FIRST NAME",
        "MIDDLE NAME",
        "EXTENSION NAME",
        "SERIAL NUMBER",
      ];
      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

      /* calculate max column width */
      const max_width = students.reduce(
        (w, r) => Math.max(w, r.serialNumber.length),
        10
      );
      worksheet["!cols"] = [
        { wch: max_width },
        { wch: max_width },
        { wch: max_width },
        { wch: max_width },
        { wch: max_width },
        { wch: max_width },
        { wch: max_width },
      ];

      /* create an XLSX file and try to save to xlsx file*/
      XLSX.writeFileXLSX(workbook, workbookName);
    },
    async getData() {
      let _this = this;
      const Application = Parse.Object.extend("Application");
      const application = new Application();
      application.id = this.appId;

      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.equalTo("applicationId", application);
      query.include("applicationId");
      query.include("nstpId");

      await query.find().then(function (results) {
        _this.data.graduates = results.length;
        _this.data.dateApplied = results[0]
          .get("applicationId")
          .get("dateApplied")
          .toLocaleDateString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        _this.data.dateApproved = results[0]
          .get("applicationId")
          .get("dateApproved")
          .toLocaleDateString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        _this.data.awardYear = results[0].get("applicationId").get("awardYear");

        _this.data.program = results[0].get("nstpId").get("programName");
        const sn = results[0].get("applicationId").get("serialNumber");
        const region = results[0]
          .get("applicationId")
          .get("heiId")
          .get("address").regionNo;
        _this.data.snRange =
          _this.data.program.charAt(0) +
          " - " +
          region +
          " - " +
          (sn.start + "").padStart(6, "0") +
          " — " +
          (sn.end + "").padStart(6, "0") +
          " - " +
          _this.data.awardYear.slice(-2);
      });
    },
    setStatus(status) {
      this.$emit("setStatus", status);
      if (status == "Approved") {
        this.$emit("complete", 4);

        this.$emit("nextStep");
      }
      this.getData();
    },
    goToApplication() {
      this.$emit("complete", 4);
      this.$emit("goToApplication");
    },
  },
};
</script>