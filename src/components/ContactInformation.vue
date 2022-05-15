<template>
  <div>
    <div class="relative p-10 md:p-20 xxl:p-28">
      <div
        class="
          -z-10
          h-full
          w-1/2
          lg:w-1/3
          xxl:w-1/4
          bg-brand-blue bg-opacity-80
          absolute
          inset-y-0
          right-0
        "
      ></div>
      <img
        class="h-full w-auto inset-0 absolute -z-20 object-cover"
        src="../assets/img/map.png"
        alt=""
      />

      <!-- <iframe
        class="h-full w-full inset-0 -z-20 absolute object-cover"
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1373.662956152822!2d123.72573012892842!3d13.143115599303496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a103e6cf2485f7%3A0x34cb9f4614c355ec!2sCOMMISSION%20OF%20HIGHER%20EDUCATION!5e0!3m2!1sen!2sph!4v1652468466063!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        width="100%"
        height="100%"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe> -->
      <div
        class="
          z-50
          bg-light-100
          p-4
          md:p-8
          w-full
          lg:w-[fit-content]
          xxl:w-1/4
          shadow-xl
          ml-auto
        "
      >
        <div class="w-[fit-content] border-b-4 border-brand-yellow">
          <h4 class="text-brand-blue">Reach us</h4>
        </div>
        <div class="flex gap-5 my-5">
          <LocationMarkerIcon
            class="m-auto text-dark-300 h-10 w-10 text-blue-500"
          />
          <div class="w-full">
            <p class="label-s uppercase text-dark-100 font-bold">Address</p>
            <p class="body-s text-dark-4">
              Brgy. 2 - EMs Barrio South, Legazpi City, Albay, 4500
            </p>
          </div>
        </div>
        <div class="flex gap-5 my-5">
          <PhoneIcon class="m-auto text-dark-300 h-10 w-10 text-blue-500" />
          <div class="w-full">
            <p class="label-s uppercase text-dark-100 font-bold">
              Contact Number
            </p>
            <p class="body-s text-dark-4">(052) 481 5096</p>
          </div>
        </div>
        <div class="flex gap-5 my-5">
          <MailIcon class="m-auto text-dark-300 h-10 w-10 text-blue-500" />
          <div class="w-full">
            <p class="label-s uppercase text-dark-100 font-bold">
              Email Address
            </p>
            <p class="body-s text-dark-4">cspro5@ched.gov.ph</p>
          </div>
        </div>
        <div class="flex gap-5 my-5">
          <ClockIcon class="m-auto text-dark-300 h-10 w-10 text-blue-500" />
          <div class="w-full">
            <p class="label-s uppercase text-dark-100 font-bold">
              hours of operation
            </p>
            <p class="body-s text-dark-4">Weekdays: 8:00 am - 5:00pm</p>
            <p class="body-s text-dark-4">
              Weekends: <span class="text-brand-red font-bold">CLOSED</span>
            </p>
          </div>
        </div>
        <button
          class="flex gap-2 text-brand-blue px-4 rounded-md hover:bg-light-200"
        >
          <a
            href="https://maps.google.com/maps/dir//COMMISSION+OF+HIGHER+EDUCATION+CHED+Building+EM's+Barrio+S+Legazpi+City,+4500+Albay/@13.1430069,123.7256197,18z/data=!4m5!4m4!1m0!1m2!1m1!1s0x33a103e6cf2485f7:0x34cb9f4614c355ec"
            class="label-text my-auto font-bold"
            target="_blank"
            rel="noopener noreferrer"
            >Get Directions</a
          >
          <ArrowNarrowRightIcon class="w-8 stroke-1 h-10" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LocationMarkerIcon,
  PhoneIcon,
  ArrowNarrowRightIcon,
  MailIcon,
  ClockIcon,
} from "@heroicons/vue/outline";

export default {
  components: {
    LocationMarkerIcon,
    PhoneIcon,
    ArrowNarrowRightIcon,
    MailIcon,
    ClockIcon,
  },
};
</script>