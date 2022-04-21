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
            <td class="border p-2">{{ data.snRange }}</td>
          </tr>

          <tr>
            <td class="border p-2">Students's Serial Number</td>
            <td class="border p-2">Download</td>
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
          @click="$emit('complete', 5)"
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
  props: { isCompleted: Boolean, appId: String, allow: Boolean },

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
          "-" +
          (sn.start + "").padStart(6, "0") +
          "-" +
          (sn.end + "").padStart(6, "0") +
          "-" +
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
  },
};
</script>

<style>
</style>