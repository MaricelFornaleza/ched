<template>
  <div class="p-10 w-full">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-10">
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
              rounded-sm
              text-sm
              px-4
              py-2
              text-center
              inline-flex
              items-center
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            "
            type="button"
          >
            Add Application
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
            <slot>
              <ul class="py-1" aria-labelledby="dropdownButton">
                <li>
                  <router-link to="/application/new"
                    ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                      New Application
                    </p></router-link
                  >
                </li>
                <li>
                  <router-link to="/application/#"
                    ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                      For Additional Graduates
                    </p></router-link
                  >
                </li>
              </ul>
            </slot>
          </div>
        </div>
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

      <table id="dataTable" class="p-4 hover text-center w-full row-border">
        <thead class="text-xs">
          <tr>
            <th v-for="table_header in table_headers" :key="table_header">
              {{ table_header.title }}
            </th>
            <th class="px-6 py-2 text-xs text-gray-500">View</th>
            <th class="px-6 py-2 text-xs text-gray-500">Delete</th>
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
              <div class="text-gray-900">
                {{ application.application_type }}
              </div>
            </td>
            <td v-if="application.program == ''" class="px-6 py-4">
              <div class="">Not Indicated</div>
            </td>
            <td v-else class="px-6 py-4">
              <div class="">{{ application.program }}</div>
            </td>
            <td v-if="application.no_of_graduates == ''" class="px-6 py-4">
              0
            </td>
            <td v-else class="px-6 py-4">{{ application.no_of_graduates }}</td>
            <td class="px-6 py-4">
              {{ application.date_applied }}
            </td>
            <td v-if="application.date_approved == undefined" class="px-6 py-4">
              NA
            </td>
            <td v-else class="px-6 py-4">
              {{
                application.date_approved.toLocaleDateString("en", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </td>
            <td class="px-6 py-4">
              <span :class="variant(application.status)">{{
                application.status
              }}</span>
            </td>
            <td class="px-6 py-0">
              <EyeIcon
                @click="viewApplication(application.id)"
                class="h-6 mx-auto cursor-pointer"
              />
            </td>
            <td class="px-6 py-4">
              <TrashIcon class="h-6 mx-auto text-error cursor-pointer" />
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

import router from "../router";
import {
  DownloadIcon,
  ChevronDownIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/vue/outline";

export default {
  components: {
    DownloadIcon,
    ChevronDownIcon,
    EyeIcon,
    TrashIcon,
  },
  props: {
    applications: Object,
    table_headers: Array,
  },
  mounted() {
    $(document).ready(function () {
      $("#dataTable").DataTable({
        language: {
          searchPlaceholder: "Search",
          search: "",
          sLengthMenu: "_MENU_",
        },
        order: [],
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
    viewApplication(app_id) {
      router.push({
        name: "Step1",
        params: { application: app_id },
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
    },
    displayMsg() {
      this.$emit("displayMsg", "success", "Download successful!");
    },
    variant(stats) {
      if (stats == "Approved") {
        return "badge-success";
      } else if (stats == "For Approval") {
        return "badge-warning";
      } else if (stats == "For Revision") {
        return "badge-error";
      } else {
        //Ongoing
        return "badge";
      }
    },
  },
};
</script>