<template>
  <div>
    <li class="px-6 py-3 w-full rounded-t-lg flex justify-between">
      <div class="text-left w-3/4">
        <div class="font-bold mb-1 truncate">{{ school }}</div>
        <div class="text-xs">{{ type }}</div>
      </div>
      <div class="text-xs">{{ date }}</div>
    </li>
  </div>
</template>
<script>
export default {
  props: ["school", "type", "date"],
};
</script>