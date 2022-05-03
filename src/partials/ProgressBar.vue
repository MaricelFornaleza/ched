<template>
  <div>
    <div class="text-center flex flex-col space-y-1">
      <p class="text-xs">{{ label }}</p>
      <p class="text-base font-bold">
        {{ count }} ({{ computedPercent.toFixed(2) }}%)
      </p>
      <div class="w-full bg-light-300 h-1 rounded">
        <div class="h-1 rounded" :class="bgColor" :style="width"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bgColor", "label", "count", "total"],
  computed: {
    width() {
      return {
        width: this.computedPercent + "%",
      };
    },
    computedPercent() {
      if (this.total == 0) {
        return 0;
      } else {
        return (this.count / this.total) * 100;
      }
    },
  },
};
</script>