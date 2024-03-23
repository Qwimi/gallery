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
    <img :src="fullUrl(picture.imageUrl)" alt="picture" loading="lazy" />
    <div class="picture_info">
      <div class="about_info">
        <div class="to_bottom">
          <h1 class="title">{{ picture.name }}</h1>
          <p class="subtitle-accent">{{ picture.created }}</p>
        </div>
        <div class="to_right">
          <h1 class="title">{{ picture.author }}</h1>
          <p class="subtitle-accent">{{ picture.location }}</p>
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

    &::after {
      content: '';
      position: absolute;
      left: -1.25rem;
      top: 0;
      width: 2px;
      height: 100%;
      background-color: $accent-red;
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
  width: 300px;
  background-color: $primary-white;
  padding: 20px;

  @media screen and (max-width: ($md - 1px)) {
    width: 236px;
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
</style>
