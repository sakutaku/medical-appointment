<script setup lang="ts">
import Program from '@/components/Program.vue'
import Dialyzer from "@/components/Dialyzer.vue";
import Concentrator from "@/components/Concentrator.vue";
import Injection from "@/components/Injection.vue";

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
    </div>
  </main>
</template>
