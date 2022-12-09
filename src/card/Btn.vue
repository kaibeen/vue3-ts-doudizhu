<script setup lang="ts">
withDefaults(
  defineProps<{
    isBan?: boolean;
  }>(),
  {
    isBan: false,
  }
);

defineEmits(["click"]);
</script>
<template>
  <div class="btn" @click="$emit('click')" :class="{ ban: isBan }">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.btn {
  width: 68px;
  height: 40.0043px;
  background-color: green;
  border-radius: 5px;
  border-style: none;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  &&.ban {
    background-color: rgb(19, 69, 19);
    cursor: not-allowed;
    color: #999;
  }
}
</style>
