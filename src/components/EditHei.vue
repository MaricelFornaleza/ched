<template>
  <div>
    <!-- alert message -->
    <div class="w-fit mx-auto">
      <AlertWidget :className="alert.className">
        {{ alert.msg }}
      </AlertWidget>
    </div>

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

      <form ref="form" id="editHei" @submit.prevent="editHei">
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
        <div class="mb-4">
          <label class="text-input-label" for="password"> New Password </label>
          <input
            class="text-input"
            name="password"
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter new password"
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
              v-model="regionNo"
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
              v-model="province_code"
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
              v-model="city_code"
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
              v-model="brgy_code"
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
          <button class="btn-sm btn-default" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { LibraryIcon } from "@heroicons/vue/solid";
import Parse from "parse";
import router from "../router";
import AlertWidget from "@/partials/AlertWidget.vue";

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
    AlertWidget,
  },
  data() {
    return {
      id: "",
      open: true,
      name: "",
      username: "",
      email: "",
      contact_number: "",
      password: null,
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
      hei_types: [],
      province_code: null,
      city_code: null,
      brgy_code: null,
      usertype: null,
      alert: { className: "", msg: "" },
    };
  },
  async mounted() {
    this.getHeiTypes();
    regions().then((response) => {
      this.regions = response;
    });

    this.id = this.$route.params.id;

    // get current user
    // we will use this for redirecting after submit
    const user = new Parse.User.current();
    this.usertype = user.get("userType");

    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", this.id);
    const result = await query.first({ useMasterKey: true });

    this.name = result.get("name");
    this.username = result.get("username");
    this.email = result.get("email");
    this.contact_number = result.get("contactNumber");
    this.institutional_code = result.get("institutionalCode");
    this.hei_type = result.get("type");
    this.street = result.get("address").street;
    this.barangay = result.get("address").barangay;
    this.city = result.get("address").city;
    this.province = result.get("address").province;
    this.regionNo = result.get("address").regionNo;
    this.regionName = result.get("address").regionName;

    this.getProvinceCode();
  },
  methods: {
    goToHei() {
      this.$router.push({ name: "hei" });
    },
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
    async getProvinceCode() {
      await provinces(this.regionNo).then((response) => {
        this.provinces = response;
      });
      const province = this.provinces.filter((provinces) =>
        provinces.province_name.match(this.province)
      );
      this.province_code = province[0].province_code;
      this.getCityCode();
    },
    async getCityCode() {
      await cities(this.province_code).then((response) => {
        this.cities = response;
      });
      const city = this.cities.filter((cities) =>
        cities.city_name.match(this.city)
      );
      this.city_code = city[0].city_code;
      this.getBarangayCode();
    },
    async getBarangayCode() {
      await barangays(this.city_code).then((response) => {
        this.barangays = response;
      });
      const brgy = this.barangays.filter((barangays) =>
        barangays.brgy_name.match(this.barangay)
      );
      this.brgy_code = brgy[0].brgy_code;
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
    async editHei() {
      // better if this is done in cloud code
      const User = Parse.Object.extend(Parse.User);
      const q = new Parse.Query(User);
      q.matches("objectId", this.id);
      const result = await q.first();
      // user.set();
      result.set("name", this.name);
      if (this.email != result.get("email")) {
      //result.set("email", this.email);
      }
      result.set("username", this.username);
      result.set("contactNumber", this.contact_number);
      if (this.password != null) {
        result.set("password", this.password);
      }
      result.set("address", {
        street: this.street,
        barangay: this.barangay,
        city: this.city,
        province: this.province,
        regionNo: this.regionNo,
        regionName: this.regionName,
      });
      result.set("institutionalCode", this.institutional_code);
      result.set("type", this.hei_type);

      result
        .save(
           { useMasterKey: true }
        )
        .then((user) => {
          if (this.usertype == "admin") {
            router.push({
              name: "hei",
              query: {
                status: "success",
                msg: user.get("name") + " was successfully updated.",
              },
            });
          } else {
            this.alert.className = "alert-success";
            window.scrollTo(0, 0);
            this.alert.msg = user.get("name") + " was successfully updated.";
            router.push({
              name: "myAccount",
            });
          }
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

<style>
</style>