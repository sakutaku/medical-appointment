<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import {computed, ref, watch, onMounted} from 'vue'

const store = useSessionStore()
const {setInjectionDrug} = useSessionStore()

let drugsArr: string[] = []
const searchDrugResults = ref<string[]>([])

onMounted(async () => {
  await store.fetchDrugs()
  drugsArr = store.drugs
})

const updateSearchDrugResults = () => {
  if (store.showModalDrug === false) {
    searchDrugResults.value = [];
  }
}

const searchDrug = ref<string>('')
const selectedItemDrug = ref<number | null>(null)
const selectedName = ref<string>('')

watch(() => store.showModalDrug, () => {
  updateSearchDrugResults();
});

const searchByName = () => {
  const term = searchDrug.value.toLowerCase()
  if (term === '') {
    searchDrugResults.value = [];
  } else {
    searchDrugResults.value = drugsArr.filter((drug) => {
      return drug.toString().toLowerCase().startsWith(term);
    })
  }
  console.log(searchDrugResults.value);
  searchDrug.value = ''
  selectedItemDrug.value = null
}

const selectedBackgroundColor = ref<string>('#6495ED7F')
const addDrug = () => {
  console.log(selectedName.value);
  selectedName.value ? setInjectionDrug(selectedName.value) : null
  store.setShowModalDrug(false)
}

const addSize = (index: number, item: string) => {
  selectedName.value = item
  selectedItemDrug.value = index
}

const deleteItem = (index: number) => {
  selectedName.value = null
  index === selectedItemDrug.value ? selectedItemDrug.value = null : null
}

const showModal = async (value: boolean) => {
  store.setShowModalDrug(value)
}
const setShowModal = computed(() => store.showModalDrug)

const closeModal = (value: boolean) => {
  store.setShowModalDrug(value)
}

</script>
<template>
  <div class="drug">
    <h2>Назначение сеанса гемодиализа</h2>
    <div>
      <h3>Лекарственный препарат</h3>
      <div class="injection-info-ref">
        <div class="dialyzer-info">Спр. "Препараты"</div>
        <div class="injection-info-icon" @click="showModal(true)"></div>
      </div>
    </div>
    <div class="modal" v-if="setShowModal">
      <div class="modal-content">
        <div>
          <h2 class="modal-title">Лекарственные препараты</h2>
          <div class="modal-search">
            <div class="modal-input-wrap">
              <input type="search" class="modal-input" id="drug" autoComplete="off" name="drug" v-model="searchDrug">
              <label for="drug" class="modal-label">Поиск позиции по первым символам</label>
            </div>
            <div class="modal-input-search" @click="searchByName"></div>
          </div>
          <div class="modal-add">
            <div class="modal-add-txt">Добавить новую запись</div>
            <div class="modal-add-btn" @click="addDrug()">+</div>
          </div>
          <div class="modal-list-wrap">
            <ul class="modal-list">
              <li
                  v-for="(result, index) in searchDrugResults"
                  :key="`${result}-${index}`"
                  :style="{ backgroundColor: index === selectedItemDrug! ? selectedBackgroundColor : '' }"
              >
                <span>Препарат {{ result }}</span>
                <span class="modal-list-btns">
                  <span class="modal-list-delete" @click="deleteItem(index)"></span>
                  <span class="modal-list-add" @click="addSize(index, result)"></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <button @click="closeModal(false)" class="modal-close">Закрыть</button>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>