<template>
	<div class="container w-fit mx-auto flex flex-col items-center justify-center">
		<AlertWidget className="alert-info">
			Please Upload the List of Enrollment for First Semester. Follow the format provided in the Template.&nbsp;
			<router-link to="/#" class="font-bold underline"> Download Template </router-link>
		</AlertWidget>

		<div class="mt-10 w-full">
			<DropZone @drop.prevent="drop" @change="selectedFile" />
			<span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span>
		</div>
		<div class="flex items-center justify-center space-x-5 mt-5">
			<button class="btn-sm btn-default btn-outline" type="button">
				Cancel
			</button>
			<button class="btn-sm btn-default" type="submit">
				Upload
			</button>
		</div>
	</div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import AlertWidget from "@/partials/AlertWidget.vue";
import { ref } from "vue";
export default {
	data() {
		return {
			currentStep: 1,
		}
	},
	components: {
		AlertWidget,
		DropZone,
	},
	setup() {
		let dropzoneFile = ref("");
		const drop = (e) => {
		dropzoneFile.value = e.dataTransfer.files[0];
		};
		const selectedFile = () => {
		dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
		};
		return { dropzoneFile, drop, selectedFile };
	},
	methods: {
		
	},
};
</script>
