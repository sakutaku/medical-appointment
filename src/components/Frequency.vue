<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed, ref, watch } from 'vue'

const store = useSessionStore()
const startDateFr = ref<string>('')
const endDateFr = ref<string>('')
const numberOfDaysFr = ref<number | null>(null)
const showModal = async (value: boolean) => {
  store.setShowModalFrequency(value)
}

const updateDateRangeFr = () => {
  if (startDateFr.value && endDateFr.value) {
    const start = new Date(startDateFr.value)
    const end = new Date(endDateFr.value)

    const differenceInTime = end.getTime() - start.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    numberOfDaysFr.value = differenceInDays
    store.setNumberOfDaysFrequency(numberOfDaysFr.value)
  } else {
    numberOfDaysFr.value = null;
  }

  store.setAppointmentDatesFrequency(startDateFr.value, endDateFr.value)
}

watch([startDateFr, endDateFr], () => {
  updateDateRangeFr()
});

const setShowModal = computed(() => store.showModalFrequency)

const closeModal = (value: boolean) => {
  store.setShowModalFrequency(value)
}

const updateFrequency = (value: string) => {
  store.setFrequency(value)
}

</script>
<template>
  <div class="frequency">
    <div>
      <h3>Кратность приема </h3>
      <div class="injection-info-ref">
        <div class="dialyzer-info">Спр. Кр-ть приема</div>
        <div class="injection-info-icon" @click="showModal(true)"></div>
      </div>
    </div>
    <div class="dates">
      <div>
        <h3>Начало приема</h3>
        <input type="date" id="startDateFr" v-model="startDateFr" @change="updateDateRangeFr" />
      </div>
      <div>
        <h3>Конец приема</h3>
        <input type="date" id="endDateFr" v-model="endDateFr" @change="updateDateRangeFr" />
      </div>
      <div>
        <h3>
          Количество дней: <span class="reception-num">{{ numberOfDaysFr! > 0 ? numberOfDaysFr : 0 }}</span>
        </h3>
      </div>
    </div>
    <div class="modal" v-if="setShowModal">
      <div>
        <div class="modal-content">
          <h4>Кратность приема</h4>
          <div class="input-wrap-bicarbonate">
            <input type="radio" id="once" name="frequency" value="1" @change="updateFrequency('1')">
            <label for="once">
              1 раз в день
            </label>
            <input type="radio" id="twice" name="frequency" value="2" @change="updateFrequency('2')">
            <label  for="twice">
              2 раза в день
            </label>
            <input type="radio" id="three-times" name="frequency" value="3" @change="updateFrequency('3')">
            <label  for="three-times">
              3 раза в день
            </label>
          </div>
          <button @click="closeModal(false)" class="modal-close">Закрыть</button>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>