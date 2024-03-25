<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
import IconMinus from './icons/IconMinus.vue';
import IconClose from './icons/IconClose.vue';
import { usePictureStore } from '@/stores/pictures';
import { onMounted, ref, watch } from 'vue';

const store = usePictureStore();
const authors = ref(store.authors);
const locations = ref(store.locations);
const inputValues = ref({
  authorId: 0,
  locationId: 0,
  created_gte: '',
  created_lte: ''
});
const selectedAuthor = ref('')
let selectedLocation = ref('')

onMounted(() => {
  store.getAllAuthors();
  store.getAllLocations();
});

watch(
  () => store.authors,
  () => (authors.value = store.authors)
);

watch(
  () => store.locations,
  () => (locations.value = store.locations)
);

watch(
  [selectedAuthor],
  () => {
    const author = authors.value.find(el => el.name === selectedAuthor.value)
    if (author) inputValues.value.authorId = author.id
  }
);


watch(
  [selectedLocation],
  () => {
    const location = locations.value.find(el => el.location === selectedLocation.value)
    if (location) inputValues.value.locationId = location.id
  }
);

const emit = defineEmits(['closeMenu', 'sentForm']);

const sentForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();

  emit('sentForm', inputValues);
  emit('closeMenu');
};

const resetForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();

  inputValues.value = {
    authorId: 0,
    locationId: 0,
    created_gte: '',
    created_lte: ''
  };
  selectedAuthor.value = ''
  selectedLocation.value = ''
};
</script>

<template>
  <div class="form-overflow">
    <div class="closeMenu" @click="$emit('closeMenu')"></div>
    <form>
      <span class="icon-close" @click="$emit('closeMenu')">
        <IconClose />
      </span>
      <div class="inputs">
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
          <input list="artist" placeholder="Select the artist" v-model="selectedAuthor">
          <datalist id="artist">
            <option v-for="artist in authors" :value="artist.name" :key="artist.id" />
          </datalist>
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

          <input list="location" placeholder="Select the location" v-model="selectedLocation">
          <datalist id="location">
            <option :value="location.location" v-for="location in locations" :key="location.id" />
          </datalist>
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
            <input type="number" v-model="inputValues.created_gte" placeholder="From" />
            <IconMinus />
            <input type="number" v-model="inputValues.created_lte" placeholder="To" />
          </div>
        </details>
      </div>
      <div class="button-row">
        <button class="button-like-link" @click="sentForm">Show the results</button>
        <button class="button-like-link button-secondary" @click="resetForm">clear</button>
      </div>
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
    justify-content: space-between;

    .icon-close {
      position: absolute;
      top: 5rem;
      right: 2.5rem;
      cursor: pointer;
    }

    @media screen and (min-width: $md) {
      width: 50%;
    }

    @media screen and (min-width: $lg) {
      width: 35%;
    }
  }
}

option {
  padding: 0.5rem 1rem;
  font-family: 'Inter Light';
  color: $primary-dark-gray;
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
    max-width: 5.5rem;
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

.inputs {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.button-row {
  display: flex;
  justify-content: space-between;
  color: $primary-dark-gray;

  .button-like-link {
    font-family: 'Inter Bold';
    font-size: 0.75rem;
    line-height: 1;
    position: relative;
    text-transform: uppercase;
    color: $primary-dark-gray;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $primary-dark-gray;
    }

    &.button-secondary {
      color: $secondary-gray;

      &::after {
        background-color: $secondary-gray;
      }
    }
  }
}

[data-theme='dark'] {
  form {
    background-color: $primary-black;
  }

  .button-like-link {
    color: $primary-light-gray;

    &::after {
      background-color: $primary-light-gray;
    }
  }

  .button-secondary {
    color: $primary-dark-gray;

    &::after {
      background-color: $primary-dark-gray;
    }
  }
}
</style>
