<template>
  <div class="p-10 w-full text-center">
    <delete-modal
      v-if="confirm"
      @close="close"
      :deleteParams="deleteParams"
      @deleteApplication="deleteApplication"
    ></delete-modal>
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
              space-x-2
              items-center
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            "
            type="button"
          >
            <div>
              Add <span class="hidden lg:inline-flex">Application</span>
            </div>

            <ChevronDownIcon class="h-5" />
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
            <!-- xmhbiesbmfhykmwp -->
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
            title="Download to excel"
          >
            <DownloadIcon class="h-5" />
          </button>
        </div>
      </div>
      <div class="bg-light-200">
        <table
          id="dataTable"
          width="100%"
          class="p-4 hover text-center w-full row-border"
        >
          <thead class="text-xs">
            <tr>
              <th v-for="table_header in table_headers" :key="table_header">
                {{ table_header.title }}
              </th>
              <th></th>
              <!-- <th></th> -->
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
              <td v-else class="px-6 py-4">
                {{ application.no_of_graduates }}
              </td>
              <td class="px-6 py-4">
                {{ application.date_applied }}
              </td>
              <td
                v-if="application.date_approved == undefined"
                class="px-6 py-4"
              >
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
              <td class="px-6 py-0 flex space-x-3 justify-start">
                <EyeIcon
                  @click="
                    viewApplication(
                      application.id,
                      application.application_type
                    )
                  "
                  class="h-6 cursor-pointer"
                />
                <TrashIcon
                  @click="
                    confirmDelete(
                      application.id,
                      application.application_type,
                      application.status
                    )
                  "
                  class="h-6 text-error"
                  :class="[
                    application.application_type == 'New Application'
                      ? application.status == '1 of 4'
                        ? 'cursor-pointer'
                        : 'hidden'
                      : application.status == '1 of 4' ||
                        application.status == '2 of 4' ||
                        application.status == '3 of 4'
                      ? 'cursor-pointer'
                      : 'hidden',
                  ]"
                />
              </td>
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
import DeleteModal from "@/partials/DeleteModal.vue";
import $ from "jquery";
import * as XLSX from "xlsx";
import Parse from "parse";

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
    DeleteModal,
  },
  props: {
    applications: Object,
    table_headers: Array,
  },
  mounted() {
    $(document).ready(function () {
      $("#dataTable").DataTable({
        processing: true,
        retrieve: true,
        language: {
          searchPlaceholder: "Search",
          search: "",
          sLengthMenu: "_MENU_",
        },
        order: [],
        scrollX: true,
      });
    });
  },
  data: function () {
    return {
      dropdown: false,
      confirm: false,
      deleteParams: null,
    };
  },
  methods: {
    dropdownToggle() {
      this.dropdown = !this.dropdown;
    },
    viewApplication(app_id, app_type) {
      if (app_type == "New Application") {
        router.push({
          name: "1stStep",
          params: { application: app_id },
        });
      } else if (app_type == "For Additional Graduates") {
        router.push({
          name: "Step1",
          params: { application: app_id },
        });
      }
    },
    confirmDelete(app_id, app_type, app_status) {
      this.confirm = true;
      this.deleteParams = {
        app_id: app_id,
        app_type: app_type,
        app_status: app_status,
      };
    },
    close() {
      this.confirm = false;
    },
    deleteApplication(deleteParams) {
      //to be updated
      if (deleteParams.app_type == "New Application") {
        if (deleteParams.app_status == "1 of 4") {
          // Application
          const Application = Parse.Object.extend("Application");
          const query1 = new Parse.Query(Application);
          query1.get(deleteParams.app_id).then(
            (object) => {
              object.destroy();
            },
            (error) => {
              console.log(error);
            }
          );

          // NstpEnrollment
          const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
          const query3 = new Parse.Query(NstpEnrollment);
          query3.equalTo(
            "applicationId",
            new Parse.Object("Application", { id: deleteParams.app_id })
          );
          // query3.include("studentId");
          let studentList = [];
          query3.find().then(
            (results) => {
              for (let i = 0; i < results.length; i++) {
                studentList.push(results[i].get("studentId"));
                results[i].destroy();
              }
            },
            (error) => {
              console.log(error);
            }
          );
          console.log("studentList: " + studentList);
          // Student
          const Student = Parse.Object.extend("Student");
          const query4 = new Parse.Query(Student);

          for (let i = 0; i < studentList.length; i++) {
            console.log("student id: " + studentList[i]);
            query4.get(studentList[i]).then(
              (object) => {
                object.destroy();
              },
              (error) => {
                console.log(error);
              }
            );
          }
          this.displayMsg("success", "Application successfully deleted!");

          console.log("Application Deleted!");
        } else {
          this.displayMsg("error", "Cannot delete application after step 1!");
        }
      } else if (deleteParams.app_type == "For Additional Graduates") {
        if (
          deleteParams.app_status == "1 of 4" ||
          deleteParams.app_status == "2 of 4" ||
          deleteParams.app_status == "3 of 4"
        ) {
          // to be updated
          // Application
          const Application = Parse.Object.extend("Application");
          const query1 = new Parse.Query(Application);
          query1.get(deleteParams.app_id).then(
            (object) => {
              object.destroy();
            },
            (error) => {
              console.log(error);
            }
          );
          // ApplicationDocument
          const Document = Parse.Object.extend("ApplicationDocument");
          const query2 = new Parse.Query(Document);
          query2.equalTo(
            "applicationId",
            new Parse.Object("Application", { id: deleteParams.app_id })
          );
          query2.find().then(
            (results) => {
              for (let i = 0; i < results.length; i++) {
                results[i].destroy();
              }
            },
            (error) => {
              console.log(error);
            }
          );

          // May remove this since application can't be deleted after step 3
          // NstpEnrollment
          /*const NstpEnrollment = Parse.Object.extend("NstpEnrollment");
            const query3 = new Parse.Query(NstpEnrollment);
            query3.equalTo(
              "applicationId",
              new Parse.Object("Application", { id: app_id })
            );
            // query3.include("studentId");
            let studentList = [];
            query3.find().then(
              (results) => {
                for (let i = 0; i < results.length; i++) {
                  studentList.push(results[i].get("studentId"));
                  results[i].destroy();
                }
              },
              (error) => {
                console.log(error);
              }
            );
            console.log("studentList: " + studentList);

            // Student
            const Student = Parse.Object.extend("Student");
            const query4 = new Parse.Query(Student);

            for (let i = 0; i < studentList.length; i++) {
              console.log("student id: " + studentList[i]);
              query4.get(studentList[i]).then(
                (object) => {
                  object.destroy();
                },
                (error) => {
                  console.log(error);
                }
              );
            }*/
          this.displayMsg("success", "Application successfully deleted!");
          console.log("Application Deleted!");
        } else {
          this.displayMsg("error", "Cannot delete application after step 3!");
        }
      }
      this.close();
    },
    exportToExcel() {
      //this.displayMsg("success", "Application Deleted!");
      // this.displayMsg("error", "Cannot delete application after step 1!");
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
      this.displayMsg(
        "success",
        "The List of Applications was successfully downloaded."
      );
    },
    displayMsg(status, msg) {
      this.$emit("displayAlert", status, msg);
    },

    variant(stats) {
      if (stats == "Approved") {
        return "badge-success";
      } else if (stats == "For Approval") {
        return "badge-warning";
      } else if (stats == "Rejected") {
        return "badge-error";
      } else {
        //Ongoing
        return "badge";
      }
    },
  },
};
</script>