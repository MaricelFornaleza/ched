<template>
  <div class="p-10">
    <div class="">
      <div class="flex justify-end space-x-5 mb-5">
        <select
          v-if="monthly"
          name="month"
          id="month"
          class="
            text-light-100
            px-3
            py-3
            block
            rounded-md
            sm:text-sm
            bg-brand-blue
          "
        >
          <option
            v-for="month in months"
            :key="month"
            value="{{month}}"
            class="bg-light-100 text-dark-300"
          >
            {{ month }}
          </option>
        </select>
        <select
          v-if="!monthly"
          name="year"
          id="year"
          class="
            text-light-100
            px-3
            py-3
            block
            rounded-md
            sm:text-sm
            bg-brand-blue
          "
        >
          <option
            v-for="year in years"
            :key="year"
            value="{{year}}"
            class="bg-light-100 text-dark-300"
          >
            {{ year }}
          </option>
        </select>
        <div class="inline-flex">
          <button
            @click="setToMonth"
            class="
              transition
              duration-200
              hover:bg-dark-100 hover:border-dark-100
              font-bold
              py-2
              px-4
              rounded-l-lg
            "
            :class="
              monthly
                ? ' bg-dark-200 text-light-100 border border-2 border-dark-200'
                : 'bg-transparent border border-2 border-dark-200   hover:text-light-100'
            "
          >
            Monthly
          </button>
          <button
            @click="setToMonth"
            class="
              transition
              duration-200
              border border-2 border-dark-200
              hover:bg-dark-100 hover:border-dark-100 hover:text-light-100
              font-bold
              py-2
              px-4
              rounded-r-lg
            "
            :class="monthly ? '' : ' bg-dark-200 text-light-100'"
          >
            Annual
          </button>
        </div>
      </div>
    </div>

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
    <div
      class="
        col-span-2
        w-full
        bg-light-100
        p-10
        mt-10
        shadow-sm
        overflow-hidden
      "
    >
      <div class="flex justify-between mb-3 items-center">
        <div class="text-left">
          <div class="font-bold text-lg">NSTP Graudates</div>
          <div class="text-sm text-dark-100">Academic Year 2001-2011</div>
        </div>
        <button class="bg-info p-2 rounded text-light-100 h-fit">
          <DownloadIcon class="h-4" />
        </button>
      </div>
      <BarChart :chartData="testData" :options="options" />
      <div class="grid grid-cols-3 gap-10 py-5 px-20 mt-10">
        <progress-bar
          label="For Approval"
          count="345"
          total="1000"
          bgColor="bg-warning-dark"
        />

        <progress-bar
          label="For Revision"
          count="123"
          total="1000"
          bgColor="bg-error"
        />
        <progress-bar
          label="Approved"
          count="456"
          total="1000"
          bgColor="bg-success-dark"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdvancedWidget from "@/partials/AdvancedWidget.vue";
import DataCount from "@/partials/DataCount.vue";
import ProgressBar from "@/partials/ProgressBar.vue";
import { ref } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import {
  AcademicCapIcon,
  LibraryIcon,
  DocumentTextIcon,
  DownloadIcon,
} from "@heroicons/vue/solid";
Chart.register(...registerables);
export default {
  components: {
    AdvancedWidget,
    AcademicCapIcon,
    LibraryIcon,
    DocumentTextIcon,
    DownloadIcon,
    DataCount,
    BarChart,
    ProgressBar,
  },
  data() {
    return {
      monthly: true,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        2022,
      ],
    };
  },
  methods: {
    setToMonth() {
      this.monthly = !this.monthly;
    },
  },

  setup() {
    const testData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "For Approval",
          data: [130, 140, 160, 170, 15, 10, 40, 90, 123, 54, 54, 54],
          backgroundColor: ["#FECA84"],
        },
        {
          label: "For Revision",
          data: [10, 40, 90, 123, 54, 130, 140, 160, 170, 15, 15, 15],
          backgroundColor: ["#FF5C5C"],
        },
        {
          label: "Approved",
          data: [130, 140, 160, 170, 15, 10, 40, 90, 123, 54, 54, 54],
          backgroundColor: ["#47D28F"],
        },
      ],
    };

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    });

    return { testData, options };
  },
};
</script>

<style>
</style>