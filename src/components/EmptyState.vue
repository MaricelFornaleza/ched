<template>
  <div class="my-auto">
    <div
      class="
        w-3/5
        m-auto
        mt-20
        py-10
        flex flex-col
        justify-center
        items-center
        space-y-5
        border border-4 border-dashed border-dark-100
        rounded-md
      "
    >
      <DocumentAddIcon class="h-24 text-dark-100 mb-5" />
      <p class="text-4xl font-medium text-dark-300">No {{ title }} </p>
      <p class="body-l text-dark-200">{{ label }}</p>
      <div class="flex gap-10 pt-5">
        <button 
          class="
            btn-sm 
            font-semibold 
            outline outline-1 active:outline-2 outline-brand-blue 
            hover:ring-4 
            focus:ring-blue-300
            "
          >
           New {{ title }}
        </button>
        <button
          class="
            btn-sm 
            bg-brand-blue 
            font-semibold 
            text-light-100 
            outline outline-1 outline-brand-blue
            hover:ring-4
            focus:ring-blue-300
            "
          >
          {{ rightBtnName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { DocumentAddIcon } from "@heroicons/vue/outline";
export default {
  name: "EmptyState",
  props: {
    title: String,
    label: String,
    rightBtnName: String,
    href: String,
  },
  components: {
    DocumentAddIcon,
  },
};
</script>

<style>
</style>