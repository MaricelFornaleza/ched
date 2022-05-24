<template>
  <div>
    <div v-if="!allow" class="w-fit mx-auto">
      <AlertWidget className="alert-warning">
        Please complete the previous steps.
      </AlertWidget>
    </div>
    <div v-else>
      <div
        v-if="status != 'For Approval' && status != 'Rejected' && !isCompleted"
        class="
          container
          w-full
          xl:w-6/12
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
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center space-x-5">
              <img
                src="@/assets/img/xls.png"
                class="h-8"
                alt="PDF Icon by Dimitry Miroliubov"
              />
              <div class="text-base">{{ dropzoneFile.name }}</div>
            </div>

            <XCircleIcon
              @click="removeFile()"
              class="ml-5 h-5 text-error cursor-pointer"
              title="Remove File"
            />
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
            @click="upload()"
            class="btn-sm btn-default"
            type="submit"
          >
            Upload
          </button>
        </div>
      </div>
      <div v-else-if="status == 'Rejected'">
        <ApplicationDetails :appId="appId" />

        <div class="flex items-center justify-center space-x-5 mt-5">
          <button
            @click="goToApplication()"
            class="btn-sm btn-default btn-outline"
            type="button"
          >
            Back
          </button>
        </div>
      </div>

      <div v-if="status == 'For Approval' || status == 'Approved'">
        <div
          v-if="finishedStudents()"
          class="container mx-auto flex flex-col items-center justify-center"
        >
          <SuccessAlert className="alert-success">
            The list for the 2nd semester was successfully uploaded. An
            Acknowledgement letter was sent to the email address.
          </SuccessAlert>
          <ApplicationDetails :appId="appId" />

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
            :status="status"
            fileName="List-of-Students-Graduates"
            @getStudents="getStudents"
          ></StudentsDataTable>
        </div>

        <div
          v-if="errorStudents()"
          class="container mx-auto flex flex-col items-center justify-center"
        >
          <AlertWidget className="alert-warning">
            Please review the following students who have missing records or
            have conflicts with other applications.
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
            :showError="true"
            fileName="List-of-Students-Missing"
          ></StudentsDataTable>
        </div>

        <div
          v-if="isAdmin && !isCompleted && status == 'For Approval'"
          class="space-x-5"
        >
          <button class="btn-sm btn-default btn-outline">Back</button>
          <button
            @click="toggleRejectModal()"
            class="btn-sm btn-default bg-error text-light-100 border-0"
          >
            Reject
          </button>
          <button
            @click="toggleConfirmModal()"
            class="btn-sm btn-default bg-success text-light-100 border-0"
          >
            Approve
          </button>
        </div>
        <div v-else class="flex items-center justify-center space-x-5 mt-5">
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
    <ApplicationModal
      v-if="confirm"
      @toggleConfirmModal="toggleConfirmModal"
      @confirmed="confirmed"
    />
    <RejectModal
      v-if="reject"
      @rejectApplication="rejectApplication"
      @toggleRejectModal="toggleRejectModal"
    />
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
import ApplicationModal from "@/partials/ApplicationModal.vue";
import RejectModal from "@/partials/RejectModal.vue";
import ApplicationDetails from "@/partials/ApplicationDetails.vue";
import { XCircleIcon } from "@heroicons/vue/outline";
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
      confirm: false,
      reject: false,
      status: "",
      isAdmin: false,
      data: {
        program: null,
        graduates: null,
      },
    };
  },
  props: {
    isCompleted: Boolean,
    appId: String,
    allow: Boolean,
    hei_region_code: String,
  },
  components: {
    AlertWidget,
    SuccessAlert,
    DropZone,
    StudentsDataTable,
    ModalWidget,
    XCircleIcon,
    ApplicationDetails,
    ApplicationModal,
    RejectModal,
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
  async created() {
    const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
    const query2 = new Parse.Query(NstpEnrollment);
    // query.equalTo("applicationId", this.appId);
    query2.equalTo(
      "applicationId",
      new Parse.Object("Application", { id: this.appId })
    );
    const nstpsubscription = await query2.subscribe();
    nstpsubscription.on("open", async () => {
      this.getStudents();
    });
    nstpsubscription.on("delete", async () => {
      this.getStudents();
    });
    // if(this.isCompleted)
    const Application = Parse.Object.extend("Application");
    const query = new Parse.Query(Application);
    query.equalTo("objectId", this.appId);
    const self = this;
    await query.first().then(function (results) {
      // each of results will only have the selected fields available.
      self.status = results.get("status");
      if (
        results.get("status") == "For Approval" ||
        results.get("status") == "Approved"
      )
        self.getStudents();
    });
    const user = Parse.User.current();
    if (user.get("userType") == "admin") {
      this.isAdmin = true;
    }
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
    createWorker(data, self) {
      if (typeof Worker !== "undefined") {
        if (typeof self.worker == "undefined") {
          self.worker = new Worker();
        }
        self.worker.postMessage({ d: data, sheet: 2 });
        //can be improved by abstraction
        self.worker.onmessage = function (event) {
          // _this.table_headers = event.data.headers;
          // self.students = event.data.rows;
          if (event.data.complete) {
            console.log("Successfully parsed xlsx file!");
            // self.maleNum = event.data.male;
            // self.femaleNum = event.data.female;
            // self.total = self.maleNum + self.femaleNum;
            self.verifyStudents(event.data.rows, event.data.nstp).then(() => {
              self.removeFile();
              self.pending = false;
              self.$emit("setStatus", "For Approval");
              self.status = "For Approval";
              self.$emit("sendEmail", "List of Graduates", "Step 3 of 4");
            });
          } else {
            // console.log("Something went wrong while parsing xlsx file!");
            self.pending = false;
            alert(event.data.reason);
          }
        };
      }
    },
    upload() {
      var validation = this.validate(this.dropzoneFile);
      if (validation) {
        // alert(`Submitted Files:\n${this.dropzoneFile.name}`);
        this.pending = true;
        const self = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          try {
            self.createWorker(data, self);
          } catch (e) {
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
    verificationLevel(nstp, studentProg) {
      var reason = "";
      if (studentProg.program == "") {
        reason = "The student has not yet been enrolled in any nstp program.";
      } else if (studentProg.program != studentProg.nstpProgram) {
        reason =
          "The student already exists in the database but was enrolled with a different nstp program.";
      } else if (studentProg.program != studentProg.currentProgram) {
        reason =
          "The student has a different nstp program from this application.";
      } else if (nstp.isGraduated && nstp.serialNum) {
        reason =
          "The student has already graduated from the nstp program and already has a serial number.";
      } else if (nstp.isGraduated) {
        reason =
          "The student has graduated from the same nstp program but with no serial number yet.";
      } else if (!nstp.takenNstp1 && !nstp.takenNstp2) {
        reason = "The student has not yet taken nstp1 and nstp2.";
      } else if (!nstp.takenNstp2) {
        reason = "The student has not yet taken nstp2.";
      } else if (!nstp.takenNstp1) {
        reason = "The student has not yet taken nstp1.";
      }
      return reason;
    },
    async verifyStudents(studentData, nstpProgram) {
      //check first if student exists
      //get nstpEnrollment using the studentId, then check nstpId to get the nstpProgram
      //check if student's 1st sem nstpProgram is the same and takenNstp1 & 2 is true
      //if not, store in separate lists
      const studentSet = new Set(studentData);
      const nstpEnrollment = new Parse.Object.extend("NstpEnrollment");
      const query = new Parse.Query(nstpEnrollment);
      query.include("studentId");
      query.include("nstpId");
      const results = await query.find();
      // find the current application's nstp program
      query.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      const res = await query.first();
      const currentProgram = res.get("nstpId").get("programName");
      for (let i = 0; i < results.length; i++) {
        var name = results[i].get("studentId").get("name");
        var bday = results[i].get("studentId").get("birthdate");
        var program = "";
        if (typeof results[i].get("nstpId") !== "undefined") {
          program = results[i].get("nstpId").get("programName");
        }
        var takenNstp1 = results[i].get("takenNstp1");
        var takenNstp2 = results[i].get("takenNstp2");
        var isGraduated = results[i].get("isGraduated");
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
            var reason = "";
            var nstp = {
              takenNstp1: takenNstp1,
              takenNstp2: takenNstp2,
              isGraduated: isGraduated,
              serialNum: serialNum,
            };
            var studentProg = {
              program: program,
              nstpProgram: nstpProgram,
              currentProgram: currentProgram,
            };
            //check program
            if (
              program == nstpProgram &&
              program == currentProgram &&
              serialNum == null
            ) {
              reason = this.verificationLevel(nstp, studentProg);
              if (reason == "") {
                // student has taken the same nstp but has not finished yet
                results[i].set(
                  "applicationId",
                  new Parse.Object("Application", { id: this.appId })
                );
                results[i].set("isGraduated", true);
                await results[i].save();
              } else {
                // student already exists and has taken nstp
                const StudentConflict = Parse.Object.extend("StudentConflict");
                const conflict = new StudentConflict();
                conflict.set("studentId", results[i].get("studentId"));
                conflict.set(
                  "applicationId",
                  new Parse.Object("Application", { id: this.appId })
                );
                conflict.set("reason", reason);
                conflict.set("status", "3 of 4");
                await conflict.save();
              }
            } else {
              // found the student but there are mismatch in stored info
              reason = this.verificationLevel(nstp, studentProg);
              if (reason == "")
                reason =
                  "The student has already graduated from the nstp program and already has a serial number.";
              const StudentConflict = Parse.Object.extend("StudentConflict");
              const conflict = new StudentConflict();
              conflict.set("studentId", results[i].get("studentId"));
              conflict.set(
                "applicationId",
                new Parse.Object("Application", { id: this.appId })
              );
              conflict.set("reason", reason);
              conflict.set("status", "3 of 4");
              await conflict.save();
            }
            studentSet.delete(studentData[x]);
            break;
          }
        }
      }
      const self = this;
      const students = studentSet.values();
      for (const student of students) {
        await self.storeStudents(student);
        console.log(student);
      }
      // studentSet.forEach (function(student) {
      //   self.storeStudents(student, null , nstpProgram);
      // });
      if (Parse.User.current().get("userType") == "hei") {
        const params = {
          senderId: Parse.User.current().id,
          action: "uploaded a ",
          output: "List of Graduates",
          routeName: "3rdStep",
          applicationId: this.appId,
        };
        this.$emit("sendNotification", params);
      }
      await this.getStudents();
    },
    async storeStudents(studentData) {
      const nstpEnrollment = new Parse.Object("NstpEnrollment");
      // const nstpId = await this.getNstpId(nstpProgram);
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
      student.set("emailAddress", studentData.T.toString());
      student.set("contactNumber", studentData.U.toString());
      student.set("address", {
        street: studentData.L,
        city: studentData.M,
        province: studentData.N,
        region: studentData.D,
      });
      student.set("program", {
        programLevelCode: studentData.R.toString(),
        programName: studentData.S,
      });
      student.set("heiId", heiId);
      await student.save().then((student) => {
        // this.forceRerender(); //solution to updating DOM of child component
        nstpEnrollment.set(
          "studentId",
          new Parse.Object("Student", { id: student.id })
        );
        // nstpEnrollment.set("nstpId", new Parse.Object("Nstp", { id: nstpId }));
        nstpEnrollment.set(
          "applicationId",
          new Parse.Object("Application", { id: this.appId })
        );
        nstpEnrollment.set("takenNstp1", false);
        nstpEnrollment.set("takenNstp2", false);
        nstpEnrollment.set("isGraduated", false);
        nstpEnrollment.save();
        const StudentConflict = Parse.Object.extend("StudentConflict");
        const conflict = new StudentConflict();
        conflict.set(
          "studentId",
          new Parse.Object("Student", { id: student.id })
        );
        conflict.set(
          "applicationId",
          new Parse.Object("Application", { id: this.appId })
        );
        conflict.set(
          "reason",
          "The student has not yet been enrolled in any nstp program."
        );
        conflict.set("status", "3 of 4");
        conflict.save();
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
      query.include("nstpId");
      const results = await query.find();
      if (results.length == 0) {
        this.$emit("incompleteStep", 3, "1 of 4");
      }
      if (results.length > 0) {
        this.status = results[0].get("applicationId").get("status");
        this.data.program = results[0].get("nstpId").get("programName");
        for (let i = 0; i < results.length; i++) {
          const object = results[i];
          if (
            object.get("takenNstp1") == true &&
            object.get("takenNstp2") == true &&
            object.get("isGraduated") == true
          ) {
            studentList.push({
              id: object.get("studentId").id,
              name: object.get("studentId").get("name"),
              birthdate: object.get("studentId").get("birthdate"),
              gender: object.get("studentId").get("gender"),
              address: object.get("studentId").get("address"),
              program: object.get("studentId").get("program"),
              emailAddress: object.get("studentId").get("emailAddress"),
              contactNumber: object.get("studentId").get("contactNumber"),
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
          }
        }
      }
      const StudentConflict = Parse.Object.extend("StudentConflict");
      const conflict = new Parse.Query(StudentConflict);
      conflict.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      conflict.equalTo("status", "3 of 4");
      conflict.include("studentId");
      const res = await conflict.find();
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        studentErrorList.push({
          id: element.get("studentId").id,
          name: element.get("studentId").get("name"),
          birthdate: element.get("studentId").get("birthdate"),
          gender: element.get("studentId").get("gender"),
          address: element.get("studentId").get("address"),
          program: element.get("studentId").get("program"),
          emailAddress: element.get("studentId").get("emailAddress"),
          contactNumber: element.get("studentId").get("contactNumber"),
          reason: element.get("reason"),
        });
        if (
          element.get("studentId").get("gender").toUpperCase() == "F" ||
          element.get("studentId").get("gender").toUpperCase() == "FEMALE"
        ) {
          this.femaleNumError++;
        } else if (
          element.get("studentId").get("gender").toUpperCase() == "M" ||
          element.get("studentId").get("gender").toUpperCase() == "MALE"
        ) {
          this.maleNumError++;
        }
      }
      this.students = studentList;
      this.studentsMissing = studentErrorList;
      this.data.graduates = studentList.length;
      this.forceRerender();
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
      query.include("heiId");
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
      enrollment.equalTo("takenNstp1", true);
      enrollment.equalTo("takenNstp2", true);
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
          results[i].set("isGraduated", true);
          results[i].save();
          start++;
        }
      });
      if (Parse.User.current().get("userType") == "admin") {
        const params = {
          senderId: Parse.User.current().id,
          receiverId: results.get("heiId").id,
          action: "approved your",
          output: "Serial Number Application",
          routeName: "4thStep",
          applicationId: this.appId,
        };
        this.$emit("sendNotification", params);
      }
    },
    toggleConfirmModal() {
      this.confirm = !this.confirm;
    },
    toggleRejectModal() {
      this.reject = !this.reject;
    },
    async rejectApplication(reason) {
      const Application = Parse.Object.extend("Application");
      const application = new Parse.Query(Application);
      application.equalTo("objectId", this.appId);
      const results = await application.first();
      results.set("reason", reason);
      results.save();
      // since the application was rejected, students are not qualified
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      const nstpenrollment = new Parse.Query(NstpEnrollment);
      nstpenrollment.equalTo(
        "applicationId",
        new Parse.Object("Application", { id: this.appId })
      );
      const data = await nstpenrollment.find();
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element);
        element.set("takenNstp1", false);
        element.set("takenNstp2", false);
        element.set("isGraduated", false);
        element.save();
      }
      this.data.reason = reason;
      this.setStatus("Rejected");
      this.toggleRejectModal();
    },
    setStatus(status) {
      this.$emit("setStatus", status);
      this.getStudents();
    },
    confirmed() {
      // this.pending = true;
      this.approve().then(() => {
        // this.pending = false;
        this.$emit("complete", 3);
        this.$emit("setStatus", "Approved");
        this.status = "Approved";
        this.$emit("nextStep");
      });
    },
    removeFile() {
      this.dropzoneFile = "";
    },
    nextStep() {
      this.worker = undefined;
      this.$emit("nextStep");
    },
    goToApplication() {
      this.$emit("goToApplication");
    },
  },
};
</script>