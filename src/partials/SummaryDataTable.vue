<template>
  <div class="p-10">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-20">
        <slot name="button"></slot>

        <button
          @click="exportToExcel"
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
      <table id="dataTable" width="100%" class="p-4 hover w-fit lg:w-full">
        <thead class="bg-gray-50 text-xs">
          <tr>
            <th rowspan="2" class="p-8 text-left">HEI Name</th>
            <th colspan="3" class="p-8 border-l border-light-400">CWTS</th>
            <th colspan="3" class="p-8 border-l border-light-400">LTS</th>
            <th colspan="3" class="p-8 border-x border-light-400">ROTC</th>
            <th rowspan="2" class="px-6 py-2"></th>
          </tr>
          <tr>
            <th class="p-8 border-l border-light-400">Male</th>
            <th class="p-8">Female</th>
            <th class="p-8">Total</th>
            <th class="p-8 border-l border-light-400">Male</th>
            <th class="p-8">Female</th>
            <th class="p-8">Total</th>
            <th class="p-8 border-l border-light-400">Male</th>
            <th class="p-8">Female</th>
            <th class="p-8 border-r border-light-400">Total</th>
          </tr>
        </thead>
        <tbody class="bg-white text-sm">
          <tr
            v-for="object in objects"
            :key="object.id"
            class="whitespace-nowrap text-center"
          >
            <td class="px-6 py-4 text-left">
              <div class="text-gray-900 font-bold">
                {{ object.hei_name }}
              </div>
            </td>
            <td class="px-6 py-4 border-l border-light-400">
              <div class="">
                {{ object.cwts.male }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ object.cwts.female }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ object.cwts.total }}
              </div>
            </td>
            <td class="px-6 py-4 border-l border-light-400">
              <div class="">{{ object.lts.male }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ object.lts.female }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ object.lts.total }}
              </div>
            </td>
            <td class="px-6 py-4 border-l border-light-400">
              <div class="">0</div>
            </td>
            <td class="px-6 py-4">
              <div class="">0</div>
            </td>
            <td class="px-6 py-4 border-r border-light-400">
              <div class="">0</div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                <EyeIcon
                  @click="viewStudents(semester, acadYear, object.hei_id)"
                  class="
                    h-6
                    mx-auto
                    text-dark-100
                    hover:text-warning
                    cursor-pointer
                  "
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
 <style>
</style>

<script>
//Bootstrap and jQuery libraries

import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import $ from "jquery";
// import * as XLSX from "xlsx";
import * as XLSX from "sheetjs-style";
import router from "../router";
import { DownloadIcon, EyeIcon } from "@heroicons/vue/outline";
export default {
  name: "EnrollmentDataTable",
  props: { objects: Object, table_headers: Array, sem: String, year: String, fileName: String },
  components: {
    DownloadIcon,
    EyeIcon,
  },
  data: function () {
    return {
      dropdown: false,
      semester: "",
      acadYear: "",
      newFileName: this.fileName,
    };
  },
  watch: {
    sem: function (newSem) {
      this.semester = newSem;
    },
    year: function (newYear) {
      this.acadYear = newYear;
    },
  },
  methods: {
    exportToExcel() {
      var currentDate = new Date()
        .toLocaleDateString()
        .replace(/[^\w\s]/gi, "-");
      var workbook = XLSX.utils.book_new();

      var sheet1 = XLSX.utils.table_to_sheet(
        document.getElementById("dataTable")
      );
      // sheet1['!rows'] = [];
      // sheet1['!rows'][1] = { hidden: true };
      
      for (const i in sheet1) {
        if (typeof sheet1[i] != "object") continue;
        let cell = XLSX.utils.decode_cell(i);

        sheet1[i].s = {
          border: {
            right: {
                style: "thin",
                color: "000000"
            },
            left: {
                style: "thin",
                color: "000000"
            },
            top: {
                style: "thin",
                color: "000000"
            },
            bottom: {
                style: "thin",
                color: "000000"
            },
          },
          alignment: {
            horizontal: "center",
          },
        }

        if (cell.c == 0) {
          sheet1[i].s.alignment = {
            horizontal: "left",
          };
        }

        if (cell.r == 0) {
          // first row
          sheet1[i].s.font = {
            bold: true,
          };
          sheet1[i].s.alignment = {
            vertical: "center",
            horizontal: "center",
            wrapText: '1', // any truthy value here
          };
        }
        else if (cell.r == 1) {
          sheet1[i].s.font = {
            bold: true,
          };
        }
      }
      
      sheet1["!cols"] = [
        { wch: 25 },
      ];
      
      var sheetName = this.semester;
      if(this.semester == "0") {
        sheetName = "Summary of Graduates"
      }
      if(typeof this.acadYear !== "undefined") {
        sheetName += "_" + this.acadYear;
      }
      XLSX.utils.book_append_sheet(workbook, sheet1, sheetName);
      if (typeof this.newFileName == "undefined")
        this.newFileName = `Summary_${currentDate}.xlsx`;
      else this.newFilename = `${this.newFileName}_${currentDate}.xlsx`;
      XLSX.writeFile(workbook, this.newFilename);

      this.displayMsg("success");
    },
    viewStudents(sem, year, id) {
      router.push({
        name: "viewStudents",
        params: {
          sem: sem,
          year: year,
          id: id,
        },
      });
    },
    displayMsg(status) {
      this.$emit("displayAlert", status);
    },
  },

  mounted() {
    this.semester = this.sem;
    this.acadYear = this.year;

    $(document).ready(function () {
      $("#dataTable").DataTable({
        language: {
          searchPlaceholder: "Search",
          search: "",
          sLengthMenu: "_MENU_",
        },
        scrollX: true,
      });
    });
  },
};
</script>