<template>
  <div
    class="
      m-auto mt-20
      border border-1 border-light-300
      shadow-sm
      px-10 py-10
      bg-light-100
      w-4/5
      flex flex-col
      justify-center
    "
  >
    <!-- <div class="breadcrumb flat">
			<a href="#" class="active">STEP 1</a>
			<a href="#">STEP 2</a>
			<a href="#">STEP 3</a>
			<a href="#">STEP 4</a>
			<a href="#">STEP 5</a>
		</div>
	</div> -->
    
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
		<AlertWidget :msg="msg" :className="className" :href="href" />

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

	<!-- <div class="w-full arrow-steps">
		<div class="step current"> <span> <a href="#" >1</a></span> </div>
		<div class="step"> <span><a href="#" >2</a></span> </div>
		<div class="step"> <span><a href="#" >3</a></span> </div>
		<div class="step"> <span><a href="#" >4</a></span> </div>
		<div class="step"> <span><a href="#" >5</a></span> </div>
	</div> -->

  </div>
</template>

<script>
import DropZone from "@/partials/DropZone.vue";
import AlertWidget from "@/partials/AlertWidget.vue";
import { ref } from "vue";
export default {
	data() {
		return {
			msg: "Please upload the List of Enrollment for 1st Semester. ",
			className: "alert-info",
			href: { link: "href"},
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

<style scoped>

.clearfix:after {
	clear: both;
	content: "";
	display: block;
	height: 0;
}
.arrow-steps .step {
	font-size: 14px;
	text-align: center;
	color: #777;
	cursor: default;
	margin: 0 1px 0 0;
	padding: 10px 0px 10px 0px;
	width: 15%;
	float: left;
	position: relative;
	background-color: #ddd;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.arrow-steps .step a {
	color: #777;
	text-decoration: none;
}

.arrow-steps .step:after,
.arrow-steps .step:before {
	content: "";
	position: absolute;
	top: 0;
	right: -17px;
	width: 0;
	height: 0;
	border-top: 21px solid transparent;
	border-bottom: 20px solid transparent;
	border-left: 17px solid #ddd;
	z-index: 2;
}

.arrow-steps .step:before {
	right: auto;
	left: 0;
	border-left: 17px solid #fff;
	z-index: 0;
}

.arrow-steps .step:first-child:before {
	border: none;
}

.arrow-steps .step:last-child:after {
	border: none;
}

.arrow-steps .step:first-child {
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

.arrow-steps .step:last-child {
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}

.arrow-steps .step span {
	position: relative;
}

*.arrow-steps .step.done span:before {
	opacity: 1;
	content: "";
	position: absolute;
	top: -2px;
	left: -10px;
	font-size: 11px;
	line-height: 21px;
}

.arrow-steps .step.current {
	color: #fff;
	background-color: #5599e5;
}

.arrow-steps .step.current a {
	color: #fff;
	text-decoration: none;
}

.arrow-steps .step.current:after {
	border-left: 17px solid #5599e5;
}

.arrow-steps .step.done {
	color: #173352;
	background-color: #2f69aa;
}

.arrow-steps .step.done a {
	color: #173352;
	text-decoration: none;
}

.arrow-steps .step.done:after {
	border-left: 17px solid #2f69aa;
}
</style>
