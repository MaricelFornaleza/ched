<template>
  <div v-if="loading" class="text-center">Loading...</div>
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
          xl:w-8/12 xl:divide-x
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
      <div class="w-fit mx-auto">
        <AlertWidget v-if="display_msg" className="alert-success">
          The Transmittal letter will be sent shortly.
        </AlertWidget>
      </div>

      <div
        v-if="admin"
        class="
          mx-auto
          my-5
          w-full
          xl:w-8/12
          flex
          justify-between
          p-5
          border border-light-300
        "
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-5">
            <img
              src="@/assets/img/pdf.png"
              class="h-8"
              alt="PDF Icon by Dimitry Miroliubov"
            />
            <div class="text-base">Transmittal Letter</div>
          </div>
          <div class="space-x-2">
            <button
              @click="downloadTransmittal"
              class="px-3 py-2 bg-dark-200 text-light-100 rounded-sm text-sm"
            >
              Download
              <DownloadIcon class="h-4 inline-flex" />
            </button>
            <button
              @click="sendTransmittal"
              class="px-3 py-2 bg-error text-light-100 rounded-sm text-sm"
            >
              Send to Email
              <PaperAirplaneIcon class="h-4 inline-flex" />
            </button>
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
import { jsPDF } from "jspdf";
import image from "@/assets/img/ched-logo.png";

import ViewStudentsDatatable from "@/partials/ViewStudentsDatatable.vue";
import { DownloadIcon, PaperAirplaneIcon } from "@heroicons/vue/outline";

export default {
  components: {
    AlertWidget,
    ViewStudentsDatatable,
    DownloadIcon,
    PaperAirplaneIcon,
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
        acadYear: "",

        hei: null,
        hei_address: null,
      },
      hei: null,
      application: null,
      students: [],
      componentKey: 0,
      loading: true,
      admin: false,
      display_msg: false,
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
    const user = Parse.User.current();
    if (user.get("userType") == "admin") {
      this.admin = true;
    }
    this.loading = false;
  },
  methods: {
    displayAlert() {
      this.display_msg = true;
    },
    downloadTransmittal() {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF("p", "in", "letter");
      var img = new Image();
      img.src = image;
      const date = new Date().toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      doc.addImage(img, "png", 1, 1, 0.75, 0.75);
      doc.setFontSize(11);
      doc.setFont("Arial");
      doc.text("Republic of the Philippines", 4.24, 1, "center");
      doc.text("Office of the President", 4.24, 1.2, "center");
      doc.setFont("", "", "bold");
      doc.text("COMMISSION ON HIGHER EDUCATION", 4.24, 1.4, "center");
      doc.setFont("", "", "normal");
      doc.text("Regional Office V", 4.24, 1.6, "center");
      doc.text(date, 7.5, 2.5, "right");
      doc.setFont("", "", "bold");
      doc.text("NSTP Coordinator", 1, 3.5, "left");
      doc.setFont("", "", "normal");
      doc.text(this.data.hei, 1, 3.7, "left");
      doc.text(
        this.data.hei_address.barangay + ", " + this.data.hei_address.city,
        1,
        3.9,
        "left"
      );
      doc.text(this.data.hei_address.province, 1, 4.1, "left");
      var p1 =
        "This has reference to your application dated " +
        this.data.dateApplied +
        ", requesting for issuance of NSTP Serial Number for the following School Year" +
        this.data.acadYear +
        ".";

      doc.text(p1, 1, 5, {
        align: "justify",
        maxWidth: 6.5,
        lineHeightFactor: 1.5,
      });
      const p2 =
        "Per CMO No. 27, s. 2015, herewith is your Serial Number for the following aforementioned School Year, to wit:";
      doc.text(p2, 1, 5.65, {
        align: "justify",
        maxWidth: 6.5,
        lineHeightFactor: 1.5,
      });
      doc.setFont("", "", "bold");
      doc.text(this.data.acadYear, 2, 6.4);
      doc.setFont("", "", "normal");
      doc.text(
        this.data.snRange + " for " + this.data.graduates + " students.",
        2,
        6.8
      );
      doc.text("Thank you.", 1, 7.4);
      doc.text("Very truly yours,", 4.5, 8.5);
      doc.setFont("", "", "bold");
      doc.text("FREDDIE T. BERNAL, PHD., CESO III", 4.5, 9);
      doc.setFont("", "", "normal");
      doc.text("Director IV", 4.5, 9.2);

      window.open(doc.output("bloburl"), "_blank");
    },
    async sendTransmittal() {
      const date = new Date().toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const Application = Parse.Object.extend("Application");
      //get the end of serial number
      const query = new Parse.Query(Application);
      query.include("heiId");

      const results = await query.first();
      const emailParams = {
        type: "Transmittal",
        approved: true,
        hei: {
          name: results.get("heiId").get("name"),
          username: results.get("heiId").get("username"),
          email: results.get("heiId").get("email"),
          address: results.get("heiId").get("address"),
        },
        date: date,
        application: {
          dateApplied: results.get("dateApplied").toLocaleDateString("en", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          schoolYear: results.get("academicYear"),
          snRange: this.data.snRange,
          students: this.data.graduates,
        },
      };
      Parse.Cloud.run("sendEmailNotification", emailParams).then(() => {
        this.display_msg = true;
      });
    },
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
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
        _this.data.dateApproved = results[0]
          .get("applicationId")
          .get("dateApproved")
          .toLocaleDateString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
        _this.data.awardYear = results[0].get("applicationId").get("awardYear");

        _this.data.program = results[0].get("nstpId").get("programName");
        const sn = results[0].get("applicationId").get("serialNumber");
        _this.data.acadYear = results[0]
          .get("applicationId")
          .get("academicYear");
        _this.data.hei = results[0]
          .get("applicationId")
          .get("heiId")
          .get("name");
        _this.data.hei_address = results[0]
          .get("applicationId")
          .get("heiId")
          .get("address");
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
        _this.hei = results[0].get("applicationId").get("heiId");
        _this.application = results[0].get("applicationId");
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