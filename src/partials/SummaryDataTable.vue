<template>
  <div class="p-10">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-20">
        <slot name="button"></slot>

        <button
          @click="exportToExcel"
          class="btn-sm h-fit px-4 bg-dark-100 text-light-100"
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
            <th rowspan="2" class="px-6 py-2">Action</th>
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
              <div class="">
                {{ object.rotc.male }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ object.rotc.female }}
              </div>
            </td>
            <td class="px-6 py-4 border-r border-light-400">
              <div class="">
                {{ object.rotc.total }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                <EyeIcon class="h-6 mx-auto text-dark-100 hover:text-warning" />
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
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
import * as XLSX from "xlsx";
import { DownloadIcon, EyeIcon } from "@heroicons/vue/outline";
export default {
  name: "EnrollmentDataTable",
  props: { objects: Object, table_headers: Array },
  components: {
    DownloadIcon,
    EyeIcon,
  },
  data: function () {
    return {
      dropdown: false,
    };
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

      XLSX.utils.book_append_sheet(workbook, sheet1, "Sheet1");
      var filename = "Summary-of-Enrollment-" + currentDate + ".xlsx";
      XLSX.writeFileXLSX(workbook, filename);
    },
  },

  mounted() {
    $(document).ready(function () {
      $("#dataTable").DataTable({
        language: {
          searchPlaceholder: "Search",
          search: "",
          sLengthMenu: "_MENU_",
        },
      });
    });
  },
};
</script>