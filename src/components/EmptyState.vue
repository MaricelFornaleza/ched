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
        border-4 border-dashed border-dark-100
        rounded-md
      "
    >
      <DocumentAddIcon class="h-24 text-dark-100 mb-5" />
      <p class="text-4xl font-medium text-dark-300">No {{ title }} </p>
      <p class="body-l text-dark-200">{{ label }}</p>
      <div class="flex gap-10 pt-5">
        <a :href="leftBtn.link" class="btn-sm btn-default btn-outline" >
          {{ leftBtn.name }}
        </a>
        <a :href="rightBtn.link" class="btn-sm btn-default">
          {{ rightBtn.name }}
        </a>
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
    leftBtn: Object,
    rightBtn: Object,
  },
  components: {
    DocumentAddIcon,
  },
};
</script>

<style>
</style>