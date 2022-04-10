<template>
  <div class="py-5">
    <div class="overflow-x-auto bg-light-200">
      
      <table id="dataTable" class="p-4 hover text-center w-full">
        <thead class="bg-gray-50 text-xs uppercase">
          <tr>
            <th class="p-8 text-left">Name</th>
            <th class="p-8">Birthdate</th>
            <th class="p-8">Sex</th>
            <th class="p-8">Address</th>
            <th class="p-8">Email Address</th>
            <th class="p-8">Contact Number</th>
            <th class="p-8">Main Program Name</th>
          </tr>
        </thead>
        <tbody class="bg-white text-sm">
          <tr
            v-for="student in students"
            :key="student.id"
            class="whitespace-nowrap"
          >
            <td class="px-6 py-4 text-left">{{ student.name }}</td>
            <td class="px-6 py-4">
              <div class="text-gray-900">
                {{ student.birthdate }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="">{{ student.sex }}</div>
            </td>
            <td class="px-6 py-4">{{ student.address }}</td>
            <td class="px-6 py-4">
              {{ student.email }}
            </td>
            <td class="px-6 py-4">{{ student.contact_num }}</td>
            <td class="px-6 py-4">{{ student.program }}</td>
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

export default {
  components: {
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
      students: [
        {
          id: 1,
          name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
        {
          id: 2,
          name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
        {
          id: 3,
         name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
        {
          id: 4,
          name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
        {
          id: 5,
          name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
        {
          id: 6,
          name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
        {
          id: 7,
          name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
        {
          id: 8,
          name: "Juan Dela Cruz",
          birthdate: "January 1, 2000",
          sex: "Male",
          address: "Naga City",
          email: "juan@gmail.com",
          contact_num: "09123456789",
          program: "BS IT",
        },
      ],
    };
  },
  methods: {
  },
};
</script>