<script setup lang="ts">
import { ref } from 'vue';
import IconArrowLeft from './icons/IconArrowLeft.vue';
import IconArrowRight from './icons/IconArrowRight.vue';
const props = defineProps({
  pagesCount: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['changePage']);

const current = ref(props.currentPage);

const pages = Array.from({ length: props.pagesCount }, (_, index) => index + 1);

function toPage(page: number) {
  current.value = page;
  emit('changePage', current);
}

function toPrev() {
  if (current.value > 1) {
    current.value -= 1;
  } else {
    current.value = pages[pages.length - 1];
  }
  emit('changePage', current);
}

function toNext() {
  console.log(pages[pages.length - 1]);

  if (current.value != pages[pages.length - 1]) {
    current.value += 1;
  } else {
    current.value = pages[0];
  }
  emit('changePage', current);
}
</script>

<template>
  <div class="pagination-list">
    <button class="arrow arrow-left" @click="toPrev">
      <IconArrowLeft />
    </button>
    <button
      v-for="page in pages"
      :key="page"
      :class="{ active: page == current }"
      @click="toPage(page)"
    >
      {{ page }}
    </button>
    <button class="arrow arrow-right" @click="toNext">
      <IconArrowRight />
    </button>
  </div>
</template>

<style lang="scss">
.pagination-list {
  display: flex;
  gap: 0.25rem;

  button {
    color: $primary-dark-gray;
    height: 1.5rem;
    width: 1.5rem;
    font-family: 'Inter Light';

    &:hover:not(.arrow, .active) {
      border-bottom: 1px solid $secondary-gray;
    }

    &.active,
    &.arrow:hover {
      border-radius: 0.25rem;
      background-color: rgba($primary-black, 0.05);
      font-family: 'Inter Medium';
    }
  }
}

[data-theme='dark'] {
  button {
    color: $primary-light-gray;

    &.active,
    &.arrow:hover {
      background-color: rgba($secondary-black, 1);
    }
  }
}

.arrow {
  &-left {
    margin-right: 1rem;
  }

  &-right {
    margin-left: 1rem;
  }
}
</style>
