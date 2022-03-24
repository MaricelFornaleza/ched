<template>
  <div class="p-10">
    <div class="flex space-x-5 absolute right-20 mt-5 z-20">
      <slot name="button"></slot>

      <button class="btn-sm h-fit px-4 bg-dark-100 text-light-100">
        <DownloadIcon class="h-5" />
      </button>
    </div>
    <div class="overflow-x-auto">
      <table id="dataTable" class="p-4 hover">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="table_header in table_headers"
              :key="table_header"
              class="p-8 text-xs text-gray-500"
            >
              {{ table_header.title }}
            </th>
            <th class="px-6 py-2 text-xs text-gray-500">Edit</th>
            <th class="px-6 py-2 text-xs text-gray-500">Delete</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="hei in heis"
            :key="hei.institutional_code"
            class="whitespace-nowrap"
          >
            <td class="px-6 py-4 text-sm text-center text-gray-500">
              {{ hei.institutional_code }}
            </td>
            <td class="px-6 py-4 text-center">
              <div class="text-sm text-gray-900">{{ hei.hei_name }}</div>
            </td>
            <td class="px-6 py-4 text-center">
              <div class="text-sm text-gray-500">{{ hei.hei_type }}</div>
            </td>
            <td class="px-6 py-4 text-sm text-center text-gray-500">
              {{ hei.email }}
            </td>
            <td class="px-6 py-4 text-center">
              <a
                href="#"
                class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                >Edit</a
              >
            </td>
            <td class="px-6 py-4 text-center">
              <a
                href="#"
                class="px-4 py-1 text-sm text-white bg-red-400 rounded"
                >Delete</a
              >
            </td>
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
import { DownloadIcon } from "@heroicons/vue/outline";
export default {
  components: {
    DownloadIcon,
  },
  props: {
    heis: Object,
    table_headers: Array,
  },

  data: function () {
    return {};
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
<style>
.dataTables_wrapper .dataTables_paginate .paginate_button.current {
  background-color: theme("colors.brand.blue") !important;
  background: none;
  border: none !important;
  color: white !important;
}
.dataTables_wrapper {
  box-shadow: 0 3px 5px rgb(0 0 0 / 0.1);
  padding: 0px;
  border-radius: 5px;
  border: 1px solid theme("colors.light.300");
}

.dataTable {
  padding: 0px;
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
  padding: 10px;
}
table.dataTable tbody .even {
  background-color: transparent;
}
.dataTables_wrapper .dataTables_info {
  padding: 20px;
  font-size: 12px;
  font-weight: 700;
}
.dataTables_wrapper .dataTables_paginate {
  padding-top: 7px;
  padding-right: 20px;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
  background-color: white !important;
  background: none;
  border: 1px solid theme("colors.light.300") !important;
}
.dataTables_wrapper .dataTables_filter input {
  background-color: white;
  border: 1px solid theme("colors.light.300") !important;
  padding: 5px 20px;
}
</style>

