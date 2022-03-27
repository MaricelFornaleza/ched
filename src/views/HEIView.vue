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
      <VueDataTable />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import SimpleWidget from "@/partials/SimpleWidget.vue";
import EmptyState from "@/components/EmptyState.vue";
import { LibraryIcon } from "@heroicons/vue/solid";
import VueDataTable from "@/partials/VueDataTable.vue";

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
  },
};
</script>