<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import {computed, ref, onMounted, watch} from 'vue'
import Modal from "@/components/Modal.vue"


const {addInjection, setShowModal, setInjectionType, setInjectionSize} = useSessionStore()
const store = useSessionStore()
const log = console.log
log(`store =`, store)

const searchTerm = ref<string>('')
const searchResults = ref<string[]>([])

let needlesArrSize: string[] = []
let catheterArrSize: string[] = []
let needlesArrType: string[] = []
let catheterArrType: string[] = []

onMounted(async () => {
  await store.fetchNeedlesSize()
  await store.fetchNeedlesType()
  await store.fetchCatheterSize()
  await store.fetchCatheterType()
  needlesArrSize = store.needlesSize.toString().split(',')
  needlesArrType = store.needlesType
  catheterArrSize = store.catheterSize.toString().split(',')
  catheterArrType = store.catheterType
})

const updateSearchResults = () => {
  if (store.showModal === false) {
    searchResults.value = [];
  }
}

const selectedItem = ref<number | null>(null)
const selectedSize = ref<number | null>(null)
const selectedType = ref<string>('')

watch(() => store.showModal, () => {
  updateSearchResults();
});
const searchByType = () => {
  const term = searchTerm.value.toLowerCase()
  if (term === '') {
    searchResults.value = [];
  } else {
    store.injection === 'Игла' ?
        searchResults.value = needlesArrType.filter((needle) =>
            needle.toString().toLowerCase().startsWith(term)
        ) : searchResults.value = catheterArrType.filter((cat) =>
            cat.toString().toLowerCase().startsWith(term)
        )
  }

  searchTerm.value = ''
  selectedItem.value = null
}

const searchBySize = () => {
  const term = searchTerm.value;
  if (!term) {
    searchResults.value = [];
  } else {
    store.injection === 'Игла' ?
        searchResults.value = needlesArrSize.filter((needle) =>
            needle.startsWith(term)
        ) : searchResults.value = catheterArrSize.filter((cat) =>
            cat.startsWith(term)
        )
  }

  searchTerm.value = ''
  selectedItem.value = null
}

const updateInjection = (value: string) => {
  addInjection(value)
}
const injection = computed(() => store.injection);

const showModal = async (value: boolean, info: string) => {
  setShowModal(value, info)
}

const selectedBackgroundColor = ref<string>('#6495ED7F')

const addSize = (index: number, item: number) => {
  selectedSize.value = item
  selectedItem.value = index
}

const addType = (index: number, item: string) => {
  selectedType.value = item
  selectedItem.value = index
}

const deleteItem = (index: number) => {
  selectedSize.value = null
  selectedType.value = ''
  index === selectedItem.value ? selectedItem.value = null : null
}

const addInjectionSize = () => {
  selectedSize.value ? setInjectionSize(selectedSize.value) : null
  store.setShowModal(false, '')
}
const addInjectionType = () => {
  setInjectionType(selectedType.value)
  store.setShowModal(false, '')
}
const info = computed(() => store.modalInfo === 'info')
const type = computed(() => store.modalInfo === 'type')

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
            <div class="modal-add-btn" @click="addInjectionSize()">+</div>
          </div>
          <div class="modal-list-wrap">
            <ul class="modal-list">
              <li
                  v-for="(result, index) in searchResults"
                  :key="`${injection}-size-${result}-${index}`"
                  :style="{ backgroundColor: index === selectedItem! ? selectedBackgroundColor : '' }"
              >
                <span>{{ injection }} размер {{ result }}</span>
                <span class="modal-list-btns">
                  <span class="modal-list-delete" @click="deleteItem(index)"></span>
                  <span class="modal-list-add" @click="addSize(index, Number(result))"></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else-if="type">
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
            <div class="modal-add-btn" @click="addInjectionType()">+</div>
          </div>
          <div class="modal-list-wrap">
            <ul class="modal-list">
              <li
                  v-for="(result, index) in searchResults"
                  :key="`${injection}-type-${result}-${index}`"
                  :style="{ backgroundColor: index === selectedItem! ? selectedBackgroundColor : '' }"
              >
                <span>{{ injection }} {{ result }}</span>
                <span class="modal-list-btns">
                  <span class="modal-list-delete"  @click="deleteItem(index)"></span>
                  <span class="modal-list-add" @click="addType(index, result)"></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>