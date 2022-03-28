<template>
  <!-- When hei is empty -->
	<div v-if="empty == true">
		<EmptyState>
			<p class="text-4xl font-medium text-dark-300">No Heis</p>
			<p class="body-l text-dark-200">Get started by creating a new hei</p>
			<div class="px-4 mb-4 py-3 sm:px-6 sm:grid sm:grid-cols-2 sm:gap-4">
				<router-link to="/hei/new">
          <p class="inline-flex btn-sm btn-outline w-full justify-center items-center sm:mb-0 mb-4">
            New Hei
          </p>
				</router-link>
				<router-link to="/hei/upload">
					<p class="inline-flex btn-sm btn-default w-full justify-center items-center">
						Upload Hei
					</p>
				</router-link>
			</div>
		</EmptyState>
	</div>


  <!-- When hei is not empty -->
  <div class="hei h-full w-full flex flex-col" v-else>
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
      <vue-data-table :heis="heis" :table_headers="table_headers">
        <template v-slot:button>
          <div class="flex flex-col">
            <button
              id="dropdownButton"
              @click="dropdownToggle()"
              class="
                w-fit
                ml-auto
                text-light-100
                bg-brand-blue
                hover:bg-blue-800
                focus:ring-4 focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-4
                py-2.5
                text-center
                inline-flex
                items-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
              type="button"
            >
              Add HEI
              <ChevronDownIcon class="ml-2 h-5" />
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="dropdown"
              class="
                z-10
                w-auto
                text-base
                list-none
                bg-light-100
                rounded
                divide-y divide-gray-100
                shadow
                dark:bg-gray-700
              "
            >
              <ul class="py-1" aria-labelledby="dropdownButton">
                <li>
                  <router-link to="/hei/new"
                    ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                      New HEI
                    </p></router-link
                  >
                </li>
                <li>
                  <router-link to="/hei/upload"
                    ><p class="block py-2 px-4 text-sm hover:bg-light-300">
                      Upload Excel File
                    </p></router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </template>
      </vue-data-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import SimpleWidget from "@/partials/SimpleWidget.vue";
import EmptyState from "@/components/EmptyState.vue";
import { LibraryIcon } from "@heroicons/vue/solid";
import VueDataTable from "@/partials/VueDataTable.vue";
import { ChevronDownIcon } from "@heroicons/vue/outline";
export default {
  name: "HEIView",
  data () {
    return  {
      empty: true,
    }
  },
  components: {
    EmptyState,
    SimpleWidget,
    LibraryIcon,
    VueDataTable,

    ChevronDownIcon,
  },
  data() {
    return {
      dropdown: false,
      table_headers: [
        { title: "Institutional Code" },
        { title: "HEI Name" },
        { title: "Type" },
        { title: "Email" },
      ],
      heis: [
        {
          institutional_code: 1,
          hei_name: "Ateneo de Naga University",
          hei_type: "Private",
          email: "areneo@gbox.adnu.edu.ph",
        },
        {
          institutional_code: 2,
          hei_name: "Bicol University - Main Campus",
          hei_type: "SUC",
          email: "areneo@gbox.adnu.edu.ph",
        },
        {
          institutional_code: 3,
          hei_name: "Bicol University - Main Campus",
          hei_type: "Private",
          email: "areneo@gbox.adnu.edu.ph",
        },
        {
          institutional_code: 4,
          hei_name: "Bicol University - Main Campus",
          hei_type: "Private",
          email: "areneo@gbox.adnu.edu.ph",
        },
      ],
    };
  },
  methods: {
    dropdownToggle() {
      this.dropdown = !this.dropdown;
    },
  },
};
</script>