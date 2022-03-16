<template>
  <div class="application">
   
    <!-- <div
      class="
        w-3/5
        m-auto
        mt-20
        py-10
        flex flex-col
        justify-center
        items-center
        space-y-5
        border border-4 border-dashed border-dark-100
        rounded-md
      "
    >
      <span><DocumentAddIcon class="h-14 text-dark-100 " /></span>
      <span class="text-dark-300 font-medium text-4xl ">
        No Applications
      </span>
      <span class="body-l text-dark-200">
        Get started by creating a new application
      </span>

      <div class="flex gap-10 mt-10">
        <button class="btn-sm outline outline-brand-blue">New HEI</button>
        <button
          class="btn-sm bg-brand-blue text-light-100 outline outline-brand-blue"
        >
          Upload Excel Files
        </button>
      </div>
    </div> -->

    <EmptyState v-bind="state"/>

  </div>
</template>

<script>
// @ is an alias to /src
// import {
//   DocumentAddIcon,
// } from "@heroicons/vue/outline";
// import Parse from 'parse'; 
import EmptyState from "@/components/EmptyState.vue";

export default {
  name: "ApplicationView",
  data() {
    return {
      state: {
        title: "Applications",
        label: "Get started by creating a new application",
        rightBtnName:"For Additional Graduates",
        href:"#"
      },
      file: "",
      message: ""
    }
  },
  // methods: { 
    // handleFileUpload( event ){
		// 		this.file = event.target.files[0];
    //     this.message= "IN!";
		// },
    // submitFile() {
    //   alert(`Submitted Files:\n${this.file.name}`);
    //   console.log(this.file);
      
    //   const Parse = require('parse');
    //   const parseFile = new Parse.File(this.file.name.toString(), this.file);
    //   parseFile.save().then(function() {
    //     // The file has been saved to Parse.
    //     console.log("File has been uploaded!");
    //   }, function(error) {
    //     // The file either could not be read, or could not be saved to Parse.
    //     console.log("Error: " + error);
    //   });
    // }
  // },
  components: {
    // DocumentAddIcon,
    EmptyState
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  <div class="flex">
    <div class="stepper z-50 active">Step 1</div>
    <div class="stepper z-40">Step 2</div>
    <div class="stepper z-30">Step 3</div>
    <div class="stepper z-20 active">Step 4</div>
    <div class="stepper z-10">Step 5</div>
  </div>
</template>
<style>
.stepper {
  position: relative;
  width: 200px;
  height: 60px;
  margin-left: 0;
  color: theme("colors.dark.300");
  background-color: theme("colors.light.100");
  text-align: center;
  line-height: 60px;
}
.active {
  background-color: theme("colors.dark.100") !important;
  color: theme("colors.light.100");
}
.active:after {
  border-left: 20px solid theme("colors.dark.100") !important;
}

.stepper:after {
  content: "";
  position: absolute;
  left: 100%;
  top: 0px;
  width: 0px;
  height: 0px;
  border-top: 30px solid transparent;

  border-left: 20px solid theme("colors.light.100");
  border-bottom: 30px solid transparent;
}
.stepper:nth-of-type(5)::after {
  border-left: 0px;
}
</style>
