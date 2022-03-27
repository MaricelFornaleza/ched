<template>
  <div class="p-10">
    <div class="overflow-x-auto">
      <div class="flex space-x-5 absolute right-20 mt-5 z-10">
        <div class="flex flex-col">
          <button
            id="dropdownButton"
            @click="dropdownToggle()"
            class="btn-sm btn-default
            inline-flex
            items-center w-fit
            ml-auto
            px-4"
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
          </div>
      </div>
        <div class="flex flex-col">
          <button class="btn-sm h-fit px-4 bg-dark-100 text-light-100 hover:ring-4 hover:ring-dark-100">
            <CloudDownloadIcon class="h-5" />
          </button>
        </div>
      </div>
      <table id="dataTable" class="p-4 hover text-center w-full">
        <thead class="bg-gray-50 text-xs uppercase">
          <tr>
            <th class="p-8 text-left">HEI Name</th>
            <th class="p-8">Application Type</th>
            <th class="p-8">NSTP Program</th>
            <th class="p-8">Graduates</th>
            <th class="p-8">Date Applied</th>
            <th class="p-8">Date Approved</th>
            <th class="p-8">Status</th>
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
              <div class="">{{ Application.program }}</div>
            </td>
            <td class="px-6 py-4">{{ Application.no_of_graduates }}</td>
            <td class="px-6 py-4">
              {{ Application.date_approved }}
            </td>
            <td class="px-6 py-4">{{ Application.date_applied }}</td>
            <td class="px-6 py-4"><span :class="variant(Application.status)">{{ Application.status }}</span></td>
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
import { CloudDownloadIcon, ChevronDownIcon } from "@heroicons/vue/outline";

export default {
  components: {
    CloudDownloadIcon,
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
        "order": [],
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
          program: "CWTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "NA",
          status: "For Approval",
        },
        {
          id: 2,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          program: "LTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "NA",
          status: "For Approval",
        },
        {
          id: 3,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          program: "CWTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "February 09, 2022",
          status: "Approved",
        },
        {
          id: 4,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          program: "LTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "NA",
          status: "For Approval",
        },
        {
          id: 5,
          hei_name: "University of Nueva Caceres",
          application_type: "New Application",
          program: "LTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "NA",
          status: "For Approval",
        },
        {
          id: 6,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          program: "CWTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "NA",
          status: "2/3",
        },
        {
          id: 7,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          program: "CWTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "NA",
          status: "For Approval",
        },
        {
          id: 8,
          hei_name: "Ateneo de Naga University",
          application_type: "New Application",
          program: "CWTS",
          no_of_graduates: 200,
          date_applied: "February 08, 2022",
          date_approved: "NA",
          status: "For Revision",
        },
      ],
    };
  },
  methods: {
    dropdownToggle() {
      this.dropdown = !this.dropdown;
    },
    variant(stats) {
      if(stats == "Approved") {
        return 'badge-success';
      }
      else if(stats == "For Approval") {
        return 'badge-warning';
      }
      else if(stats == "For Revision") {
        return 'badge-error';
      }
      else { //Ongoing
        return 'badge';
      }
    }
  },
};
</script>