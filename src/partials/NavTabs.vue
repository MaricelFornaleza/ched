<template>
  <div>
    <li>
      <!-- <router-link to="/application">Application</router-link> -->
      <a
        href="#"
        class="
          flex
          items-center
          p-3
          px-4
          text-base
          font-normal
          text-gray-900
          rounded-lg
          hover:bg-[#212837]
          active:bg-dark-200 active
        "
      >
        <slot />
      </a>
    </li>
  </div>
</template>