<script setup lang="ts">
defineProps<{
  username: string;
  dinetime: string;
}>();
</script>
<template>
  <div class="player">
    <div class="username">{{ username }}</div>
    <div class="dinetime">{{ dinetime }}秒</div>
  </div>
</template>
<style scoped>
.player {
  margin-top: 85px;
  margin-left: 464px;
  width: 199.002px;
  height: 229px;
  background-color: rgb(221, 221, 221);
  border-radius: 5px;
  border-style: none;
}

.username {
  margin-top: 14px;
  margin-left: 14px;
  background-color: rgb(187, 187, 187);
  border-radius: 5px;
  border-style: none;
}

.dinetime {
  margin-top: 146px;
  margin-left: 125px;
  width: 70px;
  height: 37.0129px;
  background-color: rgb(187, 187, 187);
  border-radius: 5px;
  border-style: none;
}
</style>