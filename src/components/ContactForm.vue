<template>
  <div>
    <div class="w-full p-10 md:p-20 mx-auto xxl:w-1/2">
      <h2 class="text-brand-blue pb-5">Send a message</h2>
      <form action="">
        <div class="flex flex-col lg:flex-row gap-5 lg:gap-10">
          <div class="w-full space-y-5">
            <label class="block">
              <span
                class="
                  after:content-['*'] after:ml-0.5 after:text-brand-red
                  block
                  label-text
                  font-semibold
                  text-dark-200
                "
              >
                Province
              </span>
              <select
                name="province"
                id="province"
                v-model="province"
                class="
                  text-dark-200
                  px-5
                  py-3
                  mt-1
                  border
                  shadow-sm
                  border-dark-100
                  focus:outline-none
                  focus:border-brand-blue
                  focus:ring-brand-blue
                  block
                  w-full
                  rounded-md
                  sm:text-sm
                  focus:ring-1
                "
              >
                <option value="">Select Province</option>
                <option value="Camarines Sur">Camarines Sur</option>
                <option value="Catanduanes">Catanduanes</option>
                <option value="Camarines Norte">Camarines Norte</option>
                <option value="Albay">Albay</option>
              </select>
            </label>
            <label class="block">
              <span
                class="
                  after:content-['*'] after:ml-0.5 after:text-brand-red
                  block
                  label-text
                  font-semibold
                  text-dark-200
                "
              >
                Name
              </span>
              <input
                type="text"
                name="name"
                v-model="name"
                class="
                  mt-1
                  px-5
                  py-3
                  bg-light-100
                  border
                  shadow-sm
                  border-dark-100
                  placeholder-dark-100
                  focus:outline-none
                  focus:border-brand-blue
                  focus:ring-brand-blue
                  block
                  w-full
                  rounded-md
                  sm:text-sm
                  focus:ring-1
                "
                placeholder="Enter text"
              />
            </label>
            <label class="block">
              <span
                class="
                  after:content-['*'] after:ml-0.5 after:text-brand-red
                  block
                  label-text
                  font-semibold
                  text-dark-200
                "
              >
                Email Address
              </span>
              <input
                v-model="email"
                type="email"
                name="email"
                class="
                  mt-1
                  px-5
                  py-3
                  bg-light-100
                  border
                  shadow-sm
                  border-dark-100
                  placeholder-dark-100
                  focus:outline-none
                  focus:border-brand-blue
                  focus:ring-brand-blue
                  block
                  w-full
                  rounded-md
                  sm:text-sm
                  focus:ring-1
                "
                placeholder="Enter text"
              />
            </label>
          </div>
          <div class="w-full">
            <div class="mb-3">
              <label
                class="
                  after:content-['*'] after:ml-0.5 after:text-brand-red
                  block
                  label-text
                  font-semibold
                  text-dark-200
                "
                >Message</label
              >
              <textarea
                v-model="message"
                class="
                  my-1
                  form-control
                  block
                  w-full
                  px-5
                  py-3
                  text-sm
                  font-normal
                  text-dark-100
                  bg-white bg-clip-padding
                  border border-solid border-dark-100
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                rows="10"
                placeholder="Your message"
              ></textarea>
              <button
                @click="sendEmail()"
                class="btn-sm bg-brand-yellow mt-3 text-light-100 uppercase"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute("src", "https://smtpjs.com/v3/smtp.js");
    document.head.appendChild(externalScript);
  },
  data() {
    return {
      province: "",
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    sendEmail() {
      //just commented out to work, pass is not defined error
      // const params = {name:this.name, email:this.email, password:password, type:"Account", approved:true}; 
      // Parse.Cloud.run("contactForm", params);

      this.province = "";
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>