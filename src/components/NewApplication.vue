<template>
  <div class="relative items-center w-full">
        <div 
          class="
            w-full 
            py-12 
            mx-auto 
            bg-light-100 
            rounded-xl
          "
        >
          
          <div 
            class="
              md:mx-12 
              lg:mx-24 
              space-y-2
            "
          >
            <div 
              class="
                flex 
                items-center 
                justify-center 
                w-full
              "
            >
                <label 
                  class="
                    flex 
                    flex-col 
                    border-dark-100 rounded-lg border-4 border-dashed 
                    w-full 
                    h-60 
                    p-10 
                    group 
                    text-center
                  "
                >
                    <div 
                      class="
                        h-full 
                        w-full 
                        text-center 
                        flex flex-col 
                        items-center 
                        justify-center
                        cursor-pointer
                      "
                    >
                        <DocumentAddIcon class="h-20 mb-5" />
                        <p class="pointer-none text-2xl ">
                          <!-- <span href="#" id="" class="font-bold underline hover:text-brand-blue">Browse</span> or drag and drop a file  -->
                          <!-- <input id="hidden-input" type="file" class="hidden" /> -->
                          <!-- <button id="button" class="font-bold underline hover:text-brand-blue outline-none">
                            Browse
                          </button> -->
                          or drag and drop a file
                          <br />
                          <span class="text-dark-200 text-lg">Must be .xlsx file using the template provided.</span>
                        </p>
                    </div>
                    <input type="file" class="hidden" @change="handleFileUpload($event)" >
                </label>
                <br />
                <div class="mt-4">
                  <button type="button"
                    class="
                      btn-sm
                      border-2 
                      border-dark-200 
                      text-dark-200 
                      font-semibold 
                      leading-tight 
                      uppercase
                      rounded
                      hover:bg-dark-400 
                      hover:bg-opacity-5 
                      focus:outline-none 
                      focus:ring-0 
                      transition 
                      duration-150 
                      ease-in-out
                    "
                  >
                      Cancel
                    </button>

                    <button v-on:click="submitFile()" 
                      class="
                        btn-sm
                        bg-brand-blue  
                        text-light-100 
                        font-medium  
                        uppercase 
                        rounded 
                        shadow-md 
                        hover:bg-brand-blue
                        hover:bg-opacity-4 
                        hover:shadow-lg 
                        focus:bg-brand-blue  
                        focus:shadow-lg 
                        focus:outline-none 
                        focus:ring-0 
                        active:bg-blue-800 
                        active:shadow-lg 
                        transition 
                        duration-150 
                        ease-in-out
                      "
                    >
                    Upload
                  </button>
                </div>
            </div>
          </div>

        </div>
    </div>
</template>
<script>
import { DocumentAddIcon, } from "@heroicons/vue/outline";
export default {
  components: {
    DocumentAddIcon,
  },
  methods: { 
    handleFileUpload( event ){
				this.file = event.target.files[0];
        this.message= "IN!";
		},
    submitFile() {
      alert(`Submitted Files:\n${this.file.name}`);
      console.log(this.file);
      
      const Parse = require('parse');
      const parseFile = new Parse.File(this.file.name.toString(), this.file);
      parseFile.save().then(function() {
        // The file has been saved to Parse.
        console.log("File has been uploaded!");
      }, function(error) {
        // The file either could not be read, or could not be saved to Parse.
        console.log("Error: " + error);
      });
    }
  },
};
</script>
