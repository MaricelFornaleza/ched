<template>
	<div class="px-10 py-5">
		<span class="font-medium mt-10 px-1 text-left uppercase">
			{{hei}}
		</span>
		<div
			class="
			mt-2
			border border-1 border-light-300
			shadow-sm
			p-5
			bg-light-100
			w-full
			flex flex-col
			justify-center"
		>
			<StepperWidget :steps="steps" :current="currentStep" />

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
import StepperWidget from "@/partials/StepperWidget.vue";
import router from '../router'
import { ref } from "vue";

export default {
	data() {
		return {
			hei: '',
			currentStep: 1,
			steps: [
				{ no: 1, title: "Enrollment for 1st Semester", completed: false },
				{ no: 2, title: "Enrollment for 2nd Semester", completed: false },
				{ no: 3, title: "List of Graduates", completed: false },
				{ no: 4, title: "Application for Approval", completed: false },
				{ no: 5, title: "Application Complete", completed: false },
			],
		}
	},
	created() {
		this.hei = this.$route.query.hei;
	},
	components: {
		AlertWidget,
		DropZone,
		StepperWidget
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
		update(step) {
			// router.push({ name: "newApplication2", query: { hei: this.value, step: step } });
		}
	},
};
</script>
