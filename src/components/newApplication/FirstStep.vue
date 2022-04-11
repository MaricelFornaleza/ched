<template>
  <div>
    <div
      v-if="!completed"
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <AlertWidget :className="className">
        Please Upload the List of Enrollment for First Semester. Follow the
        format provided in the Template.&nbsp;
        <router-link to="/#" class="font-bold underline">
          Download Template
        </router-link>
      </AlertWidget>

      <div v-if="dropzoneFile === ''" class="mt-10 w-full">
        <DropZone @drop.prevent="drop" @change="selectedFile" />
        <!-- <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span> -->
      </div>

      <div
        v-else
        class="my-20 w-fit flex justify-between p-5 border border-light-300"
      >
        <div class="flex space-x-5">
          <img
            src="@/assets/img/xls.png"
            class="h-8"
            alt="XLS Icon by Dimitry Miroliubov"
          />
          <div class="text-base">{{ dropzoneFile.name }}</div>
        </div>
      </div>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="$emit('previousStep')"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Cancel
        </button>
        <button
          v-if="!completed"
          @click="upload(1)"
          class="btn-sm btn-default"
          type="submit"
        >
          Upload
        </button>
      </div>
    </div>

    <div
      v-else
      class="container mx-auto flex flex-col items-center justify-center"
    >
      <SuccessAlert className="alert-success">
        The list for the 1st semester was successfully uploaded. An
        Acknowledgement letter was sent to the email address.
      </SuccessAlert>

      <div class="grid grid-cols-3 gap-20 mt-6 mb-4">
        <div class="flex flex-col items-center">
          <h2 class="">{{ female_num }}</h2>
          <p class="uppercase">female</p>
        </div>
        <div class="flex flex-col items-center">
          <h2 class="">{{ male_num }}</h2>
          <p class="uppercase">male</p>
        </div>
        <div class="flex flex-col items-center">
          <h2 class="">{{ male_num + female_num }}</h2>
          <p class="uppercase">total</p>
        </div>
      </div>

      <!-- pass props lists -->
      <StudentsDataTable
        :students="students"
        :table_headers="table_headers"
      ></StudentsDataTable>

      <div class="flex items-center justify-center space-x-5 mt-5">
        <button
          @click="$emit('previousStep')"
          class="btn-sm btn-default btn-outline"
          type="button"
        >
          Cancel
        </button>

        <button @click="nextStep()" class="btn-sm btn-default" type="submit">
          Next
        </button>
      </div>
    </div>

    <ModalWidget v-show="visible">
      <template #body>
        <div
          class="
            inline-flex
            items-center
            px-4
            py-4
            font-semibold
            leading-6
            text-sm
            shadow
            rounded-md
            text-light-100
            bg-brand-blue
            hover:bg-brand-blue
            transition
            ease-in-out
            duration-150
            cursor-progress
          "
          disabled
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-light-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      </template>
    </ModalWidget>
  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import SuccessAlert from "@/partials/SuccessAlert.vue";
import studentsData from "@/assets/json/students.json";
import StudentsDataTable from "@/partials/StudentsDatatable.vue";
import ModalWidget from "@/partials/ModalWidget.vue";
import { ref } from "vue";
import Worker from "@/assets/js/parseFile.worker.js";
// import Parse from 'parse';

export default {
  // inheritAttrs: false,
  data() {
    return {
      visible: false,
      completed: false,
      className: "alert-info",
      table_headers: { A: "NO.", B: "NAME" },
      students: studentsData,
      male_num: 0,
      female_num: 0,
      excelData: [],
      worker: undefined,
    };
  },
  components: {
    SuccessAlert,
    DropZone,
    StudentsDataTable,
    ModalWidget,
  },
  setup() {
    let dropzoneFile = ref("");
    const drop = (e) => {
      dropzoneFile.value = e.dataTransfer.files[0];
    };
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
    };
    return { dropzoneFile, drop, selectedFile };
  },
  methods: {
    upload(step) {
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;

      if (this.dropzoneFile === "") {
        this.className = "alert-error";
      } else if (regex.test(this.dropzoneFile.name)) {
        // alert(`Submitted Files:\n${this.dropzoneFile.name}`);
        this.visible = true;
        let _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;

          if (typeof Worker !== "undefined") {
            if (typeof _this.worker == "undefined") {
              _this.worker = new Worker();
            }
            _this.worker.postMessage({
              d: data,
            });

            //can be improved by abstraction
            _this.worker.onmessage = function (event) {
              _this.table_headers = event.data.headers;
              _this.students = event.data.rows;
              _this.male_num = event.data.male;
              _this.female_num = event.data.female;
              // console.log(_this.students);
              if (event.data.complete) {
                _this.visible = false;
                _this.$emit("complete", step);
                _this.completed = !_this.completed;
              }
            };
          }
        };
        reader.readAsArrayBuffer(this.dropzoneFile);
      } else {
        alert("Please upload a .xlsx file!");
      }
    },
    nextStep() {
      this.worker.terminate();
      this.worker = undefined;

      this.$emit("nextStep");
    },
  },
};
</script>