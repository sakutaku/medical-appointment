<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed } from 'vue'

const store = useSessionStore()

const setShowAppointment = computed(() => store.appointment)

const showAppointment = async (value: boolean) => {
  if (store.program !== '' && store.chosenInjectionType !== '' && store.chosenInjectionSize && store.injection && store.bicarbonate !== ''
  && store.patientWeight !== '' && store.anticoagulants !== '' && store.anticoagulantsVol !== '') {
    store.setShowAppointment(value)
  } else {
    alert('Заполните всю информацию!')
  }
}

const type = computed(() => store.bicarbonateType === 'Твердый')

</script>
<template>
  <div class="appointment">
    <div>
      <button class="appointment-btn" @click="showAppointment(true)">Сформировать сеанс</button>
    </div>
    <div class="appointment-info" v-if="setShowAppointment">
      <h3>Назначение сеанса гемодиалилза</h3>
      <div>
        <span>Программа - {{store.program}}</span>
        <span>Диализатор</span>
      </div>
      <div>
        <span>Концентратор объем - {{store.concentratorSize}}</span>
        <span>{{store.injection}} (Тип - {{store.chosenInjectionType}} {{store.chosenInjectionSize}})</span>
        <span>Бикарбонат {{store.bicarbonate}}
          <span v-if="type"> гр</span>
          <span v-else> л</span>
        </span>
      </div>
      <div>
        <span>Антикоагуляция - {{store.anticoagulants}} {{store.anticoagulantsVol}} ед</span>
        <span>Сухой вес {{store.patientWeight}} кг</span>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>