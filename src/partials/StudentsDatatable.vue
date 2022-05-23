<template>
  <div class="py-5 w-full">
    <div class="overflow-x-auto">
      <div class="bg-light-100 relative">
        <div class="w-fit absolute z-40 right-5 top-5">
          <button
            v-if="selectedStudents != ''"
            @click="toggleDeleteModal()"
            class="p-2 rounded-sm bg-error text-light-100 mr-4"
          >
            <TrashIcon class="h-5" />
          </button>
          <button
            @click="exportToExcel()"
            class="
              h-fit
              p-2
              rounded-sm
              bg-dark-100
              text-light-100
              focus:ring-4 focus:ring-success-light focus:bg-success
            "
          >
            <DownloadIcon class="h-5" />
          </button>
        </div>
        <table
          :id="tableId"
          width="150%"
          class="p-4 hover text-center w-full row-border z-10"
        >
          <thead class="bg-gray-50 text-xs uppercase">
            <tr>
              <th v-if="allow">
                <div class="flex space-x-2 items-center">
                  <input
                    @change="selectAll"
                    type="checkbox"
                    v-model="allSelected"
                  />
                </div>
              </th>
              <th class="p-6">No.</th>
              <th class="text-left">Last Name</th>
              <th>First Name</th>
              <th>Extension Name</th>
              <th>Middle Name</th>
              <th>Birthdate</th>
              <th>Sex</th>
              <th>Street/Brgy.</th>
              <th>Town/City</th>
              <th>Province</th>
              <th>Program Level Code</th>
              <th>Main program name</th>
              <th>Email address</th>
              <th>Contact number</th>
              <th v-if="showError">Reason</th>
            </tr>
          </thead>
          <tbody class="bg-white text-sm">
            <tr
              v-for="(student, index) in students"
              :key="index"
              class="whitespace-nowrap"
            >
              <td v-if="allow">
                <input
                  type="checkbox"
                  :value="student.id"
                  v-model="selectedStudents"
                />
              </td>
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-left">
                {{ student.name.lastName }}
              </td>
              <td class="px-6 py-4">
                <div class="text-gray-900">
                  {{ student.name.firstName }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="">{{ student.name.extensionName }}</div>
              </td>
              <td class="px-6 py-4">{{ student.name.middleName }}</td>
              <td class="px-6 py-4">
                {{ student.birthdate }}
              </td>
              <td class="px-6 py-4">{{ student.gender }}</td>
              <td class="px-6 py-4">{{ student.address.street }}</td>
              <td class="px-6 py-4">{{ student.address.city }}</td>
              <td class="px-6 py-4">{{ student.address.province }}</td>
              <td class="px-6 py-4">{{ student.program.programLevelCode }}</td>
              <td class="px-6 py-4">{{ student.program.programName }}</td>
              <td class="px-6 py-4">{{ student.emailAddress }}</td>
              <td class="px-6 py-4">{{ student.contactNumber }}</td>
              <td v-if="showError" class="px-6 py-4">{{ student.reason }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <RemoveStudentModal
      v-if="deleteStudent"
      @toggleDeleteModal="toggleDeleteModal"
      @confirmDeleteStudent="confirmDeleteStudent"
      :studentCount="studentCount"
    />
  </div>
</template>

<script>
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { DownloadIcon, TrashIcon } from "@heroicons/vue/outline";
import RemoveStudentModal from "@/partials/RemoveStudentModal.vue";
import * as XLSX from "xlsx";
import Parse from "parse";
export default {
  data() {
    return {
      tableId: "dataTable",
      newFileName: this.fileName,
      deleteStudent: false,
      deleteParams: null,
      allow: true,
      selectedStudents: [],
      allSelected: false,
      studentCount: 0,
    };
  },
  components: {
    DownloadIcon,

    RemoveStudentModal,
    TrashIcon,
  },
  props: {
    students: Array,
    newId: String,
    fileName: String,
    status: String,
    showError: Boolean,
    appId: String,
  },
  async created() {
    this.updateDt();

    // console.log(JSON.parse(JSON.stringify(this.table_headers)));
    this.newFileName = this.fileName;
    // console.log(this.status);
    this.allowDelete();
  },
  watch: {
    students() {
      console.log("UPDATED students!");
      console.log(this.students);
      // this.$forceUpdate();
    },
  },
  methods: {
    allowDelete() {
      if (
        this.status == "Approved" ||
        this.status == "Rejected" ||
        this.status == null
      )
        this.allow = false;
    },
    async selectAll() {
      if (this.allSelected) {
        const selected = this.students.map((u) => u.id);
        this.selectedStudents = selected;
      } else {
        this.selectedStudents = [];
      }
    },
    showStudents() {
      console.log(this.selectedStudents);
    },
    toggleDeleteModal() {
      this.studentCount = this.selectedStudents.length;
      this.deleteStudent = !this.deleteStudent;
    },
    async confirmDeleteStudent() {
      await this.deleteStudents().then(() => {
        this.$emit("getStudents");
        this.updateDt();
        this.toggleDeleteModal();
      });
    },
    async deleteStudents() {
      const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
      var query1 = new Parse.Query(NstpEnrollment);
      console.log(this.selectedStudents);

      for (let i = 0; i < this.selectedStudents.length; i++) {
        const studentId = this.selectedStudents[i];
        console.log(studentId);

        query1.equalTo(
          "studentId",
          new Parse.Object("Student", { id: studentId })
        );
        await query1.first().then(
          (object) => {
            console.log(object);
            object.destroy().then(async (student) => {
              console.log("Nstp Deleted!");
              console.log(student);
              const Student = Parse.Object.extend("Student");
              const query2 = new Parse.Query(Student);
              await query2.get(studentId).then((obj) => {
                obj.destroy().then(async () => {
                  console.log("Student Deleted!");
                });
              });
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    updateDt() {
      if (typeof this.newId !== "undefined") {
        //so that datatable's id is unique even when the component is used more than once
        this.tableId = this.newId;
      }
      // console.log(this.tableId);
      var tempId = "#" + this.tableId;
      $(tempId).DataTable().destroy();
      $(document).ready(function () {
        $(tempId).DataTable({
          processing: true,
          retrieve: true,
          language: {
            searchPlaceholder: "Search",
            search: "",
            sLengthMenu: "_MENU_",
          },
          scrollX: true,
          columnDefs: [{ orderable: false, targets: 0 }],
        });
      });
    },
    exportToExcel() {
      var currentDate = new Date()
        .toLocaleDateString()
        .replace(/[^\w\s]/gi, "-");
      var workbook = XLSX.utils.book_new();
      var sheet1 = XLSX.utils.table_to_sheet(
        document.getElementById("dataTable")
      );
      XLSX.utils.book_append_sheet(workbook, sheet1, "Sheet1");
      if (typeof this.newFileName == "undefined")
        this.newFileName = `List-of-Applications_${currentDate}.xlsx`;
      else this.newFilename = `${this.newFileName}_${currentDate}.xlsx`;
      XLSX.writeFileXLSX(workbook, this.newFilename);
    },
  },
};
</script>