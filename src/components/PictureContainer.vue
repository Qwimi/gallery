<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
import type { UsingPicure } from '@/stores/type';
import PictureItem from './PictureItem.vue';

const props = defineProps({
  pictures: {
    type: Array as PropType<UsingPicure[]>,
    required: true
  }
});
</script>

<template>
  <div class="pictures-grid">
    <PictureItem v-for="picture in props.pictures" :key="picture.id" :picture="picture" />
  </div>
</template>

<style lang="scss">
.pictures-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
  overflow: hidden;

  @media screen and (min-width: $md) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media screen and (min-width: $lg) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>
