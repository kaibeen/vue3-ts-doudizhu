<script setup lang="ts">
import { ref } from "vue";
import Btn from "./Btn.vue";
import Group from "./Group.vue";
import Player from "./Player.vue";
import { 牌局, 牌组 } from "./pai";
import { computed } from "@vue/reactivity";

const 来一盘 = new 牌局();
const states = ref(来一盘);
states.value.开始发牌();
states.value.地主分配();

// 定义数据和处理方法,直接往下传递

// computed(props.selected)
function 跳过() {
  states.value.当前玩家.不出跳过();
}

function 出牌() {
  states.value.当前玩家.出牌();
}
function 提示() {
  states.value.当前玩家.出牌();
}
function selectCard(index: number) {
  states.value.当前玩家.选牌(index);
}

const 上家 = computed(function () {
  const prevIndex = states.value.玩家们.indexOf(states.value.当前玩家) + 2;
  return states.value.玩家们[prevIndex % 3];
});
const 下家 = computed(function () {
  const nextIndex = states.value.玩家们.indexOf(states.value.当前玩家) + 1;
  return states.value.玩家们[nextIndex % 3];
});

const isBan = computed(function () {
    return !states.value.当前玩家.已选牌组符合规则();
});

const isBan2 = computed(function () {
  return states.value.当前玩家 === states.value.牌权归属;
});
</script>
<template>
  <div class="game">
    <div class="dizhu-cards">
      <Group :is-divide="true" :cards="states.地主牌.成员"></Group>
    </div>
    <div class="game-mid">
      <div class="others-box">
        <div class="others-avatar">{{ 上家.名称 }}</div>
        <div class="others-cards">{{ 上家.手牌.成员.length }}</div>
      </div>
      <div class="others-box">
        <div class="others-avatar">{{ 下家.名称 }}</div>
        <div class="others-cards">{{ 下家.手牌.成员.length }}</div>
      </div>
    </div>
    <div class="my">
      <div class="others-avatar">{{ states.当前玩家.名称 }}</div>
      <div class="my-box">
        <div class="my-btn-box">
          <Btn @click="跳过()" :isBan="isBan2">跳过</Btn>
          <Btn @click="出牌()" :isBan="isBan">出牌</Btn>
          <Btn @click="提示()">提示</Btn>
        </div>
        <div class="my-cards">
          <Group
            :is-big-size="true"
            :canOperate="true"
            :selectsCards="states.当前玩家.已选的牌.成员"
            :cards="states.当前玩家.手牌.成员"
            @select="selectCard"
          ></Group>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
div {
  // border: 1px solid #666;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 0 0 auto;
}

.game {
  margin-top: 6px;
  margin-left: 20px;
  margin-right: 20px;
  height: 607.009px;
  background-color: rgb(221, 221, 221);
  border-radius: 5px;
  border-style: none;
  align-items: center;
}

.dizhu-cards {
  margin-top: 6px;
  width: 333px;
  height: 105.017px;
  background-color: rgb(187, 187, 187);
  border-radius: 5px;
  border-style: none;
}

.game-mid {
  margin-top: 12px;
  margin-left: 11px;
  margin-right: 11px;
  height: 234.013px;
  background-color: rgb(187, 187, 187);
  border-radius: 5px;
  border-style: none;
  flex-direction: row;
}

.others-box {
  margin-top: 7px;
  margin-left: 10px;
  width: 408px;
  height: 221.019px;
  background-color: rgb(153, 153, 153);
  border-radius: 5px;
  border-style: none;
  flex-direction: row;
}

.others-avatar {
  margin-top: 5px;
  margin-left: 11px;
  width: 186.017px;
  height: 209.019px;
  background-color: rgb(119, 119, 119);
  border-radius: 5px;
  border-style: none;
}

.others-cards {
  margin-top: 33px;
  margin-left: 7px;
  width: 197px;
  height: 87.028px;
  background-color: rgb(119, 119, 119);
  border-radius: 5px;
  border-style: none;
}

.my-box {
  margin-top: 4px;
  width: 619.007px;
  height: 241.007px;
  background-color: rgb(187, 187, 187);
  border-radius: 5px;
  border-style: none;
  justify-content: center;
}

.my-btn-box {
  width: 400px;
  margin: 4px auto 0;
  height: 56.0086px;
  background-color: rgb(153, 153, 153);
  border-radius: 5px;
  border-style: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.my-cards {
  margin-top: 43.9482px;
  margin-left: 6px;
  width: 607.011px;
  height: 130.009px;
  background-color: rgb(153, 153, 153);
  border-radius: 5px;
  border-style: none;
}

.my {
  display: flex;
  flex-direction: row;
}
</style>
