<script setup lang="ts">
import {useSessionStore} from '../stores/session'

const {addProgram, addConcentratorSize} = useSessionStore()
const updateProgram = (value: string) => {
  addProgram(value)
  if (value === 'HD') {
    addConcentratorSize(10)
  } else if (value === 'HDF') {
    addConcentratorSize(20)
  } else {
    addConcentratorSize(30)
  }
}

</script>
<template>
  <div class="gemo-appointment">
    <h2>Назначение сеанса гемодиализа</h2>
    <div>
      <h3>Программа аппарата</h3>
      <div class="input-wrap">
        <input type="radio" class="custom-radio" id="hd" name="radio" value="HD" @change="updateProgram('HD')">
        <label class="label" for="hd">
          HD
        </label>
        <input type="radio" class="custom-radio" id="hdf" name="radio" value="HDF" @change="updateProgram('HDF')">
        <label class="label" for="hdf">
          HDF
        </label>
        <input type="radio" class="custom-radio" id="uf" name="radio" value="UF" @change="updateProgram('UF')">
        <label class="label" for="uf">
          UF
        </label>
      </div>
    </div>
  </div>
</template>