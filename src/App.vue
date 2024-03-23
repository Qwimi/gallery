<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { usePictureStore } from './stores/pictures';
import HeaderItem from './components/HeaderItem.vue';
import PictureContainer from './components/PictureContainer.vue';
import PaginationItem from './components/PaginationItem.vue';

const store = usePictureStore();
const pictures = ref(store.pictures);
const pageCount = ref(store.pages);
const currentPage = ref(1);

onMounted(() => {
  store.getPictures(currentPage.value);
  store.getPages();
});

watch(
  () => store.pictures,
  () => {
    pictures.value = store.pictures;
    pageCount.value = store.pages;
  }
);

function alertPage(e: {
  value: number
}) {
  console.log(e.value);
  currentPage.value = e.value
  store.getPictures(currentPage.value);
}
</script>

<template>
  <HeaderItem />
  <main>
    <div class="wrapper">
      <div class="main_content">
        <PictureContainer :pictures="pictures" />
        <PaginationItem v-if="pageCount > 1" :currentPage="currentPage" :pagesCount="pageCount"
          @changePage="(e) => alertPage(e)" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  padding-bottom: 5rem;

  .wrapper {
    height: 100%;
  }

  .main_content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    @media screen and (min-width: $md) {
      gap: 2.5rem;
    }
  }

  @media screen and (min-width: $lg) {
    padding-bottom: 0;
  }
}
</style>
./stores/oictures
