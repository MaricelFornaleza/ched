<template>
  <div>
    <div
      v-if="!isCompleted"
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <AlertWidget className="alert-info">
        Please Upload the List of Graduates. Follow the format provided in the
        Template.&nbsp;
        <router-link to="/#" class="font-bold underline">
          Download Template
        </router-link>
      </AlertWidget>

      <div v-if="dropzoneFile === ''" class="mt-10 w-full">
        <DropZone @drop.prevent="drop" @change="selectedFile" />
        <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span>
      </div>
      <div
        v-else
        class="my-20 w-full flex justify-between p-5 border border-light-300"
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
          @click="$emit('previousStep')"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Cancel
        </button>
        <button
          v-if="!isCompleted"
          @click="upload(3)"
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
        The list of graduates was successfully uploaded. A transmittal letter
        was sent to Ateneo de Naga University’s email address.
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
          <h2 class="">{{ total }}</h2>
          <p class="uppercase">total</p>
        </div>
      </div>
      <button
        v-if="students == ''"
        @click="getStudents()"
        class="px-5 py-2 bg-success text-light-100 rounded mx-10"
      >
        Click to View List of Students
      </button>

      <StudentsDataTable v-else :students="students"></StudentsDataTable>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="$emit('previousStep')"
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
    <ModalWidget v-show="visible">
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
import SuccessAlert from "@/partials/SuccessAlert.vue";
import AlertWidget from "@/partials/AlertWidget.vue";
// import * as XLSX from "xlsx";
// import studentsData from "@/assets/json/students.json";
import StudentsDataTable from "@/partials/StudentsDatatable.vue";
import ModalWidget from "@/partials/ModalWidget.vue";

import { ref } from "vue";
import Worker from "@/assets/js/parseFile.worker.js";
import Parse from "parse";

export default {
  data() {
    return {
      visible: false,
      completed: false,
      className: "alert-info",
      table_headers: { A: "NO.", B: "NAME" },
      students: [],
      male_num: 0,
      total: 0,

      female_num: 0,
      excelData: [],
      worker: undefined,
      checkedData: true,
      acadYear: "",
      nstp: "",
      nstpId: "",
    };
  },
  props: { isCompleted: Boolean, appId: String },

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
    upload(step) {
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

      if (this.dropzoneFile === "") {
        this.className = "alert-error";
      } else if (regex.test(this.dropzoneFile.name)) {
        // alert(`Submitted Files:\n${this.dropzoneFile.name}`);
        this.visible = true;
        let _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;

          if (typeof Worker !== "undefined") {
            if (typeof _this.worker == "undefined") {
              _this.worker = new Worker();
            }
            _this.worker.postMessage({
              d: data,
              id: _this.appId,
            });

            //can be improved by abstraction
            _this.worker.onmessage = function (event) {
              _this.table_headers = event.data.headers;
              var students = event.data.rows;
              _this.male_num = event.data.male;
              _this.female_num = event.data.female;
              _this.total = _this.male_num + _this.female_num;

              if (_this.checkData(students)) {
                _this.setAcadYear(_this.acadYear);
                _this.getNstpId(_this.nstp);

                _this.storeStudents(students);
              } else {
                console.log("error");
              }

              if (event.data.complete) {
                _this.visible = false;

                _this.$emit("complete", step);
                _this.$emit("setStatus", "For Approval");
                _this.completed = !_this.completed;
              }
            };
          }
        };

        reader.readAsArrayBuffer(this.dropzoneFile);
      } else {
        alert("Please upload a .xlsx file!");
      }
    },
    storeStudents(data) {
      for (let i = 0; i < data.length; i++) {
        const student = new Parse.Object("Student");
        const nstpEnrollment = new Parse.Object("NstpEnrollment");
        student.set("name", {
          lastName: data[i].F,
          firstName: data[i].G,
          extensionName: data[i].H,
          middleName: data[i].I,
        });
        student.set("birthdate", data[i].J);
        student.set("gender", data[i].K);
        student.set("emailAddress", data[i].T);
        student.set("contactNumber", data[i].U);
        student.set("address", {
          street: data[i].L,
          city: data[i].M,
          province: data[i].N,
          region: data[i].D,
        });
        student.set("program", {
          programLevelCode: data[i].R,
          programName: data[i].S,
        });

        student.save().then((student) => {
          nstpEnrollment.set(
            "studentId",
            new Parse.Object("Student", { id: student.id })
          );
          nstpEnrollment.set(
            "nstpId",
            new Parse.Object("Nstp", { id: this.nstpId })
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
    checkData(data) {
      for (let i = 0; i < data.length; i++) {
        this.acadYear = data[0].B;
        this.nstp = data[0].C;

        if (data[i].C != this.nstp || data[i].B != this.acadYear) {
          this.checkedData = false;
        }
      }
      return this.checkedData;
    },
    async setAcadYear(acadYear) {
      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);
      query.equalTo("objectId", this.appId);
      var results = await query.first();
      results.set("academicYear", acadYear);
      results.save();
    },
    async getNstpId(nstp) {
      const Nstp = Parse.Object.extend("Nstp");
      const query = new Parse.Query(Nstp);
      query.equalTo("programName", nstp);
      var result = await query.first();
      this.nstpId = result.id;
    },

    async getStudents() {
      var studentList = [];
      this.female_num = 0;
      this.male_num = 0;
      this.total = 0;
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      // query.equalTo("applicationId", this.appId);
      query.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      query.include("studentId");
      const results = await query.find();

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
      this.total = this.female_num + this.male_num;
      this.students = studentList;

      console.log(results);
      console.log(this.students);
    },

    nextStep() {
      this.worker.terminate();
      this.worker = undefined;

      this.$emit("nextStep");
    },
  },
  components: {
    SuccessAlert,
    AlertWidget,
    DropZone,
    StudentsDataTable,
    ModalWidget,
  },
};
</script>

<style>
</style>