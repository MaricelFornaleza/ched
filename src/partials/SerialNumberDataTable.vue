<template>
  <div class="p-10">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-20">
        <div class="flex flex-col">
          <button
            @click="exportToExcel()"
            class="btn-sm h-fit px-4 bg-dark-100 text-light-100"
          >
            <DownloadIcon class="h-5" />
          </button>
        </div>
      </div>
      <table id="dataTable" class="p-4 hover text-center w-full row-border">
        <thead class="text-xs uppercase">
          <tr>
            <th
              v-for="table_header in table_headers"
              :key="table_header"
              class="p-8"
            >
              {{ table_header.title }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white text-sm">
          <tr
            v-for="(application, index) in applications"
            :key="index"
            class="whitespace-nowrap"
          >
            <td class="px-6 py-4 text-left">{{ application.hei_name }}</td>
            <td class="px-6 py-4">
              <div class="">
                {{ application.application_type }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">{{ application.snRange }}</div>
            </td>
            <td class="px-6 py-4">{{ application.no_of_graduates }}</td>
            <td class="px-6 py-4">
              {{ application.date_approved }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//Bootstrap and jQuery libraries

import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import * as XLSX from "xlsx";

import { DownloadIcon } from "@heroicons/vue/outline";
export default {
  components: {
    DownloadIcon,
  },

  props: {
    applications: Object,
    table_headers: Array,
  },
  mounted() {
    $("#datatable").DataTable().destroy();
    this.setDatatable();
  },
  methods: {
    setDatatable() {
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
    exportToExcel() {
      var currentDate = new Date()
        .toLocaleDateString()
        .replace(/[^\w\s]/gi, "-");
      var workbook = XLSX.utils.book_new();

      var sheet1 = XLSX.utils.table_to_sheet(
        document.getElementById("dataTable")
      );

      XLSX.utils.book_append_sheet(workbook, sheet1, "Sheet1");
      var filename = "List-of-Applications-" + currentDate + ".xlsx";
      XLSX.writeFileXLSX(workbook, filename);
      this.displayMsg(
        "success",
        "The List of Serial Numbers was successfully downloaded."
      );
    },
    displayMsg(status, msg) {
      this.$emit("displayAlert", status, msg);
    },
  },
};
</script>