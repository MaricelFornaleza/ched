<template>
  <div>
    <HeroSection />
    <AboutSection />
    <AnnouncementSection />
    <ContactInformation />
    <ContactForm />
    <FooterSection />
  </div>
</template>
<script>
import HeroSection from "@/components/HeroSection.vue";
import AboutSection from "@/components/AboutSection.vue";
import AnnouncementSection from "@/components/AnnouncementSection.vue";
import ContactInformation from "@/components/ContactInformation.vue";
import ContactForm from "@/components/ContactForm.vue";
import FooterSection from "@/components/FooterSection.vue";

export default {
  name: "LandingView",
  components: {
    HeroSection,
    AboutSection,
    AnnouncementSection,
    ContactInformation,
    ContactForm,
    FooterSection,
  },
  methods: {},
};
</script>
