<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
import IconMinus from './icons/IconMinus.vue';
import { usePictureStore } from '@/stores/pictures';
import { onMounted, ref, watch } from 'vue';
const store = usePictureStore()
const authors = ref(store.authors);
const locations = ref(store.locations);

const emit = defineEmits(['closeMenu']);

onMounted(() => {
  store.getAllAuthors();
  store.getAllLocations();
});

watch(
  () => store.authors,
  () => authors.value = store.authors
);

watch(
  () => store.locations,
  () => locations.value = store.locations
);

</script>

<template>
  <div class="form-overflow">
    <div class="closeMenu" @click="$emit('closeMenu')"></div>
    <form>
      <details>
        <summary>
          <h1 class="title">Artist</h1>
          <div class="icon icon-plus">
            <IconPlus />
          </div>
          <div class="icon icon-minus">
            <IconMinus />
          </div>
        </summary>
        <select name="" id="" placeholder="Select the artist">
          <option :value="artist.id" v-for="artist in authors" :key="artist.id">{{ artist.name }}</option>
        </select>
      </details>
      <details>
        <summary>
          <h1 class="title">Location</h1>
          <div class="icon icon-plus">
            <IconPlus />
          </div>
          <div class="icon icon-minus">
            <IconMinus />
          </div>
        </summary>
        <select name="" id="" placeholder="Select the location">
          <option :value="location.id" v-for="location in locations" :key="location.id">{{ location.location }}</option>
        </select>
      </details>
      <details>
        <summary>
          <h1 class="title">Years</h1>
          <div class="icon icon-plus">
            <IconPlus />
          </div>
          <div class="icon icon-minus">
            <IconMinus />
          </div>
        </summary>
        <div class="year-container">
          <input type="number" name="" id="" placeholder="From">
          <IconMinus />
          <input type="number" name="" placeholder="To">
        </div>
      </details>
    </form>

  </div>

</template>

<style lang="scss">
.form-overflow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  display: flex;

  .closeMenu {
    flex: 1;
  }

  form {
    height: 100%;
    width: 85%;
    background-color: $secondary-white;
    padding: 11.25rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media screen and (min-width: $md) {
      width: 50%;
    }

    @media screen and (min-width: $lg) {
      width: 35%;
    }
  }
}

summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.year-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    max-width: 5rem;
  }

  ::placeholder {
    text-align: center;
  }
}

details {
  max-height: 1.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: max-height 0.3s;

  .icon-plus {
    display: block;
  }

  .icon-minus {
    display: none;
  }

  &[open] {
    max-height: 10rem;

    .icon-plus {
      display: none;
    }

    .icon-minus {
      display: block;
    }
  }
}

[data-theme='dark'] {
  form {
    background-color: $primary-black;
  }
}
</style>
