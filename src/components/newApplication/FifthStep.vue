<template>
  <div>
    <div v-if="!allow" class="w-fit mx-auto">
      <AlertWidget className="alert-warning">
        Please complete the previous steps.
      </AlertWidget>
    </div>
    <div v-else>
      <table :data="data" class="w-full mx-auto lg:w-1/2 my-20 text-left">
        <tbody>
          <tr>
            <td class="border p-2">Application Date</td>
            <td class="border p-2">{{ data.dateApplied }}</td>
          </tr>
          <tr>
            <td class="border p-2">Date Approved</td>
            <td class="border p-2">
              {{ data.dateApproved }}
            </td>
          </tr>
          <tr>
            <td class="border p-2">Number of Graduates</td>
            <td class="border p-2">{{ data.graduates }}</td>
          </tr>
          <tr>
            <td class="border p-2">NSTP Program</td>
            <td class="border p-2">{{ data.program }}</td>
          </tr>
          <tr>
            <td class="border p-2">Award Year</td>
            <td class="border p-2">{{ data.awardYear }}</td>
          </tr>
          <tr>
            <td class="border p-2">Serial Number Range</td>
            <td class="border p-2">
              {{ data.snRange }}
            </td>
          </tr>

          <tr>
            <td class="border p-2">Students's Serial Number</td>
            <td class="border p-2">
              <button
                class="underline font-bold hover:text-brand-blue cursor-pointer"
                @click="downloadSN()"
              >
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>

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

export default {
  components: {
    AlertWidget,
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
    };
  },
  props: {
    isCompleted: Boolean,
    appId: String,
    allow: Boolean,
    hei_username: String,
  },

  mounted() {
    this.getData();
    console.log(this.isCompleted);
  },
  methods: {
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
      const worksheetName = "List of Students";
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
        console.log(_this.data.dateApproved + " " + _this.data.awardYear);

        _this.data.program = results[0].get("nstpId").get("programName");
        const sn = results[0].get("applicationId").get("serialNumber");
        _this.data.snRange =
          _this.data.program.charAt(0) +
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
      this.$emit("complete", 5);
      this.$emit("goToApplication");
    },
  },
};
</script>