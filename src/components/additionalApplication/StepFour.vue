<template>
  <div>
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
          <td class="border p-2">{{ data.awardYear }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center space-x-5">
      <button>Back</button>
      <button>For Revision</button>
      <button>Approve</button>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  data() {
    return {
      data: {
        dateApplied: "",
        status: "",
        graduates: 0,
        female: 0,
        male: 0,
        program: "",
        awardYear: "",
      },
    };
  },
  props: { appId: String },
  mounted() {
    this.getData();
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
      const Students = Parse.Object.extend("Student");
      const innerquery = new Parse.Query(Students);

      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.equalTo("applicationId", application);
      query.include("applicationId");

      await query.find().then(function (results) {
        _this.data.graduates = results.length;
        _this.data.status = results[0].get("applicationId").get("status");
        _this.data.dateApplied = results[0]
          .get("applicationId")
          .get("dateApplied");
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
  },
};
</script>

<style>
</style>