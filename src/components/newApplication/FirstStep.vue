<template>
  <div>
    <div
      v-if="!isCompleted"
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <AlertWidget :className="className">
        Please Upload the List of Enrollment for First Semester. Follow the
        format provided in the Template.&nbsp;
        <a :href="templateUrl" class="font-bold underline hover:text-brand-blue" download>
          Download Template
        </a>
      </AlertWidget>

      <div v-if="dropzoneFile === ''" class="mt-10 w-full">
        <DropZone @drop.prevent="drop" @change="selectedFile">
          <span class="body-m">
            Must be .xlsx file using this
            <a :href="templateUrl" class="font-bold underline hover:text-brand-blue" download>template</a>.
          </span>
        </DropZone>
        <!-- <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span> -->
      </div>

      <div
        v-else
        class="my-20 w-fit flex justify-between p-5 border border-light-300"
      >
        <div class="flex space-x-5">
          <img
            src="@/assets/img/xls.png"
            class="h-8"
            alt="XLS Icon by Dimitry Miroliubov"
          />
          <div class="text-base">{{ dropzoneFile.name }}</div>
        </div>
      </div>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="goToApplication()"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Cancel
        </button>
        <button
          v-if="!isCompleted"
          @click="upload(1)"
          class="btn-sm btn-default"
          type="submit"
        >
          Upload
        </button>
      </div>
    </div>

    <div
      v-else
      class="container mx-auto flex flex-col items-center justify-center"
    >
      <SuccessAlert className="alert-success">
        The list for the 1st semester was successfully uploaded. An
        Acknowledgement letter was sent to the email address.
      </SuccessAlert>

      <div class="grid grid-cols-3 gap-20 mt-6 mb-4">
        <div class="flex flex-col items-center">
          <h2 class="">{{ female_num }}</h2>
          <p class="uppercase">female</p>
        </div>
        <div class="flex flex-col items-center">
          <h2 class="">{{ male_num }}</h2>
          <p class="uppercase">male</p>
        </div>
        <div class="flex flex-col items-center">
          <h2 class="">{{ male_num + female_num }}</h2>
          <p class="uppercase">total</p>
        </div>
      </div>

      <!-- pass props lists -->
      <StudentsDataTable :key="componentKey"
        :students="students"
      ></StudentsDataTable>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="goToApplication()"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Cancel
        </button>

        <button @click="nextStep()" class="btn-sm btn-default" type="submit">
          Next
        </button>
      </div>
    </div>

    <ModalWidget v-show="pending">
      <template #body>
        <div
          class="
            inline-flex
            items-center
            px-4
            py-4
            font-semibold
            leading-6
            text-sm
            shadow
            rounded-md
            text-light-100
            bg-brand-blue
            hover:bg-brand-blue
            transition
            ease-in-out
            duration-150
            cursor-progress
          "
          disabled
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-light-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      </template>
    </ModalWidget>
  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import AlertWidget from "@/partials/AlertWidget.vue";
import SuccessAlert from "@/partials/SuccessAlert.vue";
// import studentsData from "@/assets/json/students.json";
import StudentsDataTable from "@/partials/StudentsDatatable.vue";
import ModalWidget from "@/partials/ModalWidget.vue";
import { ref } from "vue";
import Worker from "@/assets/js/newParseFile.worker.js";
import Parse from 'parse';

