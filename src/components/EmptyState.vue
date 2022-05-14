<template>
  <div class="my-auto">
    <div
      class="
        w-full
        m-auto
        mt-20
        px-4
        py-10
        flex flex-col
        justify-center
        items-center
        rounded-md
        text-center
      "
    >
      <img :src="NoDataFound" alt="" class="h-60 mb-10 pr-4" />

      <slot></slot>
    </div>

    <!-- <ModalHei id="modal" v-show="visible" :list="HEIs" /> -->
  </div>
</template>

<script>
import NoDataFound from "@/assets/img/NoDataFound.svg";
export default {
  name: "EmptyState",
  data() {
    return {
      NoDataFound,
    };
  },
  components: {},
};
</script>