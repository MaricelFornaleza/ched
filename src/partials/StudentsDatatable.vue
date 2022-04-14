<template>
  <div class="py-5 w-full">
    <div class="overflow-x-auto">
      <div class="inline-block bg-light-200">
        <table
          id="dataTable"
          class="p-4 hover text-center table-hover table-light table-striped"
          style="width: 100%"
        >
          <thead class="bg-gray-50 text-xs uppercase">
            <tr>
              <th class="p-8">No.</th>
              <th class="text-left">Last name</th>
              <th>First name</th>
              <th>Extension Name</th>
              <th>Middle</th>
              <th>Birthdate</th>
              <th>Sex</th>
              <th>Street/Brgy.</th>
              <th>Town/City</th>
              <th>Province</th>
            </tr>
          </thead>
          <tbody class="bg-white text-sm">
            <tr
              v-for="(student, index) in students"
              :key="index"
              class="whitespace-nowrap"
            >
              <td class="px-6 py-4">{{ index }}</td>
              <td class="px-6 py-4 text-left">
                {{ student.name.lastName }}
              </td>
              <td class="px-6 py-4">
                <div class="text-gray-900">
                  {{ student.name.firstName }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="">{{ student.name.extensionName }}</div>
              </td>
              <td class="px-6 py-4">{{ student.name.middleName }}</td>
              <td class="px-6 py-4">
                {{ student.birthdate }}
              </td>
              <td class="px-6 py-4">{{ student.gender }}</td>
              <td class="px-6 py-4">{{ student.address.street }}</td>
              <td class="px-6 py-4">{{ student.address.city }}</td>
              <td class="px-6 py-4">{{ student.address.province }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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

export default {
  components: {},
  data() {
    return {};
  },
  props: { students: Array },
  created() {
    this.updateDt();
    // console.log(JSON.parse(JSON.stringify(this.table_headers)));
    
  },
  watch: {
    students() {
      console.log("UPDATED students!");
      console.log(this.students);
      // this.$forceUpdate();
    }
  },
  methods: {
    updateDt() {
      $("#datatable").DataTable().destroy();
      $(document).ready(function () {
        $("#dataTable").DataTable({
          processing: true,
          retrieve: true,
          language: {
            searchPlaceholder: "Search",
            search: "",
            sLengthMenu: "_MENU_",
          },
          scrollX: true,
        });
      });
    },
  },
};
</script>