<template>
  <div class="p-10">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-20">
        <div class="flex flex-col">
          <button class="btn-sm h-fit px-4 bg-dark-100 text-light-100">
            <DownloadIcon class="h-5" />
          </button>
        </div>
      </div>
      <table id="dataTable" class="p-4 hover text-center w-full">
        <thead class="bg-gray-50 text-xs uppercase">
          <tr>
            <th
              v-for="table_header in table_headers"
              :key="table_header"
              class="p-8 text-xs text-gray-500"
            >
              {{ table_header.title }}
            </th>
            <th class="px-6 py-2">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white text-sm">
          <tr
            v-for="application in applications"
            :key="application.id"
            class="whitespace-nowrap"
          >
            <td class="px-6 py-4 text-left">{{ application.hei_name }}</td>
            <td class="px-6 py-4">
              <div class="">
                {{ application.application_type }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">{{ application.sn_range }}</div>
            </td>
            <td class="px-6 py-4">{{ application.no_of_graduates }}</td>
            <td class="px-6 py-4">
              {{ application.date_approved }}
            </td>
            <td class="px-6 py-4">
              <a href="#" class="px-4 py-1 text-white bg-red-400 rounded"
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
//Bootstrap and jQuery libraries

import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { DownloadIcon } from "@heroicons/vue/outline";
export default {
  props: {
    applications: Object,
    table_headers: Array,
  },
  components: {
    DownloadIcon,
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