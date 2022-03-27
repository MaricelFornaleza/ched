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
            >A/Y {{ year }} <strong>CWTS</strong> Graduates</template
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
            >A/Y {{ year }} <strong>LTS</strong> Graduates</template
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
            >A/Y {{ year }} <strong>ROTC</strong> Graduates</template
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
            >A/Y {{ year }} <strong>Total</strong> Graduates</template
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
      <summary-data-table :objects="objects">
        <template v-slot:button>
          <select
            @change="setYear($event)"
            name="acadyear"
            id="acadyear"
            class="
              text-light-100
              w-full
              px-3
              py-3
              block
              w-full
              rounded-md
              sm:text-sm
              bg-brand-blue
            "
          >
            <option value="2021-22" class="bg-light-100 text-dark-300">
              2021-22
            </option>
            <option value="2020-21" class="bg-light-100 text-dark-300">
              2020-21
            </option>
            <option value="2019-20" class="bg-light-100 text-dark-300">
              2019-20
            </option>
            <option value="2018-19" class="bg-light-100 text-dark-300">
              2018-19
            </option>
          </select>
        </template>
      </summary-data-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";
// import EmptyState from "@/components/EmptyState.vue";
import { AcademicCapIcon } from "@heroicons/vue/solid";

import SummaryDataTable from "@/partials/SummaryDataTable.vue";

export default {
  name: "EnrollmentView",
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    SummaryDataTable,
    DataCount,
  },
  data() {
    return {
      year: "2021-22",

      objects: [
        {
          id: 1,
          hei_name: "Ateneo de Naga University",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
        {
          id: 2,
          hei_name: "Bicol State College of Applied Sciences and Technology",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
        {
          id: 3,
          hei_name: "University of Nueva Caceres",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
        {
          id: 4,
          hei_name: "Naga College Foundation, Inc.",
          cwts: {
            male: 50,
            female: 60,
            total: 110,
          },
          lts: {
            male: 50,
            female: 60,
            total: 110,
          },
          rotc: {
            male: 50,
            female: 60,
            total: 110,
          },
        },
      ],
    };
  },

  methods: {
    setYear(e) {
      this.year = e.target.value;
    },
  },
};
</script>