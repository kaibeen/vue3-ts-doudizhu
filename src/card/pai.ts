export enum 牌规则 {
  单牌, //[1,0,0,0]
  顺子, //[>5,0,0,0]
  双牌, //[0,1,0,0]
  连对, //[0,1,0,0]
  三牌, //[0,0,1,0]
  三带一, //[1,0,1,0]
  三带二, //[0,1,1,0]
  飞机, //[~,~,>2,0]
  四带二,
  炸弹,
  无效,
  任意,
}

/* enum 牌型 {
  单牌 = 1,
} */

export enum 牌类型 {
  三,
  四,
  五,
  六,
  七,
  八,
  九,
  十,
  勾,
  圈,
  开,
  尖,
  二,
  小王,
  大王,
}

export enum 牌花色 {
  方块,
  梅花,
  红桃,
  黑桃,
}

export class 牌 {
  类型: 牌类型;
  花色: 牌花色 = 牌花色.方块;
  constructor(牌类型: 牌类型) {
    this.类型 = 牌类型;
  }

  大于(比较牌: 牌) {
    return this.类型 > 比较牌.类型;
  }
}

export class 牌组 {
  成员: Array<牌> = [];
  规则: 牌规则 = 牌规则.无效;
  加入牌(单牌: 牌) {
    this.成员.push(单牌);
    return this;
  }
  移除牌(单牌: 牌) {
    const index = this.成员.indexOf(单牌);
    this.成员.splice(index, 1);
    return this;
  }
  移除牌组(牌组: 牌组) {
    牌组.成员.forEach((单牌) => {
      this.移除牌(单牌);
    });
    return this;
  }
  加入牌组(牌组: 牌组) {
    牌组.成员.forEach((单牌) => {
      this.加入牌(单牌);
    });
    return this;
  }
  获取牌类型数组() {
    return this.成员.map((item) => item.类型);
  }
  获取某张牌(索引: number) {
    return this.成员[索引];
  }
  比目标牌大(要比较的牌: 牌组) {
    const 牌队1 = 规则.获取牌队(this.获取牌类型数组());
    const 牌队2 = 规则.获取牌队(要比较的牌.获取牌类型数组());
    switch (this.规则) {
      case 牌规则.单牌:
        return 牌队1[0][0] > 牌队2[0][0];
      case 牌规则.双牌:
        return 牌队1[1][0] > 牌队2[1][0];
      case 牌规则.三牌:
      case 牌规则.三带一:
      case 牌规则.三带二:
        return 牌队1[2][0] > 牌队2[2][0];
      case 牌规则.炸弹:
      case 牌规则.任意:
        return false;
    }
    return false;
  }
  按大小排序() {
    this.成员.sort((牌a, 牌b) => {
      if (牌a.类型 === 牌b.类型) return 牌a.花色 - 牌b.花色;
      return 牌a.类型 - 牌b.类型;
    });
  }
}

