<template>
  <div class="seed container">
    <div class="none" v-title>孵蛋价格计算 - 小章鱼</div>
    <div class="row ">
      <!--<h3>所有图片来源于互联网</h3>-->
      <object :data="logo" alt="" style="width: 75px"></object>
      <br><br>
    </div>
    <!--<div :class="searchClass">-->
    <!--<Input class="input" v-model="input" @keyup.enter.native="isSearch" placeholder="所有资源来源于互联网">-->
    <!--<Button slot="append" icon="ios-search" type="success" @click="isSearch">搜索哈希</Button>-->
    <!--</Input>-->
    <!--</div>-->
    <div class="row">
      <div class="col-lg-3">
        <Input v-model="pm" size="large" placeholder="素材单价">
        <span slot="prepend"><img class="img-pm" src="../assets/images/678.png" alt=""></span>
        </Input>
      </div>
      <div class="col-lg-3">
        <Input v-model="bb" size="large" placeholder="不变石单价">
        <span slot="prepend"><img class="img-pm" src="../assets/images/229.png" alt=""></span>
        </Input>
      </div>
      <div class="col-lg-3">
        <Input v-model="xq" size="large" placeholder="遗传道具单价">
        <span slot="prepend"><img class="img-pm" src="../assets/images/292.png" alt=""></span>
        </Input>
      </div>
      <div class="col-lg-3">
        <Input v-model="xb" size="large" placeholder="性别指定单价">
        <span slot="prepend"><img class="img-pm" src="../assets/images/64.png" alt=""></span>
        </Input>
      </div>
    </div>
    <div class="row table-row">
      <div class="col-lg-12">
        <Table :columns="columns" :data="data"></Table>
      </div>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/images/logo.svg'

  export default {
    name: 'hello',
    data () {
      return {
        logo,
        pm: 10000,
        bb: 16000,
        xq: 10000,
        xb: 5000,
        columns: [
          {
            title: '描述',
            key: 'name'
          },
          {
            title: '最多花费',
            key: 'age',
            render: (h, params) => {
              let p = this.calc(params)
              return h('div', [
                h('strong', p.zNum)
              ])
            }
          },
          {
            title: '说明',
            render: (h, params) => {
              let p = this.calcExp(params)
              return h('div', [
                h('strong', p)
              ])
            }
          }
        ],
        data: [{
          name: '1V'
        }, {
          name: '2V'
        }, {
          name: '3V'
        }, {
          name: '4V'
        }, {
          name: '5V'
        }, {
          name: '6V'
        }, {
          name: '1V[对性格]'
        }, {
          name: '2V[对性格]'
        }, {
          name: '3V[对性格]'
        }, {
          name: '4V[对性格]'
        }, {
          name: '5V[对性格]'
        }, {
          name: '6V[对性格]'
        }]
      }
    },
    mounted () {
    },
    methods: {
      calcExp (row) {
        if (row.index <= 5) {
          if (row.index === 0) {
            return '一共需要 ' + (row.index + 1) + ' 个素材'
          }
          let vNum = this.calcNumber(row.index)
          let vP = this.calcVp(vNum)
//          return zNum / 1000 + ' K'
          return '一共需要 ' + vNum + ' 个素材、 ' + vP + ' 个遗传道具、指定性别 ' + (vNum - 1) + ' 次'
        } else {
          let i = row.index - 6
          let t = row.index - 5
          let dNum = 0
          let dP = 0
//          let dPm = 0
          while (i >= 0) {
            let obj = this.calc({index: i})
            dNum += obj.vNum
            dP += obj.vP
//            dPm += obj.zNum
            i = i - 1
          }
//          dPm = dPm + (t * this.xq) + (t * this.bb)
          return '一共需要 ' + dNum + ' 个素材、 ' + (dP + t - 1) + ' 个遗传道具、' + t + '个不变石、指定性别 ' + (dNum - 1) + ' 次'
        }
      },
      calc (row) {
        if (row.index <= 5) {
          if (row.index === 0) {
            return {vNum: 1, vP: 1, zNum: this.pm}
          }
          let vNum = this.calcNumber(row.index)
          let vP = this.calcVp(vNum)
          let zNum = vP * this.xq + vNum * this.pm + ((vNum - 1) * this.xb)
//          return zNum / 1000 + ' K'
          return {vNum, vP, zNum}
        } else {
          let i = row.index - 6
          let t = row.index - 5
          let dNum = 0
          let dP = 0
          let dPm = 0
          while (i >= 0) {
            let obj = this.calc({index: i})
            dNum += parseInt(obj.vNum)
            dP += parseInt(obj.vP)
            dPm += parseInt(obj.zNum)
            i = i - 1
          }
          dPm = parseInt(dPm) + parseInt(t * this.xq) + parseInt(t * this.bb)
          return {vNum: dNum, vP: dP, zNum: dPm}
        }
//        return '6'
      },
      calcNumber (num) {
        return Math.pow(2, num)
      },
      calcVp (num) {
        if (num / 2 < 2) {
          return 2
        }
        return num + this.calcVp(num / 2)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .img-pm {
    height: 22px;
  }

  .table-row {
    margin-top: 30px;
  }

  .table-row .ivu-table-cell {
    padding: 0 18px;
  }
</style>
