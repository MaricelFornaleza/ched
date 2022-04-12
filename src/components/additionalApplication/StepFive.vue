<template>
  <div>
    <table :data="data" class="w-full mx-auto lg:w-1/2 my-20 text-left">
      <tbody>
        <tr>
          <td class="border p-2">Application Date</td>
          <td class="border p-2">{{ data.dateApplied }}</td>
        </tr>
        <tr>
          <td class="border p-2">Date Approved</td>
          <td class="border p-2">
            <span :class="variant(data.status)">{{ data.status }}</span>
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
          <td class="border p-2">{{ data.female }}</td>
        </tr>
        <tr>
          <td class="border p-2">Serial Number Range</td>
          <td class="border p-2">{{ data.male }}</td>
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
</template>

<script>
import Parse from "parse";

export default {
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
  props: { isCompleted: Boolean, appId: String },

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
        // _this.data.dateApproved = results[0]
        //   .get("applicationId")
        //   .get("dateApproved")
        //   .toLocaleDateString("en", {
        //     weekday: "long",
        //     year: "numeric",
        //     month: "long",
        //     day: "numeric",
        //   });
        // _this.data.awardYear = results[0].get("applicationId").get("awardYear");

        _this.data.program = results[0].get("nstpId").get("programName");
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