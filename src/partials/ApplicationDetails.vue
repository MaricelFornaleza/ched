<template>
  <div class="w-full">
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
          <div class="font-bold">Application Status:</div>
          <div class="">
            <span :class="variant(data.status)">{{ data.status }}</span>
            <div v-if="data.status == 'Rejected'">
              <span class="font-semibold">Reason: </span> {{ data.reason }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col space-y-2 xl:pl-5 mt-0">
        <div class="grid grid-cols-2 text-sm">
          <div class="font-bold">NSTP Program:</div>
          <div class="">{{ data.program }}</div>
        </div>
        <div class="grid grid-cols-2 text-sm">
          <div class="font-bold">Academic Year:</div>
          <div class="">{{ data.acadYear }}</div>
        </div>
      </div>
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
        status: "",

        program: "",
        acadYear: "",
        reason: "",
      },
    };
  },
  props: {
    appId: String,
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

      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      query.equalTo("applicationId", application);
      query.exists("applicationId");
      query.include("applicationId");
      query.include("nstpId");
      console.log(await query.count());
      await query.find().then(function (results) {
        _this.data.status = results[0].get("applicationId").get("status");
        _this.data.reason = results[0].get("applicationId").get("reason");
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
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
        _this.data.program = results[0].get("nstpId").get("programName");
      });
    },
  },
};
</script>
