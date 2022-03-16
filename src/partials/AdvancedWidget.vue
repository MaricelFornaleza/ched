<template>
  <div>
    <div
      class="
        bg-light-100
        p-5
        shadow-sm
        overflow-hidden
        divide-y divide-light-300
      "
    >
      <div class="flex justify-between items-center pb-4">
        <div class="p-4 rounded-full" :class="[bgColor, textColor]">
          <slot name="icon"></slot>
        </div>
        <div class="text-right">
          <p class="mb-2 text-5xl font-black"><slot name="count"></slot></p>

          <p class="mb-2 text-sm text-dark-100">
            <slot name="label"></slot>
          </p>
        </div>
      </div>
      <div
        class="
          border-top
          pt-5
          flex
          justify-around
          divide-x divide-light-300
          text-center
        "
      >
        <slot name="data" class=""></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["bgColor", "textColor"],
};
</script>