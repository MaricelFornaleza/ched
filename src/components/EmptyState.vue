<template>
  <div class="my-auto">
    <div
      class="
        rounded-md
        border-dashed border-2 border-dark-100
        py-20
        px-20
        lg:px-48
        flex flex-col
        justify-center
        text-center
      "
    >
      <DocumentAddIcon class="h-24 text-dark-100 mb-5" />
      <p class="text-4xl font-medium">No HEIs Found</p>
      <p class="body-l">Get started by adding new HEI</p>
      <div class="flex gap-10 mt-10">
        <button class="btn-sm outline outline-brand-blue">New HEI</button>
        <button
          class="btn-sm bg-brand-blue text-light-100 outline outline-brand-blue"
        >
          Upload Excel Files
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { DocumentAddIcon } from "@heroicons/vue/outline";
export default {
  components: {
    DocumentAddIcon,
  },
};
</script>

<style>
</style>