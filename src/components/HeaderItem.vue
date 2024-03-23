<script setup lang="ts">
import { ref } from 'vue';
import IconLogoWhite from './icons/IconLogoWhite.vue';
import IconLogoBlack from './icons/IconLogoBlack.vue';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';

const isDark = ref(document.documentElement.getAttribute('data-theme') == 'dark');
const changeTheme = () => {
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  isDark.value = !isDark.value;
};
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <li>
          <IconLogoWhite v-if="isDark" />
          <IconLogoBlack v-else />
        </li>
        <li @click="changeTheme" class="themeSwither">
          <IconSun v-if="isDark" />
          <IconMoon v-else />
        </li>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  padding: 1.25rem 0;
}

.themeSwither {
  cursor: pointer;
}
</style>
