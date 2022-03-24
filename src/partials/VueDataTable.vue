<template>
  <div class="p-10">
    <div class="flex space-x-5 absolute right-20 mt-5 z-20">
      <div class="flex flex-col">
        <button
          id="dropdownButton"
          @click="dropdownToggle()"
          class="
            w-fit
            ml-auto
            text-light-100
            bg-brand-blue
            hover:bg-blue-800
            focus:ring-4 focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-4
            py-2.5
            text-center
            inline-flex
            items-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
          type="button"
        >
          Add HEI
          <ChevronDownIcon class="ml-2 h-5" />
        </button>

        <!-- Dropdown menu -->
        <div
          v-show="dropdown"
          class="
            z-10
            w-auto
            text-base
            list-none
            bg-light-100
            rounded
            divide-y divide-gray-100
            shadow
            dark:bg-gray-700
          "
        >
          <ul class="py-1" aria-labelledby="dropdownButton">
            <li>
              <router-link to="/hei/new"
                ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                  New HEI
                </p></router-link
              >
            </li>
            <li>
              <router-link to="/hei/upload"
                ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                  Upload Excel File
                </p></router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <button class="btn-sm h-fit px-4 bg-dark-100 text-light-100">
        <DownloadIcon class="h-5" />
      </button>
    </div>
    <table id="dataTable" class="p-4 hover">
      <thead class="bg-gray-50">
        <tr>
          <th class="p-8 text-xs text-gray-500">ID</th>
          <th class="p-8 text-xs text-gray-500">Name</th>
          <th class="p-8 text-xs text-gray-500">Email</th>
          <th class="p-8 text-xs text-gray-500">Created_at</th>
          <th class="px-6 py-2 text-xs text-gray-500">Edit</th>
          <th class="px-6 py-2 text-xs text-gray-500">Delete</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr class="whitespace-nowrap">
          <td class="px-6 py-4 text-sm text-center text-gray-500">1</td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-900">Jon doe 1</div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-500">jhondoe@example.com</div>
          </td>
          <td class="px-6 py-4 text-sm text-center text-gray-500">2021-1-12</td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >Edit</a
            >
          </td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded"
              >Delete</a
            >
          </td>
        </tr>
        <tr class="whitespace-nowrap">
          <td class="px-6 py-4 text-sm text-center text-gray-500">2</td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-900">Jon doe 2</div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-500">jhondoe@example.com</div>
          </td>
          <td class="px-6 py-4 text-sm text-center text-gray-500">2021-1-12</td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >Edit</a
            >
          </td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded"
              >Delete</a
            >
          </td>
        </tr>
        <tr class="whitespace-nowrap">
          <td class="px-6 py-4 text-sm text-center text-gray-500">3</td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-900">Jon doe 3</div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-500">jhondoe@example.com</div>
          </td>
          <td class="px-6 py-4 text-sm text-center text-gray-500">2021-1-12</td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >Edit</a
            >
          </td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded"
              >Delete</a
            >
          </td>
        </tr>
        <tr class="whitespace-nowrap">
          <td class="px-6 py-4 text-sm text-center text-gray-500">3</td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-900">Jon doe 3</div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-500">jhondoe@example.com</div>
          </td>
          <td class="px-6 py-4 text-sm text-center text-gray-500">2021-1-12</td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >Edit</a
            >
          </td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded"
              >Delete</a
            >
          </td>
        </tr>
        <tr class="whitespace-nowrap">
          <td class="px-6 py-4 text-sm text-center text-gray-500">3</td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-900">Jon doe 3</div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-500">jhondoe@example.com</div>
          </td>
          <td class="px-6 py-4 text-sm text-center text-gray-500">2021-1-12</td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >Edit</a
            >
          </td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded"
              >Delete</a
            >
          </td>
        </tr>
        <tr class="whitespace-nowrap">
          <td class="px-6 py-4 text-sm text-center text-gray-500">3</td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-900">Jon doe 3</div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-500">jhondoe@example.com</div>
          </td>
          <td class="px-6 py-4 text-sm text-center text-gray-500">2021-1-12</td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >Edit</a
            >
          </td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded"
              >Delete</a
            >
          </td>
        </tr>
        <tr class="whitespace-nowrap">
          <td class="px-6 py-4 text-sm text-center text-gray-500">3</td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-900">Jon doe 3</div>
          </td>
          <td class="px-6 py-4 text-center">
            <div class="text-sm text-gray-500">jhondoe@example.com</div>
          </td>
          <td class="px-6 py-4 text-sm text-center text-gray-500">2021-1-12</td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >Edit</a
            >
          </td>
          <td class="px-6 py-4 text-center">
            <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded"
              >Delete</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 <style>
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
.dataTables_wrapper .dataTables_paginate .paginate_button.current {
  background-color: theme("colors.brand.blue") !important;
  background: none;
  border: none;
  color: white !important;
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
<script>
//Bootstrap and jQuery libraries

import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { DownloadIcon, ChevronDownIcon } from "@heroicons/vue/outline";
export default {
  components: {
    DownloadIcon,
    ChevronDownIcon,
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
    };
  },
  methods: {
    dropdownToggle() {
      this.dropdown = !this.dropdown;
    },
  },
};
</script>