<template>
  <div>
    <div
      class="
        m-auto
        my-20
        border border-1 border-light-300
        shadow-sm
        px-20
        py-10
        bg-light-100
        w-4/5
        xl:w-4/12
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
          <label
            class="block text-dark-200 text-sm font-bold mb-2"
            for="username"
          >
            Username
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
            name="username"
            id="username"
            type="text"
            v-model="username"
            placeholder="Enter HEI's Username"
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
              required
            >
              <option selected>Select</option>
              <option value="LUC">Local Universities and Colleges</option>
              <option value="SUC">State Universities and Colleges</option>
              <option value="Private">Private</option>
              <option value="OGS">Other GOvernment Schools</option>
            </select>
          </div>
        </div>
        <div class="flex items-center my-5">
          <label class="block text-dark-200 text-sm mr-5"> Address </label>
          <hr class="border border-light-400 w-full" />
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="street"
            >
              Street
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
              name="street"
              id="street"
              v-model="street"
              type="text"
              placeholder="Enter Street"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="barangay"
            >
              Barangay
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
              name="barangay"
              id="barangay"
              v-model="barangay"
              type="text"
              placeholder="Enter Barangay"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="city"
            >
              City
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
              name="city"
              id="city"
              v-model="city"
              type="text"
              placeholder="Enter City"
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="province"
            >
              Province
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
              name="province"
              id="province"
              v-model="province"
              type="text"
              placeholder="Enter Province"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="regionNo"
            >
              Region Number
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
              name="regionNo"
              id="regionNo"
              v-model="regionNo"
              type="text"
              placeholder="Enter Region No."
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-dark-200 text-sm font-bold mb-2"
              for="regionName"
            >
              Region Name
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
              name="regionName"
              id="regionName"
              v-model="regionName"
              type="text"
              placeholder="Enter Region Name"
            />
          </div>
        </div>

        <div class="flex items-center justify-center space-x-5 mt-10">
          <button
            class="btn-sm border-none bg-light-300 font-bold"
            type="button"
          >
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
import router from "../router";
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
      username: "",
      email: "",
      contact_number: "",
      street: "",
      barangay: "",
      city: "",
      province: "",
      regionNo: "",
      regionName: "",
      institutional_code: "",
      hei_type: "",
    };
  },
  methods: {
    addHei() {
      var password = Math.random().toString(36).slice(-12);
      const user = new Parse.User();
      user.set("name", this.name);
      user.set("email", this.email);
      user.set("username", this.username);
      user.set("contactNumber", this.contact_number);
      user.set("address", {
        street: this.street,
        barangay: this.barangay,
        city: this.city,
        province: this.province,
        regionNo: this.regionNo,
        regionName: this.regionName,
      });
      user.set("institutionalCode", this.institutional_code);
      user.set("type", this.hei_type);
      user.set("password", password);
      user.set("userType", "hei");
      user.save().then((user) => {
        router.push({
          name: "hei",
          query: {
            status: "success",
            msg: user.get("name") + " was successfully added.",
          },
        });
      });
      // .then(function(hei) {
      //   // any logic to be executed after the object is saved.
      //   alert('New object created with objectId: ' + hei.id);

      // }).catch(function (error){
      //   alert('Failed to create new object, with error code: ' + error.message);
      // });
    },
  },
};
</script>
