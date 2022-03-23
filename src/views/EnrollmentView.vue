<template>
  <div class="hei h-full w-full flex flex-col">
    <!-- render empty state if there is no data found -->
    <!-- <EmptyState /> -->
    <div class="w-full text-center p-10">
      <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        <advanced-widget bgColor="bg-warning-light" textColor="text-warning">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>456k</template>
          <template v-slot:label
            >A/Y {{ year }} {{ sem }} <strong>CWTS</strong> Enrollees</template
          >
          <template v-slot:data>
            <data-count dataCount="123" dataLabel="Male"></data-count>
            <data-count dataCount="456" dataLabel="Female"></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-info-light" textColor="text-info">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>123k</template>
          <template v-slot:label
            >A/Y {{ year }} {{ sem }} <strong>LTS</strong> Enrollees</template
          >
          <template v-slot:data>
            <data-count dataCount="123" dataLabel="Male"></data-count>
            <data-count dataCount="456" dataLabel="Female"></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-success-light" textColor="text-success">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>123k</template>
          <template v-slot:label
            >A/Y {{ year }} {{ sem }} <strong>ROTC</strong> Enrollees</template
          >
          <template v-slot:data>
            <data-count dataCount="123" dataLabel="Male"></data-count>
            <data-count dataCount="456" dataLabel="Female"></data-count>
          </template>
        </advanced-widget>
        <advanced-widget bgColor="bg-error-light" textColor="text-error">
          <template v-slot:icon><AcademicCapIcon class="h-8" /></template>
          <template v-slot:count>123k</template>
          <template v-slot:label
            >A/Y {{ year }} {{ sem }} <strong>Total</strong> Enrollees</template
          >
          <template v-slot:data>
            <data-count dataCount="123" dataLabel="Male"></data-count>
            <data-count dataCount="456" dataLabel="Female"></data-count>
          </template>
        </advanced-widget>
      </div>
    </div>

    <!-- dataTables  -->
    <div>
      <EnrollmentDataTable
        :_selected_year="year"
        @setSemester="setSem($event)"
        @setAcadYear="setYear($event)"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";
// import EmptyState from "@/components/EmptyState.vue";
import { AcademicCapIcon } from "@heroicons/vue/solid";
import EnrollmentDataTable from "@/partials/EnrollmentDataTable.vue";

export default {
  name: "EnrollmentView",
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    EnrollmentDataTable,
    DataCount,
  },
  data() {
    return {
      year: "2021-22",
      sem: "1st Sem",
    };
  },
  mounted() {
    this.setYear(this.year);
  },
  methods: {
    setSem(value) {
      this.sem = value;
    },
    setYear(value) {
      this.year = value;
    },
  },
};
</script>