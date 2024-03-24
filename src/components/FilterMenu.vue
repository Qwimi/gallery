<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
import IconMinus from './icons/IconMinus.vue';
import IconClose from './icons/IconClose.vue';
import { usePictureStore } from '@/stores/pictures';
import { onMounted, ref, watch } from 'vue';

const store = usePictureStore()
const authors = ref(store.authors);
const locations = ref(store.locations);
const inputValues = ref({
  author: 0,
  location: 0,
  from: 0,
  to: 0
})

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

const emit = defineEmits(['closeMenu', 'sentForm']);

const sentForm = (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  emit('sentForm', inputValues)
  emit('closeMenu')
}

const resetForm = (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  inputValues.value = {
    author: 0,
    location: 0,
    from: 0,
    to: 0
  }
}

</script>

<template>
  <div class="form-overflow">
    <div class="closeMenu" @click="$emit('closeMenu')"></div>
    <form>
      <span class="close-icon" @click="$emit('closeMenu')">
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
          <select v-model="inputValues.author" placeholder="Select the artist">
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
          <select v-model="inputValues.location" placeholder="Select the location">
            <option :value="location.id" v-for="location in locations" :key="location.id">{{ location.location }}
            </option>
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
            <input type="number" v-model="inputValues.from" placeholder="From">
            <IconMinus />
            <input type="number" v-model="inputValues.to" placeholder="To">
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

    .close-icon {
      position: absolute;
      top: 5rem;
      right: 2.5rem;
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
      content: "";
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
