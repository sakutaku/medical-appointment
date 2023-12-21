<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed } from 'vue'

const {addInjection} = useSessionStore()
const store = useSessionStore()
const log = console.log;
log(`store =`, store);

const updateInjection = (value: string) => {
  addInjection(value)
}
const injection = computed(() => store.injection);

</script>
<template>
  <div class="gemo-appointment">
    <h2>Назначение сеанса гемодиализа</h2>
    <div>
      <h3>Тип инъекции</h3>
      <div class="input-wrap-injection">
        <input type="radio" class="custom-radio-two" id="needle" name="radio-two" value="Игла" @change="updateInjection('Игла')">
        <label class="label-two" for="needle">
          Игла
        </label>
        <input type="radio" class="custom-radio-two" id="catheter" name="radio-two" value="HDF" @change="updateInjection('Катетер')">
        <label class="label-two" for="catheter">
          Катетер
        </label>
      </div>
      <div>
        <div v-if="injection">{{ injection }}</div>
        <div v-else>No injection</div>
      </div>
    </div>
  </div>
</template>