<script setup lang="ts">
import Program from '@/components/Program.vue'
import Dialyzer from "@/components/Dialyzer.vue";
import Concentrator from "@/components/Concentrator.vue";
import Injection from "@/components/Injection.vue";
import {useSessionStore} from "@/stores/session";
import Bicarbonate from "@/components/Bicarbonate.vue";
import Weight from "@/components/Weight.vue";
import Anticoagulants from "@/components/Anticoagulants.vue";
import Appointment from "@/components/Appointment.vue";
import Drug from "@/components/Drug.vue";
import Reception from "@/components/Reception.vue";
import Numbers from "@/components/Numbers.vue";
import ReceptionTable from "@/components/ReceptionTable.vue";
const store = useSessionStore()

</script>

<template>
  <main>
    <div class="gemo">
      <h1 class="gemo-title">Сеанс гемодиализа</h1>
      <div class="gemo-txt">№ в месяце: <span>4</span></div>
    </div>
    <div>
      <Program/>
      <Dialyzer/>
      <Concentrator/>
      <Injection/>
      <div class="bic-wrap">
        <Bicarbonate/>
        <Weight/>
        <Anticoagulants/>
      </div>
      <Appointment/>
      <Drug/>
      <Reception/>
      <Numbers/>
      <ReceptionTable/>
    </div>
  </main>
</template>
