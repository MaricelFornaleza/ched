<template>
  <div class="home">
    <div class="h-full w-full text-center p-10">
      <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        <advanced-widget bgColor="bg-info-light" textColor="text-info">
          <template v-slot:icon><LibraryIcon class="h-8" /></template>
          <template v-slot:count>123k</template>
          <template v-slot:label>Higher Education Institutions</template>
          <template v-slot:data>
            <data-count dataCount="345" dataLabel="SUC"></data-count>
            <data-count dataCount="45" dataLabel="LUC"></data-count>
            <data-count dataCount="345" dataLabel="Private"></data-count>
            <data-count dataCount="967" dataLabel="OGS"></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-error-light" textColor="text-error">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>456k</template>
          <template v-slot:label>NSTP Graduates</template>
          <template v-slot:data
            ><data-count dataCount="345" dataLabel="CWTS"></data-count>
            <data-count dataCount="45" dataLabel="LTS"></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-warning-light" textColor="text-warning">
          <template v-slot:icon><DocumentTextIcon class="h-8" /></template>
          <template v-slot:count>789k</template>
          <template v-slot:label>Total Applications</template>
          <template v-slot:data
            ><data-count dataCount="345" dataLabel="For Approval"></data-count>
            <data-count dataCount="45" dataLabel="For Revision"></data-count>
            <data-count dataCount="345" dataLabel="Approved"></data-count>
          </template>
        </advanced-widget>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";

import {
  AcademicCapIcon,
  LibraryIcon,
  DocumentTextIcon,
} from "@heroicons/vue/solid";

export default {
  name: "HomeView",
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    LibraryIcon,
    DocumentTextIcon,
    DataCount,
  },
};
</script>
