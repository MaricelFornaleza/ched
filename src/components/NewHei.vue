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

      <form>
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
            id="name"
            type="text"
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
            id="email"
            type="email"
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
            id="contact_number"
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
              id="institutional_code"
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
export default {
  components: {
    LibraryIcon,
  },
};
</script>
