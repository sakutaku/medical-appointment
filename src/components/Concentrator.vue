<script setup lang="ts">
import {useSessionStore} from '../stores/session'
import { computed } from 'vue'

const store = useSessionStore()
const size = computed(() => store.concentratorSize)
</script>
<template>
  <div class="concentrator">
    <div>
      <h3>Концентратор</h3>
      <div class="concentrator-wrap">
        <div class="concentrator-info">
          "Спр. Концентраторы"
        </div>
        <div class="concentrator-icon"></div>
      </div>
    </div>
    <div>
      <h3>Объем л.</h3>
      <div class="concentrator-info">{{size}} л.</div>
    </div>
  </div>
</template>