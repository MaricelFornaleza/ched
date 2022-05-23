<template>
  <div>
    <div class="p-10">
      <div class="pb-5">
        <div class="uppercase">{{ hei }}</div>
        <div class="flex space-x-2 text-sm">
          <span>{{ year }}</span>
          <span v-if="sem != '0'"> | {{ sem }}</span>
        </div>
      </div>
      <view-students-datatable
        :students="students"
        :key="componentKey"
      ></view-students-datatable>
    </div>
  </div>
</template>
<script>
import ViewStudentsDatatable from "@/partials/ViewStudentsDatatable.vue";

import Parse from "parse";
export default {
  components: {
    ViewStudentsDatatable,
  },
  data() {
    return {
      students: [],
      sem: null,
      year: null,
      hei: null,
      id: null,
      componentKey: 0,
    };
  },
  async created() {
    this.sem = this.$route.params.sem;
    this.year = this.$route.params.year;
    this.id = this.$route.params.id;
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", this.id);
    const result = await query.first({ useMasterKey: true });
    this.hei = result.get("name");
    this.getData();
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    async getData() {
      var data = [];
      const Applications = Parse.Object.extend("Application");
      const applications = new Parse.Query(Applications);
      applications.equalTo("heiId", new Parse.Object("_User", { id: this.id }));
      applications.equalTo("academicYear", this.year);
      applications.notEqualTo("status", "Rejected");

      const Students = Parse.Object.extend("NstpEnrollment");
      const students = new Parse.Query(Students);
      students.matchesKeyInQuery("applicationId", "objectId", applications);

      students.include("studentId");
      students.include("applicationId");
      students.include("nstpId");
      if (this.sem == "1st Sem") {
        students.equalTo("takenNstp1", true);
      } else if (this.sem == "2nd Sem") {
        students.equalTo("takenNstp2", true);
      } else if (this.sem == "0") {
        students.equalTo("takenNstp1", true);
        students.equalTo("takenNstp2", true);
      }
      var results = await students.find();
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
      console.log(data);
    },
  },
};
</script>