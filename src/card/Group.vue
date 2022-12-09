<script setup lang="ts">
import Single from "./Single.vue";
import type { 牌 } from "./pai";

const emit = defineEmits(["select"]);

const props = withDefaults(
  defineProps<{
    cards: 牌[];
    selectsCards?: 牌[];
    isDivide?: boolean;
    canOperate?: boolean;
    isBigSize?: boolean;
  }>(),
  {
    selectsCards: () => [],
    isBigSize: false,
    canOperate: false,
    isDivide: false,
  }
);

function selectCard(index: number) {
  emit("select", index);
}

function isSelect(index: number) {
  return props.selectsCards.includes(props.cards[index]);
}
</script>
<template>
  <div class="card-group">
    <div :class="{ 'is-Divide': !isDivide }" v-for="(card, i) in props.cards">
      <Single
        :type="card.类型"
        :color="card.花色"
        :selected="isSelect(i)"
        :isBigSize="props.isBigSize"
        @click="selectCard(i)"
        :props="cards"
      />
    </div>
  </div>
</template>
<style scoped lang="less">
.card-group {
  background-color: rgb(221, 221, 221);
  border-radius: 5px;
  border-style: none;
  flex-direction: row;

  > .is-Divide {
    // transform: translateX(-80%);
    margin-left: -95px;
    border: 1px solid #333;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
