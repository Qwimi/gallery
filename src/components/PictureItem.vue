<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
import type { UsingPicure } from '@/stores/type';

const props = defineProps({
  picture: {
    type: Object as PropType<UsingPicure>,
    required: true
  }
});
const fullUrl = (url: String) => `https://test-front.framework.team${url}`;
</script>

<template>
  <div class="picture-item">
    <img :src="fullUrl(props.picture.imageUrl)" alt="Failed to upload image (ʘ̥ܫʘ̥)" loading="lazy" />
    <div class="picture_info">
      <div class="about_info">
        <div class="to_bottom">
          <h1 class="title">{{ props.picture.name }}</h1>
          <p class="subtitle-accent">{{ props.picture.created }}</p>
        </div>
        <div class="to_right">
          <h1 class="title">{{ props.picture.author }}</h1>
          <p class="subtitle-accent">{{ props.picture.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.picture-item {
  aspect-ratio: 98/65;
  position: relative;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: all 0.3s ease-out;
  }

  .about_info {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 200%;

    .to_bottom,
    .to_right {
      position: relative;
      width: 100%;
      transition: transform 0.3s ease-out;
    }

    .to_right {
      transform: translateX(-250%);
    }

    &::before {
      content: '';
      position: absolute;
      left: -1.25rem;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: $accent-red;
      display: none;

      @media screen and (min-width: $lg) {
        display: block;
      }
    }
  }

  &:hover {
    img {
      transform: scale(1.05);
    }

    .to_bottom {
      transform: translateY(200%);
    }

    .to_right {
      transform: translateX(-100%);
    }
  }
}

.picture_info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 85%;
  max-width: 300px;
  background-color: $primary-white;
  padding: 20px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 1.5rem;
    background: $accent-red url('@/assets/arrow_icon.svg') no-repeat;
    background-position: center left;

    @media screen and (min-width: $lg) {
      display: none;
    }
  }
}

.subtitle-accent {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-family: 'Inter Bold';
  color: $accent-red;
}

[data-theme='dark'] {
  .picture_info {
    background-color: $primary-black;

    &::after {
      background-color: $accent-gold;
    }
  }

  .about_info {
    &::after {
      background-color: $accent-gold;
    }
  }

  .subtitle-accent {
    color: $accent-gold;
  }
}

/*.fade-enter-active,
.fade-leave-active {
  transition: all 10s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}*/
</style>
