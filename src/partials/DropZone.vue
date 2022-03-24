<template>
  <div>
    <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active }"
      class="
        dropzone
        w-full
        py-10
        flex flex-col
        justify-center
        items-center
        space-y-5
        border-4 border-dashed border-dark-100
        rounded-md
        transition
        duration-300
        transition-ease
      "
    >
      <span><DocumentAddIcon class="h-14 text-dark-100 icon" /></span>
      <span class="lead-paragraph">
        <label for="dropzoneFile" class="font-bold underline cursor-pointer"
          >Browse</label
        >
        or drag and drop a file
      </span>
      <span class="body-m"
        >Must be .xlsx file using this
        <button class="font-bold underline">template</button>.</span>

      <input type="file" id="dropzoneFile" class="dropzoneFile" />
    </div>
  </div>
</template>

<style scoped >
.dropzone input {
  display: none;
}
.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: theme("colors.brand.blue");
}
.active-dropzone .icon {
  color: #fff;
}
</style>

<script>
import { ref } from "vue";
import { DocumentAddIcon } from "@heroicons/vue/outline";
export default {
  name: "DropZone",
  components: {
    DocumentAddIcon,
  },
  setup() {
    const active = ref(false);
    const toggleActive = () => {
      active.value = !active.value;
    };
    return { active, toggleActive };
  },
};
</script>