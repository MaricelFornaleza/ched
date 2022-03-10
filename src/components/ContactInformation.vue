<template>
    <div>
        <div class=" relative p-10 md:p-20 xxl:p-28 ">
            <div class="-z-10 h-full w-1/2 lg:w-1/3 xxl:w-1/4 bg-brand-blue bg-opacity-80 absolute inset-y-0 right-0 "></div>
            <img class="h-full w-auto inset-0 absolute -z-20 object-cover" src="../assets/img/map.png" alt="">
            <div class="z-50 bg-light-100 p-5 md:p-10 w-full lg:w-[fit-content] xxl:w-1/4 shadow-xl ml-auto">
                <div class="w-[fit-content] border-b-4 border-brand-yellow"><h4 class="text-brand-blue ">Reach us</h4></div>
                <div class="flex gap-5 my-5">
                    <LocationMarkerIcon class=" m-auto text-dark-300 h-10 w-10 text-blue-500"/>
                    <div class="w-full">
                        <p class="label-s uppercase text-dark-100 font-bold">Address</p>
                        <p class="body-s text-dark-4">Brgy. 2 - EMs Barrio South, Legazpi City, Albay, 4500</p>
                    </div>
                </div>
                <div class="flex gap-5 my-5">
                    <PhoneIcon class=" m-auto text-dark-300 h-10 w-10 text-blue-500"/>
                    <div class="w-full">
                        <p class="label-s uppercase text-dark-100 font-bold">Contact Number</p>
                        <p class="body-s text-dark-4">(052) 481 5096</p>
                    </div>
                </div>
                <div class="flex gap-5 my-5">
                    <MailIcon class=" m-auto text-dark-300 h-10 w-10 text-blue-500"/>
                    <div class="w-full">
                        <p class="label-s uppercase text-dark-100 font-bold">Email Address</p>
                        <p class="body-s text-dark-4">cspro5@ched.gov.ph</p>
                    </div>
                </div>
                <div class="flex gap-5 my-5">
                    <ClockIcon class=" m-auto text-dark-300 h-10 w-10 text-blue-500"/>
                    <div class="w-full">
                        <p class="label-s uppercase text-dark-100 font-bold">hours of operation</p>
                        <p class="body-s text-dark-4">Weekdays: 8:00 am - 5:00pm</p>
                        <p class="body-s text-dark-4">Weekends: <span class="text-brand-red font-bold">CLOSED</span> </p>
                    </div>
                </div>
                <button class="flex gap-2 text-brand-blue"> <p class="label-text my-auto font-bold"> Get Directions </p><ArrowNarrowRightIcon class="w-8 stroke-1 h-10"/> </button>
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
    ClockIcon
} from '@heroicons/vue/outline'

export default {
  components: { 
      LocationMarkerIcon, 
      PhoneIcon, 
      ArrowNarrowRightIcon, 
      MailIcon,
      ClockIcon
    }
}
</script>