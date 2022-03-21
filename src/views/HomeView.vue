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

      <div class="mt-16 grid gap-10 md:grid-cols-1 xl:grid-cols-3">
        <div
          class="col-span-2 w-full bg-light-100 p-10 shadow-sm overflow-hidden"
        >
          <BarChart :chartData="testData" />
          <div class="grid grid-cols-2 gap-10 py-5 px-20 mt-10">
            <progress-bar
              label="CWTS Graduates"
              count="345"
              percent="60%"
              bgColor="bg-warning-dark"
            />

            <progress-bar
              label="LTS Graduates"
              count="123"
              percent="40%"
              bgColor="bg-error"
            />
          </div>
        </div>
        <div class="flex justify-center bg-light-100">
          <ul class="list-group bg-white border border-light-300 w-full">
            <li
              class="
                flex
                justify-between
                px-6
                py-3
                bg-brand-blue
                text-light-100
              "
            >
              <div class="flex">
                <DocumentTextIcon class="h-5 mr-2" />Recent Applications
              </div>
              <button class="text-xs underline">View all</button>
            </li>
            <list-item
              class="list-item"
              school="Ateneo de Naga University"
              graduates="673"
              program="CWTS"
              date="February 15, 2021"
            ></list-item>
            <list-item
              class="list-item"
              school="Naga College Foundation Inc."
              graduates="123"
              program="LTS"
              date="February 15, 2021"
            ></list-item>
            <list-item
              class="list-item"
              school="University of Nueva Caceres"
              graduates="67"
              program="LTS"
              date="February 15, 2021"
            ></list-item>
            <list-item
              class="list-item"
              school="ACLC College of Daet, Inc."
              graduates="123"
              program="LTS"
              date="February 15, 2021"
            ></list-item>
            <list-item
              class="list-item"
              school="Universidad de Sta Isabel"
              graduates="123"
              program="LTS"
              date="February 15, 2021"
            ></list-item>
            <list-item
              class="list-item"
              school="Bicol State Colege of Applied Sciences and Technology"
              graduates="123"
              program="LTS"
              date="February 15, 2021"
            ></list-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.list-group .list-item:nth-child(odd) {
  background-color: theme("colors.light.200");
}
</style>
<script>
// @ is an alias to /src

import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";
import ProgressBar from "@/partials/ProgressBar.vue";
import ListItem from "@/partials/ListItem.vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import {
  AcademicCapIcon,
  LibraryIcon,
  DocumentTextIcon,
} from "@heroicons/vue/solid";

Chart.register(...registerables);
export default {
  name: "HomeView",
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    LibraryIcon,
    DocumentTextIcon,
    DataCount,
    BarChart,
    ProgressBar,
    ListItem,
  },
  setup() {
    const testData = {
      labels: ["2001-2002", "2002-2003", "2003-2004", "2004-2005", "2005-2006"],
      datasets: [
        {
          label: "CWTS",
          data: [130, 140, 160, 170, 15],
          backgroundColor: ["#FECA84"],
        },
        {
          label: "LTS",
          data: [10, 40, 90, 123, 54],
          backgroundColor: ["#E93B5A"],
        },
      ],
    };

    return { testData };
  },
};
</script>
