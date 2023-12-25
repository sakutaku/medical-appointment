<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import {computed } from 'vue'

const store = useSessionStore()

const {setDrugHomePath, setDrugHomeDose} = useSessionStore()

const showModal = async (value: boolean, info: string) => {
  store.setShowModalReceiptHome(value, info)
}

const setShowModal = computed(() => store.showModalReceiptHome)

const closeModal = (value: boolean) => {
  store.setShowModalReceiptHome(value, '')
}

const updateReceiptPath = (value: string) => {
  setDrugHomePath(value)
}

const updateReceiptDose = (value: string) => {
  setDrugHomeDose(value)
}

const path = computed(() => store.modalReceiptInfoHome === 'path')
const dose = computed(() => store.modalReceiptInfoHome === 'dose')

</script>
<template>
  <div>
    <div class="reception-home">
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
              <input type="radio" id="per-home" name="path-home" value="Перорально" @change="updateReceiptPath('Перорально')">
              <label for="per-home">
                Перорально
              </label>
              <input type="radio" id="pod-home" name="path-home" value="Подкожно" @change="updateReceiptPath('Подкожно')">
              <label  for="pod-home">
                Подкожно
              </label>
              <input type="radio" id="art-home" name="path-home" value="Артериально" @change="updateReceiptPath('Артериально')">
              <label  for="art-home">
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
              <input type="radio" id="mkg-home" name="dose-home" value="Мкг" @change="updateReceiptDose('Мкг')">
              <label for="mkg-home">
                Мкг
              </label>
              <input type="radio" id="ml-home" name="dose-home" value="Мл" @change="updateReceiptDose('Мл')">
              <label  for="ml-home">
                Мл
              </label>
              <input type="radio" id="kg-home" name="dose-home" value="Кг" @change="updateReceiptDose('Кг')">
              <label  for="kg-home">
                Кг
              </label>
              <input type="radio" id="mg-home" name="dose-home" value="Мг" @change="updateReceiptDose('Мг')">
              <label  for="mg-home">
                Мг
              </label>
            </div>
            <button @click="closeModal(false)" class="modal-close">Закрыть</button>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>