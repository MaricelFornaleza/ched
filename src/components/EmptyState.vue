<template>
  <div class="my-auto">
    <div
      class="
        w-3/5
        m-auto
        mt-20
        px-4 py-10
        flex flex-col
        justify-center
        items-center
        space-y-5
        border-4 border-dashed border-dark-100
        rounded-md
      "
    >
      <DocumentAddIcon class="h-24 text-dark-100 mb-5" />
      <slot></slot>
    </div>

    <!-- <ModalHei id="modal" v-show="visible" :list="HEIs" /> -->
  </div>
</template>

<script>
import { DocumentAddIcon } from "@heroicons/vue/outline";
export default {
  name: "EmptyState",
  components: {
    DocumentAddIcon,
  },
};
</script>