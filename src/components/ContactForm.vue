<template>
    <div>
        <div class="w-1/2 py-20 mx-auto">
        <h2 class="text-brand-blue pb-5">Send a message</h2>
        <form action="">
            <div class="flex gap-20 e">
                <div class="w-1/2 space-y-5">
                    <label class="block ">
                        <span class="after:content-['*'] after:ml-0.5 after:text-brand-red block label-text font-semibold text-dark-200">
                            Province
                        </span>
                        <select name="province" id="province" class="text-dark-200 w-full px-5 py-3 mt-1 border shadow-sm border-dark-100 focus:outline-none focus:border-brand-blue focus:ring-brand-blue block w-full rounded-md sm:text-sm focus:ring-1 ">
                            <option value="">Select Province</option>
                            <option value="Camarines Sur">Camarines Sur</option>
                            <option value="Catanduanes">Catanduanes</option>
                            <option value="Camarines Norte">Camarines Norte</option>
                            <option value="Albay">Albay</option>
                        </select>
                       
                    </label>
                    <label class="block">
                        <span class="after:content-['*'] after:ml-0.5 after:text-brand-red block label-text font-semibold text-dark-200">
                            Name
                        </span>
                        <input type="text" name="name" class="mt-1 px-5 py-3 bg-light-100 border shadow-sm border-dark-100 placeholder-dark-100 focus:outline-none focus:border-brand-blue focus:ring-brand-blue block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter text" />
                    </label>
                    <label class="block">
                        <span class="after:content-['*'] after:ml-0.5 after:text-brand-red block label-text font-semibold text-dark-200">
                            Email Address
                        </span>
                        <input type="email" name="email" class="mt-1 px-5 py-3 bg-light-100 border shadow-sm border-dark-100 placeholder-dark-100 focus:outline-none focus:border-brand-blue focus:ring-brand-blue block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter text" />
                    </label>
                </div>
                <div class="w-1/2">
                    <div class="mb-3 ">
                        <label class="after:content-['*'] after:ml-0.5 after:text-brand-red block label-text font-semibold text-dark-200"
                        >Message</label
                        >
                        <textarea
                        class=" my-1 
                            form-control 
                            block 
                            w-full 
                            px-5 
                            py-3 
                            text-sm 
                            font-normal 
                            text-dark-100
                            bg-white 
                            bg-clip-padding
                            border border-solid border-dark-100
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        
                        rows="10"
                        placeholder="Your message"
                        ></textarea>
                        <button class="btn-sm bg-brand-yellow mt-3 text-light-100 uppercase">Submit</button>
                    </div>
                </div>
            </div>
        </form>
        
        </div>
    </div>
</template>