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
          <label class="text-input-label" for="name"> Name </label>
          <input
            class="text-input"
            name="name"
            id="name"
            type="text"
            v-model="name"
            placeholder="Enter HEI's name"
          />
        </div>
        <div class="mb-4">
          <label class="text-input-label" for="username"> Username </label>
          <input
            class="text-input"
            name="username"
            id="username"
            type="text"
            v-model="username"
            placeholder="Enter HEI's Username"
          />
        </div>
        <div class="mb-4">
          <label class="text-input-label" for="email"> Email </label>
          <input
            class="text-input"
            name="email"
            id="email"
            type="email"
            v-model="email"
            placeholder="name@gmail.com"
          />
        </div>
        <div class="mb-4">
          <label class="text-input-label" for="contact_number">
            Contact Number
          </label>
          <input
            class="text-input"
            name="contact_number"
            id="contact_number"
            v-model="contact_number"
            type="text"
            placeholder="09********"
          />
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="mb-4">
            <label class="text-input-label" for="institutional_code">
              Institutional Code
            </label>
            <input
              class="text-input"
              name="institutional_code"
              id="institutional_code"
              v-model="institutional_code"
              type="text"
              placeholder="Enter Code"
            />
          </div>
          <div class="mb-4">
            <label class="text-input-label" for="hei_type"> HEI Type </label>
            <select
              class="
                form-select
                text-input
                block
                bg-clip-padding
                transition
                ease-in-out
                m-0
                focus:outline-none
              "
              v-model="hei_type"
              name="hei_type"
              required
            >
              <option value="" selected>Select</option>
              <option
                v-for="type in hei_types"
                :key="type.value"
                :value="type.value"
              >
                {{ type.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex items-center my-5">
          <label class="block text-dark-200 text-sm mr-5"> Address </label>
          <hr class="border border-light-400 w-full" />
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="mb-4">
            <label class="text-input-label" for="region"> Region </label>
            <select
              class="
                form-select
                text-input
                block
                bg-clip-padding
                transition
                ease-in-out
                m-0
                focus:outline-none
              "
              name="region"
              @change="handleProvince"
              required
            >
              <option value="" disabled selected>Select Region</option>
              <option
                v-for="region in regions"
                :value="region.region_code"
                :key="region.region_code"
              >
                {{ region.region_name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="text-input-label" for="province"> Province </label>
            <select
              class="
                form-select
                text-input
                block
                bg-clip-padding
                transition
                ease-in-out
                m-0
                focus:outline-none
              "
              name="province"
              @change="handleCity"
              required
            >
              <option value="" disabled selected>Select Province</option>
              <option
                v-for="province in provinces"
                :value="province.province_code"
                :key="province.province_code"
              >
                {{ province.province_name }}
              </option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <div class="mb-4">
            <label class="text-input-label" for="city"> City </label>
            <select
              class="
                form-select
                text-input
                block
                bg-clip-padding
                transition
                ease-in-out
                m-0
                focus:outline-none
              "
              name="city"
              @change="handleBarangay"
              required
            >
              <option value="" disabled selected>Select City</option>
              <option
                v-for="city in cities"
                :value="city.city_code"
                :key="city.city_code"
              >
                {{ city.city_name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="text-input-label" for="barangay"> Barangay </label>
            <select
              class="
                form-select
                text-input
                block
                bg-clip-padding
                transition
                ease-in-out
                m-0
                focus:outline-none
              "
              name="barangay"
              @change="barangaysChange"
              required
            >
              <option value="" disabled selected>Select Barangay</option>
              <option
                v-for="barangay in barangays"
                :value="barangay.brgy_code"
                :key="barangay.brgy_code"
              >
                {{ barangay.brgy_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-center space-x-5 mt-10">
          <button
            @click="goToHei()"
            class="btn-sm btn-default btn-outline"
            type="button"
          >
            Cancel
          </button>
          <button v-if="!isLoading" class="btn-sm btn-default" type="submit">
            Submit
          </button>

          <button
            v-else
            class="
              btn-sm btn-default
              inline-flex
              transition
              ease-in-out
              duration-150
              cursor-progress
              opacity-100
            "
            disabled
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-light-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
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
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
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
      regions: [],
      provinces: [],
      cities: [],
      barangays: [],
      region: null,
      regionNo: null,
      regionName: null,
      province: null,
      city: null,
      barangay: null,
      institutional_code: "",
      hei_type: "",
      isLoading: false,
      hei_types: [],
    };
  },
  mounted() {
    this.getHeiTypes();
    regions().then((response) => {
      this.regions = response;
    });
  },
  methods: {
    handleProvince(e) {
      this.regionName = e.target.selectedOptions[0].text;
      this.regionNo = e.target.value;
      provinces(e.target.value).then((response) => {
        this.provinces = response;
      });
    },
    handleCity(e) {
      this.province = e.target.selectedOptions[0].text;
      cities(e.target.value).then((response) => {
        this.cities = response;
      });
    },
    handleBarangay(e) {
      this.city = e.target.selectedOptions[0].text;
      barangays(e.target.value).then((response) => {
        this.barangays = response;
      });
    },
    barangaysChange(e) {
      this.barangay = e.target.selectedOptions[0].text;
    },
    async getHeiTypes() {
      const Hei_type = Parse.Object.extend("HeiType");
      const query = new Parse.Query(Hei_type);
      const results = await query.find();
      for (let i = 0; i < results.length; i++) {
        this.hei_types.push({
          value: results[i].get("abbreviation"),
          title: results[i].get("title"),
        });
      }
    },
    addHei() {
      this.isLoading = true;
      var password = Math.random().toString(36).slice(-12);
      const user = new Parse.User();
      user.set("name", this.name.toUpperCase());
      user.set("email", this.email);
      user.set("username", this.username);
      user.set("contactNumber", this.contact_number);
      user.set("address", {
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
      
      const ACL = new Parse.ACL();
      ACL.setReadAccess(Parse.User.current(), true);
      ACL.setWriteAccess(Parse.User.current(), true);
      user.setACL(ACL);

      user.save().then((user) => {
        const params = {
          name: this.name,
          email: this.email,
          password: password,
          type: "Account",
          approved: true,
        };
        Parse.Cloud.run("sendEmailNotification", params);

        router.push({
          name: "hei",
          query: {
            status: "success",
            msg: user.get("name") + " was successfully added.",
          },
        });

        this.isLoading = false;
      });
    },
    goToHei() {
      this.$router.push({ name: "hei" });
    },
  },
};
</script>
