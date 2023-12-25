<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import {computed, watch, ref} from "vue";
const {addBicarbonateType } = useSessionStore()

const store = useSessionStore()
const type = computed(() => store.bicarbonateType === 'Твердый')
const showModal = async (value: boolean, info: string) => {
  store.setShowModalBic(value, info)
}

const updateBicarbonate = (value: string) => {
  addBicarbonateType(value)
}

const closeModal = (value: boolean) => {
  store.setShowModalBic(value, '')
}

const setShowModalBic = computed(() => store.showModalBicarbonate)
const bicarbonate = computed(() => store.modalInfo === 'bicarbonate');

const inputValue = ref('');
watch(inputValue, (newValue) => {
  store.addBicarbonate(newValue);
});
</script>

<template>
  <div class="bicarbonate">
    <h3>Бикарбонат</h3>
    <div class="injection-info-ref">
      <input type="text" v-model="inputValue" class="input-text">
      <div v-if="type" class="injection-ref"> гр</div>
      <div v-else class="injection-ref"> л</div>
      <div class="injection-info-icon" @click="showModal(true, 'bicarbonate')"></div>
    </div>
    <div class="modal" v-if="setShowModalBic">
      <div class="modal-content"  v-if="bicarbonate">
        <div>
          <h4>Тип Бикарбоната</h4>
          <div class="input-wrap-bicarbonate">
            <input type="radio" id="solid" name="bicarbonate" value="Твердый" @change="updateBicarbonate('Твердый')">
            <label for="solid">
              Твердый
            </label>
            <input type="radio" id="liquid" name="bicarbonate" value="Жидкий" @change="updateBicarbonate('Жидкий')">
            <label  for="liquid">
              Жидкий
            </label>
          </div>
        </div>
        <button @click="closeModal(false)" class="modal-close">Закрыть</button>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>