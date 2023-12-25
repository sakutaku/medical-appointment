<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { ref, watch } from 'vue'

const store = useSessionStore()

const inputAnticoagulantsValue = ref('');
watch(inputAnticoagulantsValue, (newValue) => {
  store.addAnticoagulants(newValue);
});

const inputAnticoagulantsVolValue = ref('');
watch(inputAnticoagulantsVolValue, (newValue) => {
  store.addAnticoagulantsVol(newValue);
});

</script>
<template>
  <div class="anticoagulants">
    <div>
      <h3>Антикоагуляция</h3>
      <div class="injection-info-ref">
        <input type="text" v-model="inputAnticoagulantsValue" class="input-text">
        <div class="injection-info-icon"></div>
      </div>
    </div>
    <div>
      <h3>Объем</h3>
      <div class="injection-info-ref">
        <input type="text" v-model="inputAnticoagulantsVolValue" class="input-text-mini">
        <div class="injection-ref"> ед</div>
      </div>
    </div>
  </div>
</template>