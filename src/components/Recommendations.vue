<script lang="ts" setup>
const currentDate = () => {
  const current = new Date();
  return `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
}
</script>
<template>
  <div class="recommendations">
    <h3>Рекомендации</h3>
    <div>
      <div class="modal-add">
        <div class="modal-add-txt">Текст рекомендации пациенту</div>
        <div class="modal-add-btn">+</div>
      </div>
      <div>
        <textarea/>
      </div>
      <div class="recommendations-doctor">
        <div class="recommendations-date">{{currentDate()}}</div>
        <div class="recommendations-name">ФИО лечащего врача</div>
        <div class="recommendations-title">Должность</div>
      </div>
    </div>
  </div>
</template>