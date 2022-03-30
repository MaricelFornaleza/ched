<template>
	<div v-if="!completed" class="container w-fit mx-auto flex flex-col items-center justify-center">
		<AlertWidget :className="className">
			Please Upload the List of Enrollment for First Semester. Follow the format provided in the Template.&nbsp;
			<router-link to="/#" class="font-bold underline"> Download Template </router-link>
		</AlertWidget>

		<div v-if="dropzoneFile === ''" class="mt-10 w-full">
			<DropZone @drop.prevent="drop" @change="selectedFile"/>
			<!-- <span class="text-xs font-bold">File: {{ dropzoneFile.name }}</span> -->
		</div>

		<div v-else class="my-20 w-fit flex justify-between p-5 border border-light-300">
			<div class="flex space-x-5">
			<img
				src="@/assets/img/pdf.png"
				class="h-8"
				alt="PDF Icon by Dimitry Miroliubov"
			/>
			<div class="text-base">{{ dropzoneFile.name }}</div>
			</div>
		</div>

		<div class="flex items-center justify-center space-x-5 mt-5">
			<button
			@click="$emit('previousStep')"
			class="btn-sm btn-default btn-outline"
			type="button"
			>
			Cancel
			</button>
			<button
			v-if="!completed"
			@click="upload(1)"
			class="btn-sm btn-default"
			type="submit"
			>
			Upload
			</button>
		</div>
	</div>

	<div v-else class="container w-fit mx-auto flex flex-col items-center justify-center">
		<AlertWidget className="alert-success">
		The list for the 1st semester was successfully uploaded. An Acknowledgement letter was sent to the email address.
		</AlertWidget>
		
		<div class="grid grid-cols-3 gap-20 mt-6 mb-4">
			<div class="flex flex-col items-center">
				<h2 class="">68</h2>
				<p class="uppercase">female</p>
			</div>
			<div class="flex flex-col items-center">
				<h2 class="">120</h2>
				<p class="uppercase">male</p>
			</div>
			<div class="flex flex-col items-center">
				<h2 class="">188</h2>
				<p class="uppercase">total</p>
			</div>
		</div>

		<!-- pass props lists -->
		<StudentsDataTable />

		<div class="flex items-center justify-center space-x-5 mt-5">
			<button
				@click="$emit('previousStep')"
				class="btn-sm btn-default btn-outline"
				type="button"
			>
				Cancel
			</button>

			<button @click="nextStep()" class="btn-sm btn-default" type="submit">
				Next
			</button>
		</div>
    </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import AlertWidget from "@/partials/AlertWidget.vue";
// import { EyeIcon, DownloadIcon } from "@heroicons/vue/outline";
import { ref } from "vue";
// import Parse from 'parse';
import StudentsDataTable from "@/partials/StudentsDataTable.vue";

export default {
	data() {
		return {
			completed: false,
			className: 'alert-info',
		}
	},
	components: {
		AlertWidget,
		DropZone,
		StudentsDataTable
		// EyeIcon,
		// DownloadIcon
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
		upload(step) {
			if(this.dropzoneFile === '') {
				this.className = "alert-error";
			} else {
				alert(`Submitted Files:\n${this.dropzoneFile.name}`);
				// console.log(this.dropzoneFile);

				// // const Parse = require('parse');
				// const parseFile = new Parse.File(this.dropzoneFile.name.toString().toTrim(), this.dropzoneFile);
				// parseFile.save().then(function() {
				// 	// The file has been saved to Parse.
				// 	var Application = new Parse.Object("Application");
				// 	Application.set("user", "Joe Smith");
				// 	Application.set("applicantResumeFile", parseFile);
				// 	Application.save();

				// 	console.log("File has been uploaded!");
				// }, function(error) {
				// 	// The file either could not be read, or could not be saved to Parse.
				// 	console.log("Error: " + error);
				// });

				this.$emit("complete", step);
				this.completed = !this.completed;
			}
		},
		nextStep() {
			this.$emit("nextStep");
		},
	},
};
</script>