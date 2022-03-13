<template>
  <view-layout>
   <div class="application">
    <!-- <div class="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6"> -->
        <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
        <!-- <div class="w-full h-full rounded border-dashed border-2 border-gray-300">
            
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <div class="fields">
                <label>Upload File</label><br/>
                <input 
                  type="file"
                  ref="file"
                  @change="onSelect"
                />
              </div>
              <div class="fields">
                <button class="
                  btn-sm
                  bg-brand-blue
                  mt-10
                  text-light-100
                  uppercase
                  ">
                  Upload
                </button>
              </div>
              <div class="message">
                <h5>{{message}}</h5>
              </div>
            </form>
        </div> -->

        <!-- component -->
        <!-- <form @submit.prevent="onSubmit" enctype="multipart/form-data">

          <div class="w-full rounded border-2 border-dashed border-gray-500 relative">
            <div class="fields">
              <input type="file" ref="file" @change="onSelect" multiple class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50">
              <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                  <h4>
                      Browse or drag and drop a file
                  </h4>
                  <p class="">Must be .xlsx file using the template provided.</p>
              </div>
            </div>
          </div>

          <div class="fields">
            <button class="
              btn-sm
              bg-light-100
              mt-10
              text-dark-100
              uppercase
              mr-10">
              Cancel
            </button>

            <button class="
              btn-sm
              bg-brand-blue
              mt-10
              text-light-100
              uppercase">
              Upload
            </button>
          </div>
          
        </form> -->

    <!-- </div> -->
    

    <div class="relative items-center w-full">
      <!-- <div class="grid grid-cols-1 "> -->
        <div class="w-full py-12 mx-auto bg-light-100 shadow-xl rounded-xl">
          
          <div class="md:mx-12 lg:mx-24 space-y-2">
            <div class="flex items-center justify-center w-full">
                <label class="flex flex-col border-dark-100 rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  cursor-pointer">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg> -->
                        <DocumentAddIcon class="h-20 " />
                        <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        
                        </div>
                        <p class="pointer-none text-2xl ">
                          <!-- <span href="#" id="" class="font-bold underline hover:text-brand-blue">Browse</span> or drag and drop a file  -->
                          <input id="hidden-input" type="file" multiple class="hidden" />
                          <button id="button" class="font-bold underline hover:text-brand-blue outline-none">
                            Browse
                          </button>
                          or drag and drop a file
                          <br />
                          <span class="text-dark-200 text-lg">Must be .xlsx file using the template provided.</span>
                        </p>
                    </div>
                    <input type="file" class="hidden">
                </label>
            </div>
          </div>

        </div>
      <!-- </div> -->
    </div>

  </div>
  </view-layout>
</template>

<script>
// @ is an alias to /src
import {
  DocumentAddIcon,
} from "@heroicons/vue/outline";
import ViewLayout from "@/layout/ViewLayout.vue";

export default {
  name: "ApplicationView",
  components: {
    DocumentAddIcon,
    ViewLayout,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.has-mask {
  position: absolute;
  clip: rect(10px, 150px, 130px, 10px);
}
</style>
