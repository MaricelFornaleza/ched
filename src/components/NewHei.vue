<template>
  <div>
    <div
      class="
        m-auto
        mt-20
        border border-1 border-light-300
        shadow-sm
        px-20
        py-10
        bg-light-100
        w-4/5
        lg:w-4/12
      "
    >
      <div
        class="
          border-b-2
          text-center
          flex flex-col
          justify-center
          items-center
          space-y-3
          w-full
          pb-3
          border-dark-100
          mb-4
        "
      >
        <div class="rounded-full bg-warning-light h-fit w-fit p-4 text-warning">
          <LibraryIcon class="h-10" />
        </div>
        <p class="uppercase font-bold label-sm">Higher Education Institution</p>
      </div>

      <form ref="form" id="addHei" @submit.prevent="addHei">
        <div class="mb-4">
          <label class="block text-dark-200 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input
            class="
              appearance-none
              border-2
              rounded
              w-full
              py-2
              px-4
              text-dark-100 text-sm
              focus:outline-none focus:ring
            "
            name="name"
            id="name"
            type="text"
            v-model="name"
            placeholder="Enter HEI's name"
          />
        </div>
        <div class="mb-4">
          <label class="block text-dark-200 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="
              appearance-none
              border-2
              rounded
              w-full
              py-2
              px-4
              text-dark-100 text-sm
              focus:outline-none focus:ring
            "
            name="email"
            id="email"
            type="email"
            v-model="email"
            placeholder="name@gmail.com"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-dark-200 text-sm font-bold mb-2"
            for="contact_number"
          >
            Contact Number
          </label>
          <input
            class="
              appearance-none
              border-2
              rounded
              w-full
              py-2
              px-4
              text-dark-100 text-sm
              focus:outline-none focus:ring
            "
            name="contact_number"
            id="contact_number"
            v-model="contact_number"
            type="text"
            placeholder="09********"
          />
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="institutional_code"
            >
              Institutional Code
            </label>
            <input
              class="
                appearance-none
                border-2
                rounded
                w-full
                py-2
                px-4
                text-dark-100 text-sm
                focus:outline-none focus:ring
              "
              name="institutional_code"
              id="institutional_code"
              v-model="institutional_code"
              type="text"
              placeholder="Enter Code"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="hei_type"
            >
              HEI Type
            </label>
            <select
              class="
                form-select
                appearance-none
                block
                w-full
                px-3
                py-2
                text-sm text-dark-100
                bg-clip-padding
                border-2
                rounded
                transition
                ease-in-out
                m-0
                focus:outline-none
              "
              v-model="hei_type"
              name="hei_type"
            >
              <option selected>Select</option>
              <option value="LUC">Local Universities and Colleges</option>
              <option value="SUC">State Universities and Colleges</option>
              <option value="Private">Private</option>
              <option value="OGS">Other GOvernment Schools</option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-center space-x-5 mt-10">
          <button class="btn-sm bg-light-300 font-bold" type="button">
            Cancel
          </button>
          <button
            class="btn-sm bg-brand-blue text-light-100 font-bold"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { LibraryIcon } from "@heroicons/vue/solid";
import Parse from "parse";
//import emailjs from '@emailjs/browser';

export default {
  auth: true,
  components: {
    LibraryIcon,
  },
  data() {
    return {
      open: true,
      name: "",
      email: "",
      contact_number: "",
      institutional_code: "",
      hei_type: "",
    };
  },
  methods: {
    async addHei() {
      var password = Math.random().toString(36).slice(-12);
      this.form.password = password;
      const User = Parse.Object.extend("User");
      const user = new User();
      user.set("name", this.name);
      user.set("email", this.email);
      user.set("contact_number", this.contact_number);
      user.set("institutional_code", this.institutional_code);
      user.set("hei_type", this.hei_type);
      user.set("password", this.password);
      
      user.save();
      // .then(function(hei) {
      //   // any logic to be executed after the object is saved.

      //   alert('New object created with objectId: ' + hei.id);
      //   emailjs.sendForm('service_0ftc4vc', 'template_gmz4sqi', this.form, 'jTSIh7CnjU-vTFAm4')
      // .then((result) => {
      //   console.log('SUCCESS', result.text);
      // }, (error) => {
      //   console.log('FAILED', error.text);
      // });
      // }).catch(function (error){
      //   alert('Failed to create new object, with error code: ' + error.message);
      // });

    },
  },
};
</script>
