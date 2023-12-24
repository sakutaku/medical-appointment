<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import {computed, ref, onMounted, watch} from 'vue'
import Modal from "@/components/Modal.vue"
import type {Catheter, Needles} from "@/types"


const {addInjection, setShowModal} = useSessionStore()
const store = useSessionStore()
const log = console.log
log(`store =`, store)

const searchTerm = ref<string>('')
const searchResults = ref<Needles[]>([])

let needlesArr: Needles[] = []
let catheterArr: Catheter[] = []

onMounted(async () => {
  await store.fetchNeedles()
  await store.fetchCatheter()
  needlesArr = store.needles
  catheterArr = store.catheter
});

const updateSearchResults = () => {
  if (store.showModal === false) {
    searchResults.value = [];
  }
};

watch(() => store.showModal, () => {
  updateSearchResults();
});
const searchByType = () => {
  const term = searchTerm.value.trim().toLowerCase()
  if (term === '') {
    searchResults.value = [];
  } else {
    store.injection === 'Игла' ?
        searchResults.value = needlesArr.filter((needle) =>
            needle.type.toLowerCase().startsWith(term)
        ) : searchResults.value = catheterArr.filter((cat) =>
            cat.type.toLowerCase().startsWith(term)
        )
  }

  searchTerm.value = '';
};

const searchBySize = () => {
  const term = searchTerm.value.trim().toLowerCase();
  if (term === '') {
    searchResults.value = [];
  } else {
    store.injection === 'Игла' ?
        searchResults.value = needlesArr.filter((needle) =>
            needle.size.toString().toLowerCase().startsWith(term)
        ) : searchResults.value = catheterArr.filter((cat) =>
            cat.size.toString().toLowerCase().startsWith(term)
        )
  }

  searchTerm.value = '';
}

const updateInjection = (value: string) => {
  addInjection(value)
}
const injection = computed(() => store.injection);

const showModal = async (value: boolean, info: string) => {
  setShowModal(value, info)
  await store.fetchNeedles()
}

interface Result {
  id: string;
  size: number;
}

const selectedResult = ref<Result | null>(null);
const selectedBackgroundColor = ref<string>('#6495ED7F');

const selectItem = (result: Result) => {
  selectedResult.value = result;
};

const deleteItem = (result: Result) => {
  if (result === selectedResult.value) {
    selectedResult.value = null;
  }
}

const addItem = (result: Result) => {
  selectItem(result);
};

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
              <input type="search" class="modal-input" id="symbol" autoComplete="off" name="size" v-model="searchTerm">
              <label for="symbol" class="modal-label">Поиск позиции по первым символам</label>
            </div>
            <div class="modal-input-search" @click="searchBySize"></div>
          </div>
          <div class="modal-add">
            <div class="modal-add-txt">Добавить новую запись</div>
            <div class="modal-add-btn">+</div>
          </div>
          <div class="modal-list-wrap">
            <ul class="modal-list">
              <li v-for="result in searchResults" :key="result.id"
                  :style="{ backgroundColor: result === selectedResult ? selectedBackgroundColor : '' }"
                  @click="selectItem(result)">
                <span>{{ injection }} размер {{ result.size }}</span>
                <span class="modal-list-btns">
                  <span class="modal-list-delete" @click="deleteItem(result)"></span>
                  <span class="modal-list-add" @click="addItem(result)"></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <h2 class="modal-title">{{ injection }}</h2>
          <div class="modal-search">
            <div class="modal-input-wrap">
              <input type="search" class="modal-input" id="type" autoComplete="off" name="type" v-model="searchTerm">
              <label for="type" class="modal-label">Поиск позиции по первым символам</label>
            </div>
            <div class="modal-input-search" @click="searchByType"></div>
          </div>
          <div class="modal-add">
            <div class="modal-add-txt">Добавить новую запись</div>
            <div class="modal-add-btn">+</div>
          </div>
          <div class="modal-list-wrap">
            <ul class="modal-list">
              <li v-for="result in searchResults" :key="result.id"
                  :style="{ backgroundColor: result === selectedResult ? selectedBackgroundColor : '' }"
                  @click="selectItem(result)">
                <span>{{ injection }} {{ result.type }}</span>
                <span class="modal-list-btns">
                  <span class="modal-list-delete" @click="deleteItem(result)"></span>
                  <span class="modal-list-add" @click="addItem(result)"></span>
                  </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>