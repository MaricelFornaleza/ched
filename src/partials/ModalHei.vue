<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
	<div class="fixed z-20 py-2 inset-0 overflow-y-auto overflow-visible" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
			<!--
			Background overlay, show/hide based on modal state.

			Entering: "ease-out duration-300"
				From: "opacity-0"
				To: "opacity-100"
			Leaving: "ease-in duration-200"
				From: "opacity-100"
				To: "opacity-0"
			-->
			<div class="fixed inset-0 bg-dark-400 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

			<!-- This element is to trick the browser into centering the modal contents. -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

			<!--
			Modal panel, show/hide based on modal state.

			Entering: "ease-out duration-300"
				From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				To: "opacity-100 translate-y-0 sm:scale-100"
			Leaving: "ease-in duration-200"
				From: "opacity-100 translate-y-0 sm:scale-100"
				To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			-->
			<div class="relative inline-block align-bottom bg-light-100 rounded-md text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-light-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="mt-3 text-center sm:mt-0 sm:text-center">
                        <h3 class="h1 leading-6 font-bold text-dark-400" id="modal-title">Select HEI</h3>
                        <div class="mt-8">
                            <Select2 v-model="value" :options="lists" 
                                :settings="{ width: '100%', placeholder: 'Select' }" /> 
                                <!-- @change="myChangeEvent($event)" @select="mySelectEvent($event)" -->
                        </div>
                    </div>
                </div>
                <div class="bg-light-100 px-4 mb-4 py-4 sm:px-6">
                    <button type="button" @click="nextPage()" class="w-full inline-flex justify-center btn-sm btn-default sm:ml-3 sm:w-auto sm:text-sm">Select</button>
                    <button type="button"  @click="$emit('close')" class="mt-3 w-full justify-center inline-flex btn-sm btn-outline sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm">Cancel</button>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
// import { SearchIcon } from "@heroicons/vue/outline";
 import router from '../router'
import Select2 from 'vue3-select2-component';

export default {
    name: "ModalHei",
    data () {
        return {
            results: false,
            value: '',
            placeholder: "Select"
        }
    },
    props: {
        lists: Array,
    },
    components: {
        // SearchIcon,
        Select2 
    },
    methods: {
        nextPage() {
            router.push({ name: "newApplication1", query: { hei: this.value } });
        },
        myChangeEvent(val){
            console.log(val);
        },
        mySelectEvent({id, text}){
            console.log({id, text})
        }
    }
};
</script>

