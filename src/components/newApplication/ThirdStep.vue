<template>
  <div>
    <div v-if="!allow" class="w-fit mx-auto">
      <AlertWidget className="alert-warning">
        Please complete the previous steps.
      </AlertWidget>
    </div>
    <div v-else>
      <div
        v-if="!isCompleted"
        class="
          container
          w-fit
          mx-auto
          flex flex-col
          items-center
          justify-center
        "
      >
        <AlertWidget :className="className">
          Please Upload the List of Graduates. Follow the format provided in the
          Template.&nbsp;
          <a
            :href="templateUrl"
            class="font-bold underline hover:text-brand-blue"
            download
          >
            Download Template
          </a>
        </AlertWidget>

        <div v-if="dropzoneFile === ''" class="mt-10 w-full">
          <DropZone
            @drop.prevent="drop"
            @change="selectedFile"
            fileType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <span class="body-m">
              Must be .xlsx file using this
              <a
                :href="templateUrl"
                class="font-bold underline hover:text-brand-blue"
                download
                >template</a
              >.
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
            @click="upload(3)"
            class="btn-sm btn-default"
            type="submit"
          >
            Upload
          </button>
        </div>
      </div>

      <div v-else>
        <div
          v-if="finishedStudents()"
          class="container mx-auto flex flex-col items-center justify-center"
        >
          <SuccessAlert className="alert-success">
            The list for the 2nd semester was successfully uploaded. An
            Acknowledgement letter was sent to the email address.
          </SuccessAlert>

          <div class="grid grid-cols-3 gap-20 mt-6 mb-4">
            <div class="flex flex-col items-center">
              <h2 class="">{{ femaleNum }}</h2>
              <p class="uppercase">female</p>
            </div>
            <div class="flex flex-col items-center">
              <h2 class="">{{ maleNum }}</h2>
              <p class="uppercase">male</p>
            </div>
            <div class="flex flex-col items-center">
              <h2 class="">{{ maleNum + femaleNum }}</h2>
              <p class="uppercase">total</p>
            </div>
          </div>

          <!-- pass props lists -->
          <StudentsDataTable
            :key="componentKey"
            :students="students"
            fileName="List-of-Students-Graduates"
          ></StudentsDataTable>
        </div>

        <div
          v-if="errorStudents()"
          class="container mx-auto flex flex-col items-center justify-center"
        >
          <AlertWidget className="alert-warning">
            The following students' record for the 1st Semester were not found.
            Please ensure the students have taken the same NSTP 1 program.
          </AlertWidget>

          <div class="grid grid-cols-3 gap-20 mt-6 mb-4">
            <div class="flex flex-col items-center">
              <h2 class="">{{ femaleNumError }}</h2>
              <p class="uppercase">female</p>
            </div>
            <div class="flex flex-col items-center">
              <h2 class="">{{ maleNumError }}</h2>
              <p class="uppercase">male</p>
            </div>
            <div class="flex flex-col items-center">
              <h2 class="">{{ maleNumError + femaleNumError }}</h2>
              <p class="uppercase">total</p>
            </div>
          </div>

          <StudentsDataTable
            newId="datatable2"
            :key="componentKey"
            :students="studentsMissing"
            fileName="List-of-Students-Missing"
          ></StudentsDataTable>
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
            v-if="finishedStudents()"
            @click="nextStep()"
            class="btn-sm btn-default"
            type="submit"
          >
            Next
          </button>
        </div>
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
import Parse from "parse";