export default {
  // inheritAttrs: false,
  data() {
    return {
      templateUrl: "/files/NTSP-REGIONAL-DATABASE-TEMPLATE_1st_SEM.xlsx",   //may switch to file-loader package to load files
      componentKey: 0,
      pending: false,
      className: "alert-info",
      students: [],
      excelData: [],
      male_num: 0,
      female_num: 0,
      worker: undefined,
    };
  },
  props: { isCompleted: Boolean, appId: String },
  components: {
    AlertWidget,
    SuccessAlert,
    DropZone,
    StudentsDataTable,
    ModalWidget,
  },
  setup() {
    let dropzoneFile = ref("");
    const drop = (e) => {
      dropzoneFile.value = e.dataTransfer.files[0];
    };
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
    };
    return { dropzoneFile, drop, selectedFile };
  },
  created() {
    this.getStudents();
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    validate(filename) {
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
      if (filename === "") {
        this.className = "alert-error";
        return false;
      }
      else if (regex.test(filename.name)) {
        return true;
      }
      else {
        alert("Please upload a .xlsx file!");
        return false;
      }

    },
    createWorker(data, step, self) {
      if (typeof Worker !== "undefined") {
        if (typeof self.worker == "undefined") {
          self.worker = new Worker();
        }
        self.worker.postMessage({ d: data });
        //can be improved by abstraction
        self.worker.onmessage = function (event) {
          // _this.table_headers = event.data.headers;
          // self.students = event.data.rows;
          if (event.data.complete) {
            console.log("Successfully parsed xlsx file!");
            self.male_num = event.data.male;
            self.female_num = event.data.female;
            // self.total = self.male_num + self.female_num;
            self.storeStudents(
              event.data.rows, 
              event.data.acadYear,
              event.data.nstp
            );
            self.pending = false;
            self.$emit("complete", step);
            self.$emit("setStatus", "2 of 5");
            // this.completed = !this.completed;
          }
          else {
            console.log("Something went wrong while parsing xlsx file!");
            self.pending = false;
          }
        };
      }
    },
    async setAcadYear(acadYear) {
      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);
      query.equalTo("objectId", this.appId);
      var results = await query.first();
      results.set("academicYear", acadYear);
      //results.set("awardYear", acadYear);
      results.save();
    },
    async getNstpId(nstp) {
      const Nstp = Parse.Object.extend("Nstp");
      const query = new Parse.Query(Nstp);
      query.equalTo("programName", nstp);
      var result = await query.first();
      return result.id;
    },
    async storeStudents(studentData, acadYear, nstpProgram) {
      await this.setAcadYear(acadYear);
      var nstpId = await this.getNstpId(nstpProgram);

      for (let i = 0; i < studentData.length; i++) {
        const student = new Parse.Object("Student");
        const nstpEnrollment = new Parse.Object("NstpEnrollment");
        student.set("name", {
          lastName: studentData[i].F,
          firstName: studentData[i].G,
          extensionName: studentData[i].H,
          middleName: studentData[i].I,
        });
        student.set("birthdate", studentData[i].J);
        student.set("gender", studentData[i].K);
        student.set("emailAddress", studentData[i].T);
        student.set("contactNumber", studentData[i].U);
        student.set("address", {
          street: studentData[i].L,
          city: studentData[i].M,
          province: studentData[i].N,
          region: studentData[i].D,
        });
        student.set("program", {
          programLevelCode: studentData[i].R,
          programName: studentData[i].S,
        });

        student.save().then((student) => {
          this.students.push({
            name: student.get("name"),
            birthdate: student.get("birthdate"),
            gender: student.get("gender"),
            address: student.get("address"),
          });
          this.forceRerender(); //solution to updating DOM of child component
          nstpEnrollment.set(
            "studentId",
            new Parse.Object("Student", { id: student.id })
          );
          nstpEnrollment.set(
            "nstpId",
            new Parse.Object("Nstp", { id: nstpId })
          );
          nstpEnrollment.set(
            "applicationId",
            new Parse.Object("Application", { id: this.appId })
          );
          nstpEnrollment.set("takenNstp1", true);
          nstpEnrollment.save();
        });
      }
    },
    upload(step) {
      var validation = this.validate(this.dropzoneFile);
      if(validation) {
        // alert(`Submitted Files:\n${this.dropzoneFile.name}`);
        this.pending = true;
        const self = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          try{
            self.createWorker(data, step, self);
          } catch(e) {
            console.log(e);
            this.pending = false;
          }
        };
        reader.readAsArrayBuffer(this.dropzoneFile);
      }
    },
    async getStudents() {
      var studentList = [];
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      // query.equalTo("applicationId", this.appId);
      query.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      query.include("studentId");
      const results = await query.find();
      
      if(results.length == 0) return;
      for (let i = 0; i < results.length; i++) {
        const object = results[i];

        studentList.push({
          name: object.get("studentId").get("name"),
          birthdate: object.get("studentId").get("birthdate"),
          gender: object.get("studentId").get("gender"),
          address: object.get("studentId").get("address"),
        });
        if (object.get("studentId").get("gender") == "F") {
          this.female_num++;
        } else if (object.get("studentId").get("gender") == "M") {
          this.male_num++;
        }
      }
      this.students = studentList;
      this.forceRerender(); 
    },
    nextStep() {
      this.worker.terminate();
      this.worker = undefined;

      this.$emit("nextStep");
    },
    goToApplication() {
      this.$emit("goToApplication");
    },
  },
};
</script>