<template>
  <el-button type="primary" @click="handleClick(1, '正在加载文章详情,请稍候')">动画loading1</el-button>
  <el-button type="primary" @click="handleClick(2)">动画loading2</el-button>
  <el-button type="primary" @click="handleClick(3)">动画loading3</el-button>
  <el-button type="primary" @click="handleClick(4)">动画loading4</el-button>
  <br>
  <br>
  <br>
  <el-button type="primary" @click="baLoading()">默认效果</el-button>
  <el-button type="primary" @click="baLoading(1, '加载ing')">效果1</el-button>
  <el-button type="primary" @click="baLoading(2)">效果2</el-button>
  <el-button type="primary" @click="baLoading(3)">效果3</el-button>
  <el-button type="primary" @click="baLoading(4)">效果4</el-button>
  <el-button type="primary" @click="baLoading(5)">效果5</el-button>
  <el-button type="primary" @click="baLoading(6)">效果6</el-button>
  <el-button type="primary" @click="baLoading(7)">效果7</el-button>
  <el-button type="primary" @click="baLoading(8)">效果8</el-button>
  <el-button type="primary" @click="baLoading(9)">效果9</el-button>
  <el-button type="primary" @click="getList">{{ number.name }}</el-button>
</template>

<script>
// @ is an alias to /src
import { defineComponent, reactive, inject } from 'vue'


export default defineComponent({
  name: 'Home',
  setup(){
    const number = reactive({
      name: 'hh'
    })
    const bsLoading = inject('baseLoading')
    const bsCLoading = inject('baseColorfulLoading')
    const http = inject('http')

    let getList = () => {
      http.get('/WebCategory/all').then(res=> {
        console.log(res)
      })
    }

    let handleClick = (index,text) => {
      bsCLoading(index,text)
    }

    let baLoading = (index,text) => {
      bsLoading(index,text)
    }

    getList()

    return {
      number,
      handleClick,
      baLoading,
      getList
    }
  }
})
</script>
