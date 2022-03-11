<template>
  <div>
    <section class="w-full h-screen hero bg-cover bg-fixed bg-center">
      <div
        class="bg-brand-blue bg-opacity-80 w-full h-screen text-light-100"
        :class="open ? 'xxl:text-left xxl:pl-32' : ' text-center'"
      >
        <div class="pt-10 mb-20 xxl:mb-48 space-y-2 sm:pt-20 sm:mb-32 lg:pl-20">
          <img
            src="../assets/CHED_logo.svg"
            class="h-10 xs:h-14"
            :class="open ? 'xxl:mr-auto' : ' mx-auto '"
            alt=""
          />
          <p class="body-s uppercase">Commission on Higher Education</p>
          <p class="body-s">Regional Office No. 5</p>
        </div>
        <div
          class="w-full px-10 lg:px-20 xl:w-2/3 xxl:w-1/2"
          :class="open ? 'xxl:pl-0' : 'mx-auto'"
        >
          <h1
            class="
              mb-10
              xxl:mb-10
              text-2xl
              xs:text-4xl
              sm:text-5xl
              xxl:text-6xl
            "
          >
            The 1st NSTP Serial Number Online Application & Issuance
          </h1>
          <p class="body-small xs:text-base mb-20 sm:body-m lg:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
            accumsan, mi purus enim, suspendisse. Hendrerit quam dictum in massa
            egestas non augue dis.
          </p>
          <button
            @click="toggle"
            class="btn-sm bg-brand-yellow uppercase lg:btn-l"
            :class="open ? 'hidden' : ''"
          >
            Sign in
          </button>
        </div>
      </div>
      <!-- login panel  -->
      <div
        class="slidein w-full bg-light-200 inset-y-0 lg:w-1/2 xxl:w-1/3"
        :class="open ? 'open' : ''"
      >
        <button class="close-btn" @click="toggle"><XIcon class="h-8" /></button>
        <div class="h-full">
          <div
            class="
              h-2/3
              xs:h-1/2
              absolute
              inset-0
              m-auto
              mx-14
              md:mx-24
              xxl:mx-28
            "
          >
            <h2 class="text-brand-blue font-bold">Sign In</h2>
            <p class="body-s">
              Welcome back! Please provide the HEI's credentials.
            </p>

            <form action="">
              <div class="mt-10">
                <div class="w-full">
                  <label class="block mb-5">
                    <span
                      class="
                        after:ml-0.5 after:text-brand-red
                        block
                        label-text
                        font-semibold
                        text-dark-200
                      "
                    >
                      Email Address
                    </span>
                    <input
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
                      placeholder="name@gmail.com"
                    />
                  </label>
                  <label class="block">
                    <span
                      class="
                        after:ml-0.5 after:text-brand-red
                        block
                        label-text
                        font-semibold
                        text-dark-200
                      "
                    >
                      Password
                    </span>
                    <input
                      type="password"
                      name="password"
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
                      placeholder="Enter password"
                    />
                  </label>

                  <button
                    @click="goToHome()"
                    class="
                      w-full
                      btn-sm
                      bg-brand-yellow
                      mt-10
                      text-light-100
                      uppercase
                    "
                  >
                    Submit
                  </button>
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
import { XIcon } from "@heroicons/vue/outline";

export default {
  name: "HeroSection",
  components: {
    XIcon,
  },
  data() {
    return {
      open: false,
    };
  },

  methods: {
    toggle() {
      this.open = !this.open;
    },
    goToHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>
.slidein {
  padding: 2em 3em;
  position: fixed;
  z-index: 100;
  right: -100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
}
.open {
  right: 0;
}
.open-login {
  padding-left: 5rem;
}

.close-btn {
  font-size: 2em;
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5em;
}
</style>
