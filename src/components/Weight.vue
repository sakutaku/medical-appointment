<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import {  ref, watch } from 'vue'

const store = useSessionStore()

const inputValue = ref('');
watch(inputValue, (newValue) => {
  store.addPatientWeight(newValue);
});

</script>
<template>
  <div class="weight">
    <h3>Сухой вес пациента</h3>
    <div class="injection-info-ref">
      <input type="text" v-model="inputValue" class="input-text-mini">
      <div class="injection-ref"> кг</div>
    </div>
  </div>
</template>