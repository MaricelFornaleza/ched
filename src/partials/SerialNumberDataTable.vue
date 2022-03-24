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
            <th class="p-8 text-left">HEI Name</th>
            <th class="p-8">Application Type</th>
            <th class="p-8">Serial Number Range</th>
            <th class="p-8">No. of Graduates</th>
            <th class="p-8">Date Approved</th>
            <th class="px-6 py-2">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white text-sm">
          <tr
            v-for="Application in Applications"
            :key="Application.id"
            class="whitespace-nowrap"
          >
            <td class="px-6 py-4 text-left">{{ Application.hei_name }}</td>
            <td class="px-6 py-4">
              <div class="text-gray-900">
                {{ Application.application_type }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">{{ Application.sn_range }}</div>
            </td>
            <td class="px-6 py-4">{{ Application.no_of_graduates }}</td>
            <td class="px-6 py-4">
              {{ Application.date_approved }}
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
  data: function () {
    return {
      dropdown: false,
      Applications: [
        {
          id: 1,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 2,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 3,
          hei_name: "Naga College Foundation, Inc",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 4,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 5,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 6,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 7,
          hei_name: "Naga College Foundation, Inc",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
        {
          id: 8,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          sn_range: "C-01-001254-001454-22",
          no_of_graduates: 200,
          date_approved: "February 01, 2021",
        },
      ],
    };
  },
  methods: {
    dropdownToggle() {
      this.dropdown = !this.dropdown;
    },
  },
};
</script>