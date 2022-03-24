<template>
  <div class="p-10">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-20">
        <select
          @change="setYear($event)"
          v-model="selected_year"
          name="acadyear"
          id="acadyear"
          class="
            text-light-100
            w-full
            px-3
            py-3
            block
            w-full
            rounded-md
            sm:text-sm
            bg-brand-blue
          "
        >
          <option value="2021-22" selected class="bg-light-100 text-dark-300">
            2021-22
          </option>
          <option value="2020-21" class="bg-light-100 text-dark-300">
            2020-21
          </option>
          <option value="2019-20" class="bg-light-100 text-dark-300">
            2019-20
          </option>
          <option value="2018-19" class="bg-light-100 text-dark-300">
            2018-19
          </option>
        </select>
        <select
          @change="setSem"
          name="semester"
          id="semester"
          class="
            text-light-100
            w-full
            px-3
            py-3
            block
            w-full
            rounded-md
            sm:text-sm
            bg-brand-blue
          "
        >
          <option value="1st Sem" class="bg-light-100 text-dark-300">
            1st Semester
          </option>
          <option value="2nd Sem" class="bg-light-100 text-dark-300">
            2nd Semester
          </option>
        </select>

        <button class="btn-sm h-fit px-4 bg-dark-100 text-light-100">
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
            v-for="Enrollment in Enrollments"
            :key="Enrollment.id"
            class="whitespace-nowrap text-center"
          >
            <td class="px-6 py-4 text-left">
              <div class="text-gray-900 font-bold">
                {{ Enrollment.hei_name }}
              </div>
            </td>
            <td class="px-6 py-4 border-l border-light-400">
              <div class="">
                {{ Enrollment.cwts.male }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ Enrollment.cwts.female }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ Enrollment.cwts.total }}
              </div>
            </td>
            <td class="px-6 py-4 border-l border-light-400">
              <div class="">{{ Enrollment.lts.male }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ Enrollment.lts.female }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ Enrollment.lts.total }}
              </div>
            </td>
            <td class="px-6 py-4 border-l border-light-400">
              <div class="">
                {{ Enrollment.rotc.male }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">
                {{ Enrollment.rotc.female }}
              </div>
            </td>
            <td class="px-6 py-4 border-r border-light-400">
              <div class="">
                {{ Enrollment.rotc.total }}
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
import { DownloadIcon, EyeIcon } from "@heroicons/vue/outline";
export default {
  name: "EnrollmentDataTable",
  props: ["_selected_year"],
  components: {
    DownloadIcon,
    EyeIcon,
  },
  data: function () {
    return {
      dropdown: false,
      selected_year: this._selected_year,
      Enrollments: [
        {
          id: 1,
          hei_name: "Ateneo de Naga University",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
        {
          id: 2,
          hei_name: "Bicol State College of Applied Sciences and Technology",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
        {
          id: 3,
          hei_name: "University of Nueva Caceres",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
        {
          id: 4,
          hei_name: "Naga College Foundation, Inc.",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
      ],
    };
  },
  methods: {
    dropdownToggle() {
      this.dropdown = !this.dropdown;
    },
    setYear(e) {
      this.$emit("setAcadYear", e.target.value);
    },
    setSem(e) {
      this.$emit("setSemester", e.target.value);
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