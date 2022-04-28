<template>
  <div>
    <div v-if="!allow" class="w-fit mx-auto">
      <AlertWidget className="alert-warning">
        Please complete the previous steps.
      </AlertWidget>
    </div>
    <div v-if="allow">
      <table :data="data" class="w-full mx-auto lg:w-1/2 my-20 text-left">
        <tbody>
          <tr>
            <td class="border p-2">Application Date</td>
            <td class="border p-2">{{ data.dateApplied }}</td>
          </tr>
          <tr>
            <td class="border p-2">Application Status</td>
            <td class="border p-2">
              <span :class="variant(data.status)">{{ data.status }}</span>
            </td>
          </tr>
          <tr>
            <td class="border p-2">Number of Graduates</td>
            <td class="border p-2">{{ data.graduates }}</td>
          </tr>
          <tr>
            <td class="border p-2">Number of Female</td>
            <td class="border p-2">{{ data.female }}</td>
          </tr>
          <tr>
            <td class="border p-2">Number of Male</td>
            <td class="border p-2">{{ data.male }}</td>
          </tr>
          <tr>
            <td class="border p-2">NSTP Program</td>
            <td class="border p-2">{{ data.program }}</td>
          </tr>
          <tr>
            <td class="border p-2">Academic Year</td>
            <td class="border p-2">{{ data.acadYear }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="!isCompleted" class="flex justify-center space-x-5">
        <button
          @click="$emit('previousStep')"
          class="btn-sm btn-default btn-outline"
        >
          Back
        </button>
        <button
          @click="setStatus('Rejected')"
          class="btn-sm text-light-100 bg-error"
        >
          Reject
        </button>
        <button @click="approve()" class="btn-sm text-light-100 bg-success">
          Approve
        </button>
      </div>
      <div v-else class="flex justify-center space-x-5">
        <button
          @click="$emit('previousStep')"
          class="btn-sm btn-default btn-outline"
        >
          Back
        </button>

        <button
          @click="$emit('nextStep')"
          class="btn-sm text-light-100 bg-brand-blue"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import AlertWidget from "@/partials/AlertWidget.vue";

export default {
  components: {
    AlertWidget,
  },
  data() {
    return {
      completed: false,
      data: {
        dateApplied: "",
        status: "",
        graduates: 0,
        female: 0,
        male: 0,
        program: "",
        acadYear: "",
      },
    };
  },
  props: {
    isCompleted: Boolean,
    appId: String,
    hei_region_code: String,
    allow: Boolean,
  },

  mounted() {
    this.getData();
  },
  methods: {
    variant(stats) {
      if (stats == "Approved") {
        return "badge-success";
      } else if (stats == "For Approval") {
        return "badge-warning";
      } else if (stats == "Rejected") {
        return "badge-error";
      } else {
        //Ongoing
        return "badge";
      }
    },
    async getData() {
      let _this = this;
      const Application = Parse.Object.extend("Application");
      const application = new Application();
      application.id = this.appId;
      const Students = Parse.Object.extend("Student");
      const innerquery = new Parse.Query(Students);

      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.equalTo("applicationId", application);
      query.include("applicationId");
      query.include("nstpId");

      await query.find().then(function (results) {
        _this.data.graduates = results.length;
        _this.data.status = results[0].get("applicationId").get("status");
        _this.data.acadYear = results[0]
          .get("applicationId")
          .get("academicYear");
        _this.data.dateApplied = results[0]
          .get("applicationId")
          .get("dateApplied")
          .toLocaleDateString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        _this.data.program = results[0].get("nstpId").get("programName");
      });

      const f = innerquery.equalTo("gender", "F");
      query.matchesQuery("studentId", f);
      await query.find().then(function (results) {
        _this.data.female = results.length;
      });
      const m = innerquery.equalTo("gender", "M");
      query.matchesQuery("studentId", m);
      await query.find().then(function (results) {
        _this.data.male = results.length;
      });
    },
    setStatus(status) {
      this.$emit("setStatus", status);

      this.getData();
    },
    async approve() {
      let _this = this;
      const date = new Date();
      const fullyear = new Date().getFullYear();
      const year = new Date().toLocaleDateString("en", { year: "2-digit" });
      const program = this.data.program.charAt(0);

      const Application = Parse.Object.extend("Application");
      //get the end of serial number
      const query = new Parse.Query(Application);
      const results = await query.first();
      //get serialNumber, if undefined; set startSerialNum to 1
      //if not, set startSerialNum to the last saved endSerialNumber + 1
      var newStart = 0;
      var newEnd = 0;

      if (results.get("serialNumber") == null) {
        newStart = 1;
        newEnd = this.data.graduates;
      } else {
        query.descending("serialNumber");
        const serialNumber = await query.first();
        const endSerialNumber = serialNumber.get("serialNumber").end;
        newStart = endSerialNumber + 1;
        newEnd = endSerialNumber + this.data.graduates;
      }
      console.log(newStart);
      console.log(newEnd);

      query.equalTo("objectId", this.appId);
      await query.first().then(function (result) {
        result.set("dateApproved", date);
        result.set("awardYear", fullyear.toString());
        result.set("serialNumber", { start: newStart, end: newEnd });
        result.save();
      });
      
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const enrollment = new Parse.Query(NstpEnrollment);
      enrollment.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      await enrollment.find().then(function (results) {
        var start = newStart;
        // save serial number for each student
        for (let i = 0; i < results.length; i++) {
          var sn =
            program +
            "-" +
            _this.hei_region_code.padStart(2, "0") +
            "-" +
            (start + "").padStart(6, "0") +
            "-" +
            year;
          results[i].set("serialNumber", sn);
          results[i].set("nstpTaken1", true);
          results[i].set("nstpTaken2", true);
          results[i].set("isGraduated", true);
          results[i].save();
          start++;
        }
      });
      this.$emit("setStatus", "Approved");
      this.$emit("complete", 4);
      this.$emit("nextStep");
    },
  },
};
</script>

<style>
</style>