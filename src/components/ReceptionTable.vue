<script setup lang="ts">
import {useSessionStore} from '../stores/session'

const store = useSessionStore()

const deleteSession = (index: number) => {
  store.sessions.splice(index, 1);
}

</script>
<template>
  <div class="weight">
    <h3>Список назначений после сеансов</h3>
    <div>
      <table>
        <thead>
        <tr>
          <th>Лекарственный препарат</th>
          <th>Путь приема</th>
          <th>Дозировка</th>
          <th>Номер сеанса</th>
          <th>Начало приема</th>
          <th>Конец приема</th>
          <th>Дней</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(session, index) in store.sessions" :key="index">
          <td>{{ session.chosenDrug }}</td>
          <td>{{ session.chosenReceiptPath }}</td>
          <td>{{ session.chosenReceiptDose }}</td>
          <td>{{ session.numbers.join(', ') }}</td>
          <td>{{ session.startDate }}</td>
          <td>{{ session.endDate }}</td>
          <td>{{ session.day }}</td>
          <td>
            <button @click="deleteSession(index)" class="table-delete"></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>