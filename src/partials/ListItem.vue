<template>
  <div>
    <li class="px-6 py-3 w-full rounded-t-lg flex justify-between">
      <div class="text-left w-3/4">
        <div class="font-bold mb-1 truncate">{{ school }}</div>
        <div class="text-xs flex space-x-3">
          <span>{{ type }} </span> <span>|</span
          ><span :class="variant(status)">{{ status }}</span>
        </div>
      </div>
      <div class="text-xs">{{ date }}</div>
    </li>
  </div>
</template>
<script>
export default {
  props: ["school", "type", "date", "status"],
  methods: {
    variant(status) {
      if (status == "Approved") {
        return "text-success";
      } else if (status == "For Approval") {
        return "text-warning";
      } else if (status == "Rejected") {
        return "text-error";
      } else {
        //Ongoing
        return "text-info";
      }
    },
  },
};
</script>