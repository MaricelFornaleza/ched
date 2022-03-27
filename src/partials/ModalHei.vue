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
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                        <h3 class="h1 leading-6 font-bold text-dark-400" id="modal-title">Select HEI</h3>
                        <div class="mt-8">
                            <label class="relative block">
                                <span class="sr-only">Search</span>
                                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <SearchIcon class="mr-2 h-5 w-5 text-dark-100" />
                                </span>
                                <input id="dropdownSearch" class="
                                    placeholder:italic 
                                    placeholder:text-slate-400 
                                    block w-full 
                                    border border-dark-100 
                                    rounded-md 
                                    py-2 pl-9 pr-3 
                                    shadow-sm 
                                    focus:outline-none focus:border-brand-blue focus:ring-brand-blue focus:ring-1 
                                    sm:text-sm" 
                                    placeholder="Search ..." type="text" name="search
                                "
                                @click="searchResults()"
                                />
                                <!-- Dropdown menu -->
                                <div v-show="results"
                                    class="z-20 absolute overflow-y-auto overflow-visible w-full text-base text-left list-none bg-light-100 rounded divide-y divide-light-100 shadow mdark:bg-light-400"
                                >
                                <ul class="py-1" aria-labelledby="dropdownSearch">
                                    <li v-for="(list,index) in lists" :key="index">
                                        <router-link to="/application/new/">
                                            <p class="block py-2 px-4 text-sm hover:bg-light-300">
                                                {{ list }}
                                            </p>
                                        </router-link>
                                    </li>
                                </ul>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="bg-light-100 px-4 mb-4 py-4 sm:px-6">
                    <button type="button" class="w-full inline-flex justify-center btn-sm btn-default sm:ml-3 sm:w-auto sm:text-sm">Select</button>
                    <button type="button"  @click="$emit('close')" class="mt-3 w-full justify-center inline-flex btn-sm btn-outline sm:mt-0 sm:ml-4 sm:w-auto sm:text-sm">Cancel</button>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
import { SearchIcon } from "@heroicons/vue/outline";

export default {
    name: "ModalHei",
    data () {
        return {
            results: false,
        }
    },
    props: {
        lists: Array,
    },
    components: {
        SearchIcon 
    },
    methods: {
        searchResults() {
            this.results = !this.results;
        },
    }
};
</script>
