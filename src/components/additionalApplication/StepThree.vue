<template>
  <div>
    <div
      v-if="!completed"
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <AlertWidget className="alert-info">
        Please Upload the List of Graduates. Follow the format provided in the
        Template.&nbsp;
        <router-link to="/#" class="font-bold underline">
          Download Template
        </router-link>
      </AlertWidget>

      <div v-if="dropzoneFile === ''" class="mt-10 w-full">
        <DropZone @drop.prevent="drop" @change="selectedFile" />
        <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span>
      </div>
      <div
        v-else
        class="my-20 w-full flex justify-between p-5 border border-light-300"
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
          @click="upload(3)"
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
        The list of graduates was successfully uploaded. A transmittal letter
        was sent to Ateneo de Naga University’s email address.
      </SuccessAlert>
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
  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import SuccessAlert from "@/partials/SuccessAlert.vue";
import AlertWidget from "@/partials/AlertWidget.vue";

import studentsData from "@/assets/json/students.json";
import StudentsDataTable from "@/partials/StudentsDataTable.vue";
import { ref } from "vue";
export default {
  data() {
    return {
      completed: false,
      table_headers: [
        { title: "ID" },
        { title: "Name" },
        { title: "Birthdate" },
        { title: "Sex" },
        { title: "Address" },
        { title: "Email Address" },
        { title: "Contact Number" },
        { title: "Program Level Code" },
        { title: "Main Program Name" },
      ],
      students: studentsData,
    };
  },
  components: {
    SuccessAlert,
    AlertWidget,
    DropZone,
    StudentsDataTable,
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
      this.$emit("complete", step);
      this.completed = !this.completed;
    },
    nextStep() {
      this.$emit("nextStep");
    },
  },
};
</script>

<style>
</style>