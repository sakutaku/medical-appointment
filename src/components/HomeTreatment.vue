<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed } from 'vue'

const store = useSessionStore()

const setShowTreatment = computed(() => store.treatment)
const showTreatment = async (value: boolean) => {
  if (store.drugInfoHome.chosenDrug !== '' && store.drugInfoHome.chosenReceiptPath !== '' && store.drugInfoHome.chosenReceiptDose !== ''
      && store.startDateFrequency && store.endDateFrequency && store.numberOfDaysFrequency && store.frequency) {
    store.setShowTreatment(value)
  } else {
    alert('Заполните всю информацию!')
  }
}

</script>
<template>
  <div class="treatment">
    <div>
      <button @click="showTreatment(true)" class="treatment-btn">Добавить</button>
    </div>
    <div v-if="setShowTreatment" class="treatment-inner">
      <h3>Лечение на дому</h3>
      <div>
        <div>
          <span>{{store.drugInfoHome.chosenDrug}} - {{store.drugInfoHome.chosenReceiptPath}} - {{store.drugInfoHome.chosenReceiptDose}}</span>
        </div>
        <div>
          <span>{{store.frequency}} раза утром и вечером</span>
        </div>
        <div>
          <span>с {{store.startDateFrequency}} по {{store.endDateFrequency}}</span>
          <span>{{store.numberOfDaysFrequency}} дней</span>
        </div>
      </div>
    </div>
  </div>
</template>