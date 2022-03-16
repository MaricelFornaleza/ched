<template>
  <div>
    <div
      class="
        m-auto
        mt-20
        border border-1 border-light-300
        shadow-sm
        px-20
        py-10
        bg-light-100
        w-4/5
        lg:w-4/12
      "
    >
      <div
        class="
          border-b-2
          text-center
          flex flex-col
          justify-center
          items-center
          space-y-3
          w-full
          pb-3
          border-dark-100
          mb-4
        "
      >
        <div class="rounded-full bg-warning-light h-fit w-fit p-4 text-warning">
          <LibraryIcon class="h-10" />
        </div>
        <p class="uppercase font-bold label-sm">Higher Education Institution</p>
      </div>
      <div>
        <DropZone @drop.prevent="drop" @change="selectedFile" />
        <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span>
      </div>
      <div class="flex items-center justify-center space-x-5 mt-10">
        <button class="btn-sm bg-light-300 font-bold" type="button">
          Cancel
        </button>
        <button
          class="btn-sm bg-brand-blue text-light-100 font-bold"
          type="submit"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import { ref } from "vue";
import { LibraryIcon } from "@heroicons/vue/solid";
export default {
  components: {
    LibraryIcon,
    DropZone,
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
};
</script>
