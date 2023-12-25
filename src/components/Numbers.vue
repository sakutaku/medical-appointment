<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed, ref, watch } from 'vue'

const store = useSessionStore()

const startDate = ref<string>('');
const endDate = ref<string>('');
const numberOfDays = ref<number | null>(null);

const updateDateRange = () => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)

    const differenceInTime = end.getTime() - start.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    numberOfDays.value = differenceInDays
    store.setNumberOfDays(numberOfDays.value)
  } else {
    numberOfDays.value = null;
  }

  store.setAppointmentDates(startDate.value, endDate.value)
};

watch([startDate, endDate], () => {
  updateDateRange();
});

const makeAnAppointment = () => {
  store.setActiveNumbers(selectedChats.value)
  if(store.drugInfo.chosenDrug !== '' && store.drugInfo.chosenReceiptPath !== '' && store.drugInfo.chosenReceiptDose !== ''
  && store.selectedNumbers.length > 0 && store.startDate && store.endDate && store.numberOfDays) {
    const obj = {
      chosenDrug: store.drugInfo.chosenDrug,
      chosenReceiptPath: store.drugInfo.chosenReceiptPath,
      chosenReceiptDose: store.drugInfo.chosenReceiptDose,
      numbers: store.selectedNumbers,
      startDate: store.startDate,
      endDate: store.endDate,
      day: store.numberOfDays,
    }

    store.addSession(obj);
  } else {
    alert('Заполните всю информацию!')
  }
};

const selectedChats = ref([])

</script>
<template>
  <div class="numbers">
    <h3>Номера сеансов</h3>
    <div class="injection-info-ref">
      <label v-for="chatNumber in 7" :key="chatNumber" class="custom-checkbox">
        <input type="checkbox" :value="chatNumber" v-model="selectedChats" class="checkbox"/>
        {{ chatNumber }}
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="dates">
      <div>
        <h3>Начало приема</h3>
        <input type="date" id="startDate" v-model="startDate" @change="updateDateRange" />
      </div>
      <div>
        <h3>Конец приема</h3>
        <input type="date" id="endDate" v-model="endDate" @change="updateDateRange" />
      </div>
      <div>
        <h3>
          Количество сеансов: <span class="reception-num">{{ numberOfDays! > 0 ? numberOfDays : 0 }}</span>
        </h3>
      </div>
    </div>
    <div class="reception-btn">
      <button @click="makeAnAppointment()">Сформировать</button>
    </div>
  </div>
</template>