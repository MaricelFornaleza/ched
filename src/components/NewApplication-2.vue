<template>
	<div class="p-10">
		<div
			class="
			mt-10
			border border-1 border-light-300
			shadow-sm
			p-10
			bg-light-100
			w-full
			flex flex-col
			justify-center"
		>
			<div class="container mx-auto">
			<div class="flex flex-wrap -m-4 text-center">
				<div class="p-4 md:w-1/4 sm:w-1/2 w-full">
					<div class="border-2 border-light-400 px-4 py-6 rounded-lg">
						<div>STEP 1</div>
					</div>
				<!-- <div class="border-2 border-light-400 px-2 py-6 rounded-lg w-full">
					<div class="flex flex-wrap">
						<div class="flex-shrink-0 w-10 h-10 mr-2 rounded-full border border-1 border-brand-blue inline-flex items-center justify-center">
							<span class="text-brand-blue font-medium">1</span>
						</div>
						<div class="flex flex-col">
							<div class="font-bold text-xs text-brand-blue">STEP 1</div>
							<div class="font-bold text-xs text-brand-blue">Enrollment for 1st Semester</div>
						</div>
						
					</div>
				</div> -->
				</div>
				<div class="p-4 md:w-1/4 sm:w-1/2 w-full">
				<div class="border-2 border-light-400 px-4 py-6 rounded-lg">
					<div>STEP 2</div>
				</div>
				</div>
				<div class="p-4 md:w-1/4 sm:w-1/2 w-full">
				<div class="border-2 border-light-400 px-4 py-6 rounded-lg">
					<div>STEP 3</div>
				</div>
				</div>
				<div class="p-4 md:w-1/4 sm:w-1/2 w-full">
				<div class="border-2 border-light-400 px-4 py-6 rounded-lg">
					<div>STEP 4</div>
				</div>
				</div>
			</div>
			</div>

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
