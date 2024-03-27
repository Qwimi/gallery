<script setup lang="ts">
import { ref, watch } from 'vue';
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
watch([props.pagesCount], () => console.log('log'));

const toPage = (page: number) => {
  current.value = page;
  emit('changePage', current);
}

const toPrev = () => {
  if (current.value > 1) {
    current.value -= 1;
  } else {
    current.value = props.pagesCount;
  }
  emit('changePage', current);
}

const toNext = () => {
  if (current.value != props.pagesCount) {
    current.value += 1;
  } else {
    current.value = 1;
  }
  emit('changePage', current);
}

const checkSymbol = (page: number) => {
  switch (page) {
    case 1:
    case props.currentPage:
    case props.currentPage + 1:
    case props.currentPage - 1:
    case props.pagesCount:
      return page
    case props.currentPage + 2:
    case props.currentPage - 2:
      return '...'
    default:
      return false
  }
}
</script>

<template>
  <div class="pagination-list">
    <button class="arrow arrow-left" @click="toPrev">
      <IconArrowLeft />
    </button>
    <button v-for="page in props.pagesCount" :key="page" @click="toPage(page)">
      <span v-if="checkSymbol(page)" :class="{ active: page == props.currentPage }">
        {{ checkSymbol(page) }}
      </span>
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

  button span {
    font-family: 'Inter Light';
    color: $primary-dark-gray;
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

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
