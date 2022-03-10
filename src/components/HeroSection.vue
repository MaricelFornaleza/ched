<template>
    <div>
        <section class="w-full h-screen hero bg-cover bg-fixed bg-center">
            <div class="bg-brand-blue bg-opacity-80 w-full h-screen  text-light-100" :class="open ? 'open-login' : ' text-center'">
                <div class="pt-10 sm:pt-20 mb-10 sm:mb-32 space-y-2">
                    <img src="../assets/CHED_logo.svg" class="h-16 " :class="open ? '' : ' mx-auto '" alt="">
                    <p class="body-m uppercase">Commission on Higher Education</p>
                    <p class="body-m">Regional Office No. 5</p>
                </div>
               <div class="w-full lg:w-2/3 xl:w-1/2  " :class="open ? 'pr-10' : 'mx-auto px-10'">
                <h1 class="mb-10 text-4xl sm:text-5xl xl:text-6xl ">The 1st NSTP Serial Number Online Application & Issuance </h1>
                <p class="body-s sm:body-m lg:lead-paragraph mb-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet accumsan, mi purus enim, suspendisse. Hendrerit quam dictum in massa egestas non augue dis.</p>
                <button @click="toggle" class="btn-sm lg:btn-l bg-brand-yellow uppercase" :class="open ? 'hidden' : ''">Sign in</button>
               </div>
            </div>
            <!-- Add open class if state is set to open  -->
            <div class="slidein w-full lg:w-1/3 bg-light-200 inset-y-0 " :class="open ? 'open' : ''">
                <button class="close-btn" @click="toggle"> <XIcon class="h-8"/>  </button>
               <div class="h-full">
                   <div class="h-1/2 absolute inset-0 m-auto mx-28 ">
                    <h2 class="text-brand-blue font-bold">Sign In</h2>
                    <p class="body-s">Welcome back! Please provide the HEI's credentials.</p>

                    <form action="">
                      <div class="mt-10">
                          <div class="w-full ">
                              
                              <label class="block mb-5">
                                  <span class=" after:ml-0.5 after:text-brand-red block label-text font-semibold text-dark-200">
                                      Email Address
                                  </span>
                                  <input type="email" name="email" class="mt-1 px-5 py-3 bg-light-100 border shadow-sm border-dark-100 placeholder-dark-100 focus:outline-none focus:border-brand-blue focus:ring-brand-blue block w-full rounded-md sm:text-sm focus:ring-1" placeholder="name@gmail.com" />
                              </label>
                              <label class="block ">
                                  <span class=" after:ml-0.5 after:text-brand-red block label-text font-semibold text-dark-200">
                                      Password
                                  </span>
                                  <input type="password" name="password" class="mt-1 px-5 py-3 bg-light-100 border shadow-sm border-dark-100 placeholder-dark-100 focus:outline-none focus:border-brand-blue focus:ring-brand-blue block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Enter password" />
                              </label>
                              <button class=" w-full btn-sm bg-brand-yellow mt-10 text-light-100 uppercase">Submit</button>
                          </div>
                         
                      </div>
                  </form>
                   
                   </div>
                </div>
               

            </div>
        </section>
        
    </div>
    
</template>

<script>
import { 
    XIcon
} from '@heroicons/vue/outline'

export default {
  name: 'HeroSection',
  components: {
    XIcon,
  },
  data() {
    return {
      open: false
    };
  },
  
  methods: {
    toggle() {
      this.open = !this.open; 
    }
  }
}
</script>

<style>

.slidein {
  padding: 2em 3em; 
  position: fixed; 
  z-index: 100;
  right: -100%;
  box-shadow: 1px 1px 10px rgba(0,0,0,.5);
  transition: all .5s ease-in-out; 
  
}

/* Set positioning back to 0 when toggled opened */
.open {
  right: 0; 
}
.open-login{

  padding-left: 5rem;
}


/* add a close button in case toggle button is hidden on smaller screens */
.close-btn {
  
  font-size: 2em; 
  background: transparent; 
  position: absolute; 
  top: 0;
  right: 0;
  padding: .5em;
}
</style>