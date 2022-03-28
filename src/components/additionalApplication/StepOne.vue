<template>
  <div>
    <div
      v-if="!completed"
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <AlertWidget className="alert-info">
        Please Upload a Notarized Transmittal Letter.
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
            src="@/assets/img/pdf.png"
            class="h-8"
            alt="PDF Icon by Dimitry Miroliubov"
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
      class="container w-fit mx-auto flex flex-col items-center justify-center"
    >
      <SuccessAlert className="alert-success">
        The Notarized Transmittal Letter was successfully uploaded.
      </SuccessAlert>

      <div
        class="my-20 w-full flex justify-between p-5 border border-light-300"
      >
        <div class="flex space-x-5">
          <img
            src="@/assets/img/pdf.png"
            class="h-8"
            alt="PDF Icon by Dimitry Miroliubov"
          />
          <div class="text-base">{{ dropzoneFile.name }}</div>
        </div>
        <div class="flex space-x-4">
          <button class="p-2 rounded fit-content bg-dark-100">
            <EyeIcon class="h-4 text-light-100" />
          </button>
          <button class="p-2 rounded fit-content bg-error">
            <DownloadIcon class="h-4 text-light-100" />
          </button>
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
import { EyeIcon, DownloadIcon } from "@heroicons/vue/outline";

import { ref } from "vue";
export default {
  data() {
    return {
      completed: false,
    };
  },
  components: {
    SuccessAlert,
    AlertWidget,
    DropZone,
    EyeIcon,
    DownloadIcon,
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