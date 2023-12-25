<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed, ref, watch } from 'vue'
const {setInjectionDrugPath, setInjectionDrugDose } = useSessionStore()
const store = useSessionStore()

const showModal = async (value: boolean, info: string) => {
  store.setShowModalReceipt(value, info)
}
const setShowModal = computed(() => store.showModalReceipt)

const closeModal = (value: boolean, ) => {
  store.setShowModalReceipt(value, '')
}
const updateReceiptPath = (value: string) => {
  setInjectionDrugPath(value)
}

const updateReceiptDose = (value: string) => {
  setInjectionDrugDose(value)
}

const path = computed(() => store.modalReceiptInfo === 'path')
const dose = computed(() => store.modalReceiptInfo === 'dose')

</script>
<template>
  <div class="reception">
    <div>
      <h3>Путь приема</h3>
      <div class="injection-info-ref">
        <div class="dialyzer-info" @click="showModal(true, 'path')">Спр. Путь приема</div>
      </div>
    </div>
    <div>
      <h3>Дозировка </h3>
      <div class="injection-info-ref">
        <div class="dialyzer-info">Спр. Доизровка</div>
        <div class="injection-info-icon" @click="showModal(true, 'dose')"></div>
      </div>
    </div>
    <div class="modal" v-if="setShowModal">
      <div v-if="path">
        <div class="modal-content">
          <h4>Путь приема</h4>
          <div class="input-wrap-bicarbonate">
            <input type="radio" id="per" name="path" value="Перорально" @change="updateReceiptPath('Перорально')">
            <label for="per">
              Перорально
            </label>
            <input type="radio" id="pod" name="path" value="Подкожно" @change="updateReceiptPath('Подкожно')">
            <label  for="pod">
              Подкожно
            </label>
            <input type="radio" id="art" name="path" value="Артериально" @change="updateReceiptPath('Артериально')">
            <label  for="art">
              Артериально
            </label>
          </div>
          <button @click="closeModal(false)" class="modal-close">Закрыть</button>
        </div>
      </div>
      <div v-else-if="dose">
        <div class="modal-content">
          <h4>Дозы препаратов</h4>
          <div class="input-wrap-bicarbonate">
            <input type="radio" id="mkg" name="dose" value="Мкг" @change="updateReceiptDose('Мкг')">
            <label for="mkg">
              Мкг
            </label>
            <input type="radio" id="ml" name="dose" value="Мл" @change="updateReceiptDose('Мл')">
            <label  for="ml">
              Мл
            </label>
            <input type="radio" id="kg" name="dose" value="Кг" @change="updateReceiptDose('Кг')">
            <label  for="kg">
              Кг
            </label>
            <input type="radio" id="mg" name="dose" value="Мг" @change="updateReceiptDose('Мг')">
            <label  for="mg">
              Мг
            </label>
          </div>
          <button @click="closeModal(false)" class="modal-close">Закрыть</button>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>