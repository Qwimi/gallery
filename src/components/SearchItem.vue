<script setup lang="ts">
import { ref, watch } from 'vue';
import IconSearch from './icons/IconSearch.vue';
import IconCloseSmall from './icons/IconCloseSmall.vue';
import IconFilter from './icons/IconFilter.vue';

const emit = defineEmits(['openMenu', 'searchPicture']);
const searchString = ref('');
watch([searchString], () => emit('searchPicture', searchString));
</script>

<template>
  <div class="search-container">
    <div class="search-row">
      <div class="input-container">
        <span class="search-icon icon-left">
          <IconSearch />
        </span>
        <input type="text" class="search-input" placeholder="Painting title" v-model="searchString" />
        <span class="search-icon icon-right" v-show="searchString" @click="searchString = ''">
          <IconCloseSmall />
        </span>
      </div>
      <button @click="$emit('openMenu')">
        <IconFilter />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;

  @media screen and (min-width: $md) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    .search-row {
      grid-column: 2/3;
    }
  }

  @media screen and (min-width: $lg) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    .search-row {
      grid-column: 3/4;
    }
  }
}

.search-row {
  display: flex;
  gap: 1.25rem;
  width: 100%;
}

.input-container {
  position: relative;
  width: 100%;

  .search-input {
    padding: 0.5rem 3rem;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;

    &.icon-left {
      left: 1rem;
    }

    &.icon-right {
      right: 1rem;
    }
  }
}

button {
  padding: 0.25rem;
  background-color: $secondary-white;
  color: $primary-dark-gray;
  border-radius: 0.25rem;
}

[data-theme='dark'] {
  button {
    background-color: $secondary-black;
    color: $primary-light-gray;
  }
}
</style>
