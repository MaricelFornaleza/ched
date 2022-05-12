<template>
  <div>
    <section class="h-screen hero bg-cover bg-fixed bg-center">
      <div
        class="bg-brand-blue bg-opacity-80 w-full h-screen text-light-100"
        :class="open ? 'xxl:text-left xxl:pl-32' : ' text-center'"
      >
        <div
          class="pt-10 mb-20 space-y-2 sm:pt-20 sm:mb-28"
          :class="open ? 'lg:pl-0' : ''"
        >
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
          <h1 class="mb-10 xxl:mb-10 text-2xl xs:text-4xl sm:text-5xl">
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
        class="slidein w-full bg-light-200 inset-y-0 md:w-1/2 lg:w-1/3"
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
            <div class="w-fit">
              <AlertWidget :className="alert.className">
                {{ alert.msg }}
              </AlertWidget>
            </div>
            <p class="body-s">
              Welcome back! Please provide the HEI's credentials.
            </p>
            <div class="loader"></div>
            <form @submit.prevent="login">
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
                      v-model="email"
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
                    <span
                      v-show="emailError !== ''"
                      class="text-xs text-error"
                      id="email-error"
                      >{{ emailError }}</span
                    >
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
                      v-model="password"
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
                      v-on:keyup.enter="login"
                    />
                    <span
                      v-show="passwordError !== ''"
                      class="text-xs text-error"
                      id="password-error"
                      >{{ passwordError }}</span
                    >
                  </label>

                  <div class="mt-10">
                    <button
                      v-if="!isLoading"
                      type="submit"
                      class="
                        w-full
                        btn-sm
                        bg-brand-yellow
                        text-light-100
                        uppercase
                      "
                    >
                      Submit
                    </button>

                    <button
                      v-else
                      class="
                        w-full
                        inline-flex
                        justify-center
                        items-center
                        px-4
                        py-4
                        font-semibold
                        leading-6
                        text-sm
                        shadow
                        rounded-md
                        text-light-100
                        bg-brand-blue
                        hover:bg-brand-blue
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
                      Logging in...
                    </button>
                  </div>
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
import AlertWidget from "@/partials/AlertWidget.vue";
import Parse from "parse";

export default {
  name: "HeroSection",
  components: {
    XIcon,
    AlertWidget
  },
  data() {
    return {
      open: false,
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      isLoading: false,
      alert: {},
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    async login() {
      if (this.email.length === 0) {
        // alert("Please enter an email");
        this.emailError = "Please enter an email";
        return;
      } else {
        this.emailError = "";
      }
      if (this.password.length === 0) {
        // alert("Please enter a password");
        this.passwordError = "Please enter a password";
        return;
      } else {
        this.passwordError = "";
      }
      this.isLoading = true;
      const self = this;
      Parse.User.logIn(this.email, this.password)
        .then(() => {
          self.isLoading = false;
          const user = Parse.User.current();
          const usertype = user.get("userType");

          if (usertype == "hei") {
            if (user.get("emailVerified"))
              this.$router.push({ name: "application" });
            else 
              this.displayAlert("error", "Please verify first your email!");
          } else if (usertype == "admin") {
            this.$router.push({ name: "home" });
          }
        })
        .catch((err) => {
          self.isLoading = false;
          // alert("error" + err.message);
          this.displayAlert("error", err.message);
        });
    },
    displayAlert(status, msg) {
      this.alert.className = "alert-" + status;
      this.alert.msg = msg;
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