export class 规则 {
  static 识别规则(手牌: 牌组) {
    const 牌队 = this.获取牌队(手牌.获取牌类型数组());
    console.warn(牌队);
    if (this.核查个数(牌队, 1, 0, 0, 0)) {
      return 牌规则.单牌;
    } else if (
      this.核查个数(牌队, [0, 4], 0, 0, 0) &&
      this.是否连顺(牌队[0]) &&
      牌队[0][0] <= 牌类型.尖 // 顺子最大为尖
    ) {
      return 牌规则.顺子;
    } else if (this.核查个数(牌队, 0, 1, 0, 0)) {
      return 牌规则.双牌;
    } else if (
      this.核查个数(牌队, 0, [0, 2], 0, 0) &&
      this.是否连顺(牌队[1]) &&
      牌队[1][0] <= 牌类型.二 // 连对最大为2
    ) {
      return 牌规则.连对;
    } else if (this.核查个数(牌队, 0, 0, 1, 0)) {
      return 牌规则.三牌;
    } else if (this.核查个数(牌队, 1, 0, 1, 0)) {
      return 牌规则.三带一;
    } else if (this.核查个数(牌队, 0, 1, 1, 0)) {
      return 牌规则.三带二;
    } else if (this.核查个数(牌队, 0, 0, 0, 1)) {
      /* else if (this.核查个数(牌队, [0, -1], [0, -1], [0, 1], 0) && this.是否连顺(牌队[2])) {
      // 这里有点复杂,
      // 可以 3*3 + 1*2 + 1*1 
      // 可以 3*3 + 1*3 !!这里有3个是连的,另一个不用
      // 可以 3*3 + 3*1  似乎不能用核查个数这个函数了 特殊的抽取出来然后定义一个单独的程序来
      // 来分析分支情况,四代二也是,暂时不考虑吧,暂时不能飞机只能单独3带
      return 牌规则.飞机;
    } */
      return 牌规则.炸弹;
    } else if (
      this.核查个数(牌队, 2, 0, 0, 0) &&
      牌队[0][0] === 牌类型.大王 &&
      牌队[0][1] === 牌类型.小王
    ) {
      return 牌规则.炸弹;
    }
    return 牌规则.无效;
  }
  static 给五十四张随机顺序的牌() {
    function swap(array: number[], i1: number, i2: number) {
      const temp = array[i1];
      array[i1] = array[i2];
      array[i2] = temp;
    }
    // 正常排序为同花色3->A *4 + 小大王
    const array: number[] = [];
    for (let i = 0; i < 54; i++) {
      array[i] = i;
    }
    for (let i = 53; i >= 0; i--) {
      const swapIndex = Math.floor(Math.random() * i);
      swap(array, i, swapIndex);
    }

    const 花色 = [牌花色.方块, 牌花色.梅花, 牌花色.红桃, 牌花色.黑桃];
    function 根据数字获取具体单牌(num: number) {
      if (num === 52) return new 牌(牌类型.小王);
      if (num === 53) return new 牌(牌类型.大王);
      const 单牌 = new 牌(num % 13);
      单牌.花色 = 花色[(num - (num % 13)) / 13];
      return 单牌;
    }

    function 获取牌组(start: number, end: number) {
      const 新牌组 = new 牌组();
      新牌组.成员 = array
        .slice(start, end)
        .map(根据数字获取具体单牌)
        .sort((牌a, 牌b) => {
          if (牌a.类型 === 牌b.类型) return 牌a.花色 - 牌b.花色;
          return 牌a.类型 - 牌b.类型;
        });
      return 新牌组;
    }

    return [
      获取牌组(0, 17),
      获取牌组(17, 34),
      获取牌组(34, 51),
      获取牌组(51, 54),
    ];
  }

  // 按照个数大小和牌类型大小来排序
  static 获取牌队(牌类型数组: Array<牌类型>) {
    const 牌型表 = new Map<牌类型, number>();
    牌类型数组.forEach((类型) => {
      const 当前类型 = 牌型表.get(类型);
      if (typeof 当前类型 === "number") {
        牌型表.set(类型, 当前类型 + 1);
      } else {
        牌型表.set(类型, 1);
      }
    });
    const 牌队: Array<Array<牌类型>> = [[], [], [], []];
    Array.from(牌型表)
      .sort(([牌类型, 个数], [牌类型2, 个数2]) => {
        if (个数 !== 个数2) return 个数2 - 个数;
        return 牌类型2 - 牌类型;
      })
      .forEach(([牌类型, 个数]) => {
        牌队[个数 - 1].push(牌类型);
      });
    return 牌队;
  }

  static 核查个数(
    array: Array<Array<牌类型>>,
    i0: 特殊符号 = 0,
    i1: 特殊符号 = 0,
    i2: 特殊符号 = 0,
    i3: 特殊符号 = 0
  ) {
    return (
      (typeof i0 === "number"
        ? array[0].length === i0
        : i0[0] === 0
        ? array[0].length > i0[1]
        : array[0].length < i0[1]) &&
      (typeof i1 === "number"
        ? array[1].length === i1
        : i1[0] === 0
        ? array[1].length > i1[1]
        : array[1].length < i1[1]) &&
      (typeof i2 === "number"
        ? array[2].length === i2
        : i2[0] === 0
        ? array[2].length > i2[1]
        : array[2].length < i2[1]) &&
      (typeof i3 === "number"
        ? array[3].length === i3
        : i3[0] === 0
        ? array[3].length > i3[1]
        : array[3].length < i3[1])
    );
  }

  // 降序牌是否连续
  static 是否连顺(牌子数组: Array<牌类型>) {
    return 牌子数组.every((牌子, 牌索引) => {
      if (牌索引 === 牌子数组.length - 1) return true;
      return 牌子 - 1 === 牌子数组[牌索引 + 1];
    });
  }
}

type 大于 = 0;
type 小于 = 1;
type 特殊符号 = number | [大于 | 小于, number]; // 单独number表示等于

