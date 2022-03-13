<template>
  <div class="w-full">
    <p class="text-2xl font-bold">{{ dataCount }}</p>
    <p class="label-xs text-dark-100 uppercase">{{ dataLabel }}</p>
  </div>
</template>
<script>
export default {
  props: ["dataCount", "dataLabel"],
};
</script>