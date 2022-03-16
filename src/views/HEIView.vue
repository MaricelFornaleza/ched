<template>
  <view-layout>
    <div class="hei h-full w-full flex flex-col">
      <!-- render empty state if there is no data found -->
      <!-- <EmptyState /> -->
      <div class="w-full text-center p-10">
        <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <simple-widget bgColor="bg-warning-light" textColor="text-warning">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>State Universities and Colleges</template>
          </simple-widget>
          <simple-widget bgColor="bg-info-light" textColor="text-info">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>Local Universities and Colleges</template>
          </simple-widget>
          <simple-widget bgColor="bg-success-light" textColor="text-success">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>Private</template>
          </simple-widget>
          <simple-widget bgColor="bg-error-light" textColor="text-error">
            <template v-slot:icon><LibraryIcon class="h-8" /></template>
            <template v-slot:count>123k</template>
            <template v-slot:label>Other Government Schools</template>
          </simple-widget>
        </div>
      </div>

      <!-- dataTables  -->
      <div>
        <VueDataTable />
      </div>
    </div>
  </view-layout>
</template>

<script>
// @ is an alias to /src

import ViewLayout from "@/layout/ViewLayout.vue";
import SimpleWidget from "@/partials/SimpleWidget.vue";
// import EmptyState from "@/components/EmptyState.vue";
import { LibraryIcon } from "@heroicons/vue/solid";
import VueDataTable from "@/partials/VueDataTable.vue";

export default {
  name: "HEIView",
  components: {
    ViewLayout,
    SimpleWidget,
    LibraryIcon,
    VueDataTable,
  },
};
</script>