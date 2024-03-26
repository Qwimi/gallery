<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { usePictureStore } from './stores/pictures';
import HeaderItem from './components/HeaderItem.vue';
import PictureContainer from './components/PictureContainer.vue';
import PaginationItem from './components/PaginationItem.vue';
import SearchItem from './components/SearchItem.vue';
import FilterMenu from './components/FilterMenu.vue';

const store = usePictureStore();
const pictures = ref(store.pictures);
const pageCount = ref(1);
const currentPage = ref(1);
const isMenuOpen = ref(false);
const filters = ref({
  q: '',
  authorId: 0,
  locationId: 0,
  created_gte: '',
  created_lte: ''
});

onMounted(() => store.getPictures(currentPage.value));

watch(
  () => store.pictures,
  () => (pictures.value = store.pictures)
);

watch(
  () => store.pages,
  () => (pageCount.value = store.pages)
);

watch([filters.value], () => {
  console.log(filters.value);

  store.getFilteredPictures(filters.value);
  store.getPictures(currentPage.value);
});

async function loadPage(e: { value: number }) {
  currentPage.value = e.value;
  await store.getPictures(currentPage.value);
}

function searchPictures(e: { value: string }) {
  filters.value.q = e.value;
  currentPage.value = 1;
}

function filterPictures(e: {
  value: {
    authorId: number;
    locationId: number;
    created_gte: string;
    created_lte: string;
  };
}) {
  filters.value.authorId = e.value.authorId;
  filters.value.locationId = e.value.locationId;
  filters.value.created_gte = e.value.created_gte;
  filters.value.created_lte = e.value.created_lte;
  currentPage.value = 1;
}
</script>

<template>
  <HeaderItem />
  <transition name="slide">
    <FilterMenu
      @closeMenu="() => (isMenuOpen = !isMenuOpen)"
      v-show="isMenuOpen"
      @sentForm="(e) => filterPictures(e)"
    />
  </transition>
  <main>
    <div class="wrapper">
      <div class="main_content">
        <SearchItem
          @openMenu="() => (isMenuOpen = !isMenuOpen)"
          @searchPicture="(e) => searchPictures(e)"
        />

        <PictureContainer :pictures="pictures" v-if="pageCount != 0" />
        <div class="error-container" v-else>
          <h2 class="error-title">
            No matches with <b>{{ filters.q }}</b>
          </h2>
          <p class="error-subtitle">Please try again with a different spelling or keywords.</p>
        </div>

        <PaginationItem
          v-if="pageCount != 0"
          :currentPage="currentPage"
          :pagesCount="pageCount"
          @changePage="(e) => loadPage(e)"
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  padding: 5rem 0;

  .wrapper {
    height: 100%;
  }

  .main_content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .error-container {
      font-family: 'Inter Light';
      font-weight: 300;
      text-align: left;
      width: 100%;

      @media screen and (min-width: $md) {
        text-align: center;
      }
    }

    .error-title {
      margin-bottom: 0.75rem;
    }

    .error-subtitle {
      color: $secondary-gray;
      font-size: 0.875rem;
    }

    @media screen and (min-width: $md) {
      gap: 2.5rem;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
./stores/oictures
