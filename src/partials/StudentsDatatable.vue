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
              <th class="p-8">
                {{ table_headers.A }}
              </th>
              <th class="text-left">{{ table_headers.F }}</th>
              <th>{{ table_headers.G }}</th>
              <th>{{ table_headers.I }}</th>
              <th>{{ table_headers.H }}</th>
              <th>{{ table_headers.J }}</th>
              <th>{{ table_headers.K }}</th>
              <th>{{ table_headers.T }}</th>
              <th>{{ table_headers.U }}</th>
              <th>{{ table_headers.S }}</th>
            </tr>
          </thead>
          <tbody class="bg-white text-sm">
            <tr
              v-for="(student, index) in students"
              :key="index"
              class="whitespace-nowrap"
            >
              <td class="px-6 py-4">{{ student.A }}</td>
              <td class="px-6 py-4 text-left">{{ student.F }}</td>
              <td class="px-6 py-4">
                <div class="text-gray-900">
                  {{ student.G }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="">{{ student.I }}</div>
              </td>
              <td class="px-6 py-4">{{ student.H }}</td>
              <td class="px-6 py-4">
                {{ student.J }}
              </td>
              <td class="px-6 py-4">{{ student.K }}</td>
              <td class="px-6 py-4">{{ student.T }}</td>
              <td class="px-6 py-4">{{ student.U }}</td>
              <td class="px-6 py-4">{{ student.S }}</td>
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
  mounted() {
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

    // console.log(JSON.parse(JSON.stringify(this.table_headers)));
  },
  data: function () {
    return {
      example: { A: "Hi", B: "Hey" },
    };
  },
  props: {
    table_headers: Object,
    students: Array,
  },
};
</script>