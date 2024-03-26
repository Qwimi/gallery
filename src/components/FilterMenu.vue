<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
import IconMinus from './icons/IconMinus.vue';
import IconClose from './icons/IconClose.vue';
import IconDropdown from './icons/IconDropdown.vue';
import { usePictureStore } from '@/stores/pictures';
import { onMounted, ref, watch } from 'vue';
import VSelect from 'vue-select';

const store = usePictureStore();
const authors = ref(store.authors);
const locations = ref(store.locations);
const inputValues = ref({
  authorId: 0,
  locationId: 0,
  created_gte: '',
  created_lte: ''
});
const selectedAuthor = ref(null);
const selectedLocation = ref(null);
const attributes = {
  ref: 'openIndicator',
  role: 'presentation',
  class: 'vs__open-indicator'
};

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

watch([selectedAuthor], () => {
  if (selectedAuthor.value != null) {
    const selectedItem: { id: number; name: string } = selectedAuthor.value;
    const author = authors.value.find((el) => el.id === selectedItem.id);
    inputValues.value.authorId = author ? author.id : 0;
  } else {
    inputValues.value.authorId = 0;
  }
  console.log(inputValues.value.authorId);
});

watch([selectedLocation], () => {
  if (selectedLocation.value != null) {
    const selectedItem: { id: number; location: string } = selectedLocation.value;
    const author = authors.value.find((el) => el.id === selectedItem.id);
    inputValues.value.locationId = author ? author.id : 0;
  } else {
    inputValues.value.locationId = 0;
  }
  console.log(inputValues.value.locationId);
});

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
  selectedAuthor.value = null;
  selectedLocation.value = null;
};
</script>

<template>
  <div class="form-overflow">
    <div></div>
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

          <v-select v-model="selectedAuthor" :options="authors" placeholder="Select the author" label="name"
            track-by="id" :clearable="false" searchable>
            <template #open-indicator="{ attributes }">
              <span>
                <IconDropdown />
              </span>
            </template>
          </v-select>
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

          <v-select v-model="selectedLocation" :options="locations" placeholder="Select the location" label="location"
            :clearable="false" searchable>
            <template #open-indicator="{ attributes }">
              <span>
                <IconDropdown />
              </span>
            </template>
            <template #no-options="{ search, searching, loading }">
              <span> This is the no options slot. </span>
            </template>
          </v-select>
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
option:hover {
  background-color: #3f4348;
}

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