export class 玩家 {
  名称: string;
  手牌: 牌组 = new 牌组();
  已选的牌: 牌组 = new 牌组();
  所属牌局: 牌局 | null = null;
  出牌() {
    if (this.已选牌组符合规则()) {
      const 所属牌局 = <牌局>this.所属牌局;
      所属牌局.牌权归属 = this;
      const 出的牌 = this.已选的牌;
      this.移除牌();
      所属牌局.当前玩家操作回合结束();
      所属牌局.前一个玩家出的牌 = 出的牌;
    }
  }
  // 获取提示(挑战牌: 牌组) { };
  不出跳过() {
    const 所属牌局 = <牌局>this.所属牌局;
    所属牌局.当前玩家操作回合结束();
  }
  选牌(手牌索引: number) {
    const pai = this.手牌.获取某张牌(手牌索引);
    if (this.已选的牌.成员.includes(pai)) {
      this.已选的牌.移除牌(pai);
    } else {
      this.已选的牌.加入牌(pai);
    }
    this.已选的牌.规则 = 规则.识别规则(this.已选的牌);
  }
  发牌(分到的牌: 牌组) {
    this.手牌.加入牌组(分到的牌);
  }
  已选牌组符合规则() {
    const 所属牌局 = <牌局>this.所属牌局;
    if (所属牌局.牌权归属 === this) {
      return this.已选的牌.规则 !== 牌规则.无效;
    }
    const 对比的牌 = 所属牌局.前一个玩家出的牌;
    const 对比的牌规则 = 对比的牌.规则;

    return this.已选的牌.规则 === 对比的牌规则 && this.比前一手牌大(对比的牌);
  }
  没牌了() {
    return this.手牌.成员.length === 0;
  }
  移除牌() {
    /* 把选中的牌从手牌中移除 */ this.手牌.移除牌组(this.已选的牌);
    this.已选的牌 = new 牌组();
  }
  比前一手牌大(对比的牌: 牌组) {
    return this.已选的牌.比目标牌大(对比的牌);
  }
  // 抢地主() { };
  // 等待中() { };
  constructor(角色名: string) {
    this.名称 = 角色名;
  }
  胜利() {
    return `${this.名称}赢了`;
  }
}

export class 牌局 {
  玩家们 = [new 玩家("玩家一号"), new 玩家("玩家二号"), new 玩家("玩家三号")];
  前一个玩家出的牌 = new 牌组();
  当前玩家 = this.玩家们[0];
  牌权归属 = this.玩家们[0];
  地主牌 = new 牌组();
  constructor() {
    this.玩家们.forEach((玩家) => (玩家.所属牌局 = this));
  }
  开始发牌() {
    const 玩家一号 = this.玩家们[0];
    const 玩家二号 = this.玩家们[1];
    const 玩家三号 = this.玩家们[2];
    const 已打乱的牌 = 规则.给五十四张随机顺序的牌();
    玩家一号.发牌(已打乱的牌[0]);
    玩家二号.发牌(已打乱的牌[1]);
    玩家三号.发牌(已打乱的牌[2]);
    玩家一号.发牌(已打乱的牌[3]);
    玩家一号.手牌.按大小排序();
    this.地主牌 = 已打乱的牌[3];
  }
  地主分配() {
    /* 先直接给玩家1 */
  }
  当前玩家操作() {
    //
  }
  判断输赢() {
    return this.当前玩家.没牌了();
  }
  当前玩家操作回合结束() {
    if (this.判断输赢()) {
      this.宣告胜利();
    } else {
      this.切换轮次();
    }
  }
  切换轮次() {
    const 当前玩家索引 = this.玩家们.indexOf(this.当前玩家);
    this.当前玩家 = this.玩家们[(当前玩家索引 + 1) % 3];
  }
  宣告胜利() {
    alert(this.当前玩家.胜利());
  }
}

(function test() {
  const 来一盘 = new 牌局();
  来一盘.开始发牌();
  来一盘.地主分配();
  来一盘.当前玩家.选牌(0); //监听操作
  来一盘.当前玩家操作(); //监听操作
  let 回合数 = 1;
  while (!来一盘.判断输赢()) {
    回合数++;
    来一盘.切换轮次();
    来一盘.当前玩家.选牌(0); //监听操作
    来一盘.当前玩家操作(); //监听操作
  }
  来一盘.宣告胜利();
});
