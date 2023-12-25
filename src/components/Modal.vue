<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed } from 'vue'

const store = useSessionStore()
const showModal = computed(() => store.showModal)

const closeModal = (value: boolean) => {
  useSessionStore().setShowModal(value, '')
}
</script>
<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <slot></slot>
      <button @click="closeModal(false)" class="modal-close">Закрыть</button>
    </div>
  </div>
</template>
