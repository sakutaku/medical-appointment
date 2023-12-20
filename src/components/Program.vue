
<script setup lang="ts">
import { useSessionStore } from '../stores/session'
import { storeToRefs } from 'pinia'

const { program } = storeToRefs(useSessionStore())
const { addProgram } = useSessionStore()

const updateProgram = (value: string) => {
  addProgram(value)
}

</script>

<template>
  <div class="gemo-appointment">
    <h2>Назначение сеанса гемодиализа</h2>
    <div>
      <h3>Программа аппарата</h3>
      <div class="input-wrap">
          <input type="radio" class="custom-radio" id="hd" name="radio" @click="updateProgram('HD')">
          <label class="label" for="hd">
            HD
          </label>
          <input type="radio" class="custom-radio" id="hdf" name="radio" @click="updateProgram('HDF')">
          <label class="label" for="hdf">
            HDF
          </label>
          <input type="radio" class="custom-radio" id="uf" name="radio" @click="updateProgram('UF')">
          <label class="label" for="uf">
            UF
          </label>
      </div>
    </div>
  </div>
</template>