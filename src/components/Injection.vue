<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import {computed} from 'vue'
import Modal from "@/components/Modal.vue";

const {addInjection, setShowModal} = useSessionStore()
const store = useSessionStore()
const log = console.log;
log(`store =`, store);

const updateInjection = (value: string) => {
  addInjection(value)
}
const injection = computed(() => store.injection);

const showModal = (value: boolean, info: string) => {
  setShowModal(value, info)
}

const info = computed(() => store.modalInfo === 'info')

</script>
<template>
  <div class="gemo-appointment">
    <h2>Назначение сеанса гемодиализа</h2>
    <div>
      <h3>Тип инъекции</h3>
      <div class="input-wrap-injection">
        <input type="radio" class="custom-radio-two" id="needle" name="radio-two" value="Игла"
               @change="updateInjection('Игла')">
        <label class="label-two" for="needle">
          Игла
        </label>
        <input type="radio" class="custom-radio-two" id="catheter" name="radio-two" value="HDF"
               @change="updateInjection('Катетер')">
        <label class="label-two" for="catheter">
          Катетер
        </label>
      </div>
      <div>
        <div v-if="injection" class="injection-info">
          <div class="injection-info-ref">
            <div class="injection-ref">Спр. "{{ injection }}"</div>
            <div class="injection-info-icon" @click="showModal(true, 'info')"></div>
          </div>
          <div class="injection-info-type">
            <div class="injection-type">Спр. "Типы {{ injection }}"</div>
            <div class="injection-info-icon" @click="showModal(true, 'type')"></div>
          </div>
        </div>
        <div v-else></div>
      </div>
    </div>
    <Modal>
      <div>
        <div v-if="info">
          <h2 class="modal-title">Лекарственные препараты</h2>
          <div class="modal-search">
            <div class="modal-input-wrap">
              <input type="text" class="modal-input" id="symbol" autoComplete="off" name="symbol">
              <label for="symbol" class="modal-label">Поиск позиции по первым символам</label>
            </div>
            <div class="modal-input-search"></div>
          </div>
          <div class="modal-add">
            <div class="modal-add-txt">Добавить новую запись</div>
            <div class="modal-add-btn">+</div>
          </div>
        </div>
        <div v-else>
          <h2 class="modal-title">{{injection}}</h2>
          <div class="modal-search">
            <div class="modal-input-wrap">
              <input type="text" class="modal-input" id="symbol" autoComplete="off" name="symbol">
              <label for="symbol" class="modal-label">Поиск позиции по первым символам</label>
            </div>
            <div class="modal-input-search"></div>
          </div>
          <div class="modal-add">
            <div class="modal-add-txt">Добавить новую запись</div>
            <div class="modal-add-btn">+</div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>