<script setup lang="ts">
import type { 牌类型, 牌花色 } from "./pai";

defineProps<{
  type: 牌类型;
  color: 牌花色;
  selected: boolean;
  isBigSize: boolean;
}>();

// computed(props.selected)
function trans(type: 牌类型) {
  return [
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "勾",
    "圈",
    "开",
    "尖",
    "二",
    "小王",
    "大王",
  ][type];
}

function trans2(color: 牌花色) {
  return ["方块", "梅花", "红桃", "黑桃"][color];
}

defineEmits(["click"]);
</script>
<template>
  <div
    class="single"
    :class="{ selected, 'big-size': isBigSize }"
    @click="$emit('click')"
  >
    <div class="type">{{ trans(type) }}</div>
    <div class="color">{{ trans2(color) }}</div>
  </div>
</template>

<style scoped lang="less">
.single {
  width: 80px;
  height: 120px;
  background-color: rgb(187, 187, 187);
  border-radius: 5px;
  border-style: none;

  &&.selected {
    transform: translateY(-40%);
  }

  &&.big-size {
    width: 120px;
    height: 180px;
  }
}

.type {
  margin-top: 6px;
  margin-left: 6px;
  width: 35.0156px;
  height: 19.0156px;
  background-color: rgb(153, 153, 153);
  border-radius: 5px;
  border-style: none;
}

.color {
  margin-top: 4px;
  margin-left: 8px;
  width: 23.0178px;
  height: 22.0134px;
  background-color: rgb(153, 153, 153);
  border-radius: 5px;
  border-style: none;
}
</style>
