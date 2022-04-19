<template>
  <div class="py-5 w-full">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-10">
        <div class="flex flex-col">
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
      </div>
      <div class="inline-block bg-light-200">
        <table
          :id="tableId"
          class="p-4 hover text-center w-full row-border"
        >
          <thead class="bg-gray-50 text-xs uppercase">
            <tr>
              <th class="p-6">No.</th>
              <th class="text-left">Last name</th>
              <th>First name</th>
              <th>Extension Name</th>
              <th>Middle</th>
              <th>Birthdate</th>
              <th>Sex</th>
              <th>Street/Brgy.</th>
              <th>Town/City</th>
              <th>Province</th>
            </tr>
          </thead>
          <tbody class="bg-white text-sm">
            <tr
              v-for="(student, index) in students"
              :key="index"
              class="whitespace-nowrap"
            >
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//Bootstrap and jQuery libraries

import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";import {
  DownloadIcon,
} from "@heroicons/vue/outline";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      tableId: 'dataTable',
      newFileName: this.fileName
    };
  },
  components: {
    DownloadIcon,
  },
  props: { students: Array, newId: String, fileName: String },
  created() {
    this.updateDt();
    // console.log(JSON.parse(JSON.stringify(this.table_headers)));
    this.newFileName = this.fileName;
  },
  watch: {
    students() {
      console.log("UPDATED students!");
      console.log(this.students);
      // this.$forceUpdate();
    },
  },
  methods: {
    updateDt() {
      if (typeof this.newId !== "undefined") {      //so that datatable's id is unique even when the component is used more than once
        this.tableId = this.newId;
      } 
      // console.log(this.tableId);
      var tempId  = "#" + this.tableId;
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
      if(typeof this.newFileName == "undefined")
        this.newFileName = `List-of-Applications_${currentDate}.xlsx`;
      else 
        this.newFilename = `${this.newFileName}_${currentDate}.xlsx`;
      XLSX.writeFileXLSX(workbook, this.newFilename);
    },
  },
};
</script>