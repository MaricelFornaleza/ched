<template>
  <div class="p-10">
    <div class="flex space-x-5 absolute right-20 mt-5 z-20">
      <slot name="button"></slot>

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
    <div class="bg-light-200">
      <table id="dataTable" width="100%" class="p-4 w-full hover row-border">
        <thead class="text-xs">
          <tr>
            <th
              v-for="table_header in table_headers"
              :key="table_header"
              class="p-8"
            >
              {{ table_header.title }}
            </th>
            <th class="px-6 py-2"></th>
            <!-- <th class="px-6 py-2">Delete</th> -->
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="hei in heis" :key="hei.id" class="whitespace-nowrap">
            <td class="px-6 py-4 text-sm text-center text-gray-500">
              {{ hei.institutional_code }}
            </td>
            <td class="px-6 py-4 text-left">
              <div class="text-xs font-bold text-gray-900 uppercase">
                {{ hei.hei_username }}
              </div>
              <div class="text-sm text-gray-900 uppercase">
                {{ hei.hei_name }}
              </div>
            </td>
            <td class="px-6 py-4 text-center">
              <div class="text-sm text-gray-500">{{ hei.hei_type }}</div>
            </td>
            <td class="px-6 py-4 text-sm text-center text-gray-500">
              {{ hei.email }}
            </td>
            <td class="px-6 py-4 text-sm text-left text-gray-500">
              <div class="text-sm text-gray-900">
                {{ hei.address.barangay }},
                {{ hei.address.city }}
              </div>
              <div class="text-xs text-gray-900">
                {{ hei.address.province }}, {{ hei.address.regionName }}
              </div>
            </td>
            <td class="px-6 py-0">
              <EyeIcon
                @click="editHei(hei.id)"
                class="h-6 mx-auto cursor-pointer"
              />
            </td>
            <!-- <td class="px-6 py-4">
              <TrashIcon
                @click="deleteHei(hei.id)"
                class="h-6 mx-auto text-error cursor-pointer"
              />
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import * as XLSX from "xlsx";
import router from "../router";
import { DownloadIcon, EyeIcon } from "@heroicons/vue/outline";
import Parse from "parse";

export default {
  components: {
    DownloadIcon,
    EyeIcon,
  },
  props: {
    heis: Object,
    table_headers: Array,
  },

  data: function () {
    return {};
  },

  mounted() {
    $("#datatable").DataTable().destroy();
    this.setDatatable();
    // console.log(this.heis);
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
          scrollX: true,
        });
      });
    },
    editHei(id) {
      router.push({
        name: "editHei",
        params: { id: id },
      });
    },
    deleteHei(id) {
      const query = new Parse.Query(Parse.User);
      query.get(id).then(
        (object) => {
          console.log("success");
          object.destroy({ useMasterKey: true });
        },
        (error) => {
          console.log(error);
        }
      );
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
        "The List of Higher Education Institutions was successfully downloaded."
      );
    },
    displayMsg(status, msg) {
      this.$emit("displayAlert", status, msg);
    },
  },
};
</script>
<style>
.dataTables_wrapper .dataTables_paginate .paginate_button.current {
  background-color: theme("colors.info.light") !important;
  background: none;
  /* border: none !important; */
  border: 1px solid theme("colors.info.DEFAULT") !important;
  color: theme("colors.info.DEFAULT") !important;
}
.dataTables_wrapper {
  box-shadow: 0 3px 5px rgb(0 0 0 / 0.2);
  padding: 0px;
  border-radius: 5px;
  border: 1px solid theme("colors.light.200");
  background-color: white;
}

.dataTable {
  padding: 10px;
  padding-top: 20px !important;
}
.dataTables_length {
  margin-left: 20px;
  margin-top: 20px;
}
.dataTables_filter {
  margin-left: 20px;
  margin-top: 20px;
  float: left !important;
}
table.dataTable thead th,
table.dataTable.no-footer {
  border-bottom: 1px solid theme("colors.light.300");
}

th {
  text-transform: uppercase;
}
table.dataTable tbody td {
  padding: 10px 20px;
}

.dataTables_wrapper .dataTables_info {
  padding: 20px;
  font-size: 12px;
  font-weight: 700;
}
.dataTables_wrapper .dataTables_paginate {
  padding-top: 15px;
  padding-right: 20px;
  font-size: 12px;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
  background-color: white !important;
  background: none;
  border: 1px solid theme("colors.info.DEFAULT") !important;
  color: theme("colors.info.DEFAULT") !important;
}
.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
  background-color: white !important;
  background: none;
  border: 1px solid theme("colors.info.DEFAULT") !important;
  color: theme("colors.info.DEFAULT") !important;
}
.dataTables_wrapper .dataTables_filter input {
  background-color: white;
  border: 1px solid theme("colors.light.300") !important;
  padding: 5px 20px;
}
</style>