export default {
  // inheritAttrs: false,
  data() {
    return {
      templateUrl: "/files/NTSP-REGIONAL-DATABASE-TEMPLATE_GRADUATES.xlsx", //may switch to file-loader package to load files
      componentKey: 0,
      pending: false,
      className: "alert-info",
      students: [],
      studentsMissing: [],
      excelData: [],
      maleNum: 0,
      femaleNum: 0,
      maleNumError: 0,
      femaleNumError: 0,
      worker: undefined,
    };
  },
  props: { isCompleted: Boolean, appId: String, allow: Boolean },
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
    console.log(this.allow);
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    finishedStudents() {
      if (this.maleNum > 0 || this.femaleNum > 0) return true;
      else return false;
    },
    errorStudents() {
      if (this.maleNumError > 0 || this.femaleNumError > 0) return true;
      else return false;
    },
    validate(filename) {
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
      if (filename === "") {
        this.className = "alert-error";
        return false;
      } else if (regex.test(filename.name)) {
        return true;
      } else {
        alert("Please upload an .xlsx file!");
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
            // self.maleNum = event.data.male;
            // self.femaleNum = event.data.female;
            // self.total = self.maleNum + self.femaleNum;
            self.verifyStudents(event.data.rows, event.data.nstp);
            self.pending = false;
            self.$emit("complete", step);
            self.$emit("setStatus", "For Approval");
            // this.completed = !this.completed;
          } else {
            // console.log("Something went wrong while parsing xlsx file!");
            self.pending = false;
            alert(event.data.reason);
          }
        };
      }
    },
    upload(step) {
      var validation = this.validate(this.dropzoneFile);
      if (validation) {
        // alert(`Submitted Files:\n${this.dropzoneFile.name}`);
        this.pending = true;
        const self = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          try {
            self.createWorker(data, step, self);
          } catch (e) {
            console.log(e);
            this.pending = false;
          }
        };
        reader.readAsArrayBuffer(this.dropzoneFile);
      }
    },
    async getHeiId() {
      const Application = Parse.Object.extend("Application");
      const query = new Parse.Query(Application);
      query.equalTo("objectId", this.appId);
      var results = await query.first();
      return results.get("heiId");
    },
    async getNstpId(nstp) {
      const Nstp = Parse.Object.extend("Nstp");
      const query = new Parse.Query(Nstp);
      query.equalTo("programName", nstp);
      var result = await query.first();
      return result.id;
    },
    async verifyStudents(studentData, nstpProgram) {
      //check first if student exists
      //get nstpEnrollment using the studentId, then check nstpId to get the nstpProgram
      //check if student's 1st sem nstpProgram is the same with 2nd Sem and takenNstp1 & 2 is true
      //if not, store in separate lists
      const studentSet = new Set(studentData);
      console.log(studentSet);
      const nstpEnrollment = new Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(nstpEnrollment);
      // query.equalTo(
      //   "applicationId",
      //   new Parse.Object("Application", { id: this.appId })
      // );
      query.include("studentId");
      query.include("nstpId");
      const results = await query.find();

      for (let i = 0; i < results.length; i++) {
        var name = results[i].get("studentId").get("name");
        var bday = results[i].get("studentId").get("birthdate");
        var program = results[i].get("nstpId").get("programName");
        var takenNstp1 = results[i].get("takenNstp1");
        var takenNstp2 = results[i].get("takenNstp2");
        var serialNum = results[i].get("serialNumber");

        for (let x = 0; x < studentData.length; x++) {
          //check student's name and bday
          //PROBLEM: THIS LOOPS OVER ALL THE STUDENTS AND COMPARES ALL OF THEM
          if (
            name.lastName == studentData[x].F &&
            name.firstName == studentData[x].G &&
            name.extensionName == studentData[x].H &&
            name.middleName == studentData[x].I &&
            bday == studentData[x].J
          ) {
            //check program
            if(program == nstpProgram && takenNstp1 == true && takenNstp2 == true && serialNum == null) {
              studentSet.delete(studentData[x]);
              results[i].set("isGraduated", true);
              await results[i].save();
            } else {
              //found the student but there are mismatch in stored info
              //delete from set since it'll still be shown because of nstpTaken
              studentSet.delete(studentData[x]);
            }
            break;
          }
        }
      }
      const self = this;
      const students = studentSet.values();
      for (const student of students) {
        await self.storeStudents(student, nstpProgram);
        console.log(student);
      }
      // studentSet.forEach (function(student) {
      //   self.storeStudents(student, null , nstpProgram);
      // });
      await this.getStudents();
    },
    async storeStudents(studentData, nstpProgram) {
      const nstpEnrollment = new Parse.Object("NstpEnrollment");
      const nstpId = await this.getNstpId(nstpProgram);
      const heiId = await this.getHeiId();

      const student = new Parse.Object("Student");
      student.set("name", {
        lastName: studentData.F,
        firstName: studentData.G,
        extensionName: studentData.H,
        middleName: studentData.I,
      });
      student.set("birthdate", studentData.J);
      student.set("gender", studentData.K);
      student.set("emailAddress", studentData.T);
      student.set("contactNumber", studentData.U);
      student.set("address", {
        street: studentData.L,
        city: studentData.M,
        province: studentData.N,
        region: studentData.D,
      });
      student.set("program", {
        programLevelCode: studentData.R,
        programName: studentData.S,
      });
      student.set("heiId", heiId);

      await student.save().then((student) => {
        // this.forceRerender(); //solution to updating DOM of child component
        nstpEnrollment.set(
          "studentId",
          new Parse.Object("Student", { id: student.id })
        );
        nstpEnrollment.set("nstpId", new Parse.Object("Nstp", { id: nstpId }));
        nstpEnrollment.set(
          "applicationId",
          new Parse.Object("Application", { id: this.appId })
        );
        // nstpEnrollment.set("takenNstp1", false);   //defaults to false when the seeder is used
        // nstpEnrollment.set("takenNstp2", false);
        nstpEnrollment.save();
      });
    },
    async getStudents() {
      var studentList = [],
        studentErrorList = [];
      //reset the numbers to be sure
      this.femaleNum = 0;
      this.maleNum = 0;
      this.femaleNumError = 0;
      this.maleNumError = 0;

      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(NstpEnrollment);
      // query.equalTo("applicationId", this.appId);
      query.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      query.include("studentId");
      const results = await query.find();

      if (results.length == 0) return;
      for (let i = 0; i < results.length; i++) {
        const object = results[i];

        if(object.get("takenNstp1") == true && object.get("takenNstp2") == true && object.get("isGraduated") == true ) {
           studentList.push({
            name: object.get("studentId").get("name"),
            birthdate: object.get("studentId").get("birthdate"),
            gender: object.get("studentId").get("gender"),
            address: object.get("studentId").get("address"),
          });
          if (
            object.get("studentId").get("gender").toUpperCase() == "F" ||
            object.get("studentId").get("gender").toUpperCase() == "FEMALE"
          ) {
            this.femaleNum++;
          } else if (
            object.get("studentId").get("gender").toUpperCase() == "M" ||
            object.get("studentId").get("gender").toUpperCase() == "MALE"
          ) {
            this.maleNum++;
          }
        } else if (
          object.get("takenNstp1") == false ||
          object.get("takenNstp2") == false
        ) {
          console.log(object.get("studentId").get("name"));
          studentErrorList.push({
            name: object.get("studentId").get("name"),
            birthdate: object.get("studentId").get("birthdate"),
            gender: object.get("studentId").get("gender"),
            address: object.get("studentId").get("address"),
          });
          if (
            object.get("studentId").get("gender").toUpperCase() == "F" ||
            object.get("studentId").get("gender").toUpperCase() == "FEMALE"
          ) {
            this.femaleNumError++;
          } else if (
            object.get("studentId").get("gender").toUpperCase() == "M" ||
            object.get("studentId").get("gender").toUpperCase() == "MALE"
          ) {
            this.maleNumError++;
          }
        }
      }
      this.students = studentList;
      this.studentsMissing = studentErrorList;
      console.log(this.students);
      console.log(this.studentsMissing);
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