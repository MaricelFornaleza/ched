<template>
  <div v-if="loading" class="text-center">Loading...</div>
  <div v-else>
    <!-- alert message -->
    <div class="w-fit mx-10">
      <AlertWidget :className="alert.className">
        {{ alert.msg }}
      </AlertWidget>
    </div>
    <div>
      <serial-number-data-table
        :applications="applications"
        :table_headers="table_headers"
        @displayAlert="displayAlert"
      >
      </serial-number-data-table>
    </div>
  </div>
</template>

<script>
import SerialNumberDataTable from "@/partials/SerialNumberDataTable.vue";
import Parse from "parse";
import AlertWidget from "@/partials/AlertWidget.vue";

export default {
  components: {
    SerialNumberDataTable,
    AlertWidget,
  },
  data() {
    return {
      table_headers: [
        { title: "HEI Name" },
        { title: "Application Type" },
        { title: "Serial Number Range" },
        { title: "No. of Graduates" },
        { title: "Date Approved" },
      ],
      applications: [],
      loading: true,
      alert: {},
    };
  },
  async mounted() {
    var data = [];

    const Applications = Parse.Object.extend("Application");
    const query = new Parse.Query(Applications);
    query.include("heiId");
    query.descending("dateApplied");
    query.exists("serialNumber");

    const results = await query.find();
    // get nstp enrollment
    const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
    var query2 = new Parse.Query(NstpEnrollment);

    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      var count = 0;
      var prog = "";
      query2.matches("applicationId", object.id);
      query2.include("nstpId");
      await query2.find().then(function (res) {
        // count = res.length;
        for (let x = 0; x < res.length; x++) {
          if (typeof res[x].get("serialNumber") !== "undefined") count++;
        }
      });
      if (object.get("status") == "Approved") {
        await query2.first().then(function (res) {
          prog = res.get("nstpId").get("programName");
        });
      }
      const region = object.get("heiId").get("address").regionNo;
      const start = object.get("serialNumber").start.toString();
      const end = object.get("serialNumber").end.toString();
      const date = new Date(object.get("awardYear"));

      data.push({
        id: object.id,
        hei_name: object.get("heiId").get("name"),
        application_type: object.get("applicationType"),
        snRange:
          prog.charAt(0) +
          "-" +
          region.padStart(2, "0") +
          "-" +
          start.padStart(6, "0") +
          " — " +
          end.padStart(6, "0") +
          "-" +
          date.toLocaleDateString("en", { year: "2-digit" }),

        no_of_graduates: count,

        date_approved: object.get("dateApproved").toLocaleDateString("en", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    }

    this.applications = data;
    this.loading = false;
  },
  methods: {
    displayAlert(status, msg) {
      this.alert.className = "alert-" + status;
      this.alert.msg = msg;
      console.log("success");
    },
  },
};
</script>
