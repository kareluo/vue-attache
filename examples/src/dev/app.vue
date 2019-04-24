<template>
  <div id="app">
    {{ message }}
    ...
    {{ data.message }}
  </div>
</template>

<script>
/* eslint-disable */
import { hello } from './net/configs'

export default {
  data() {
    return {
      message: '',
      data: {}
    }
  },
  configs: [{
    param: {
      code: 123
    },
    url: '/say/{code}/message',
    method: 'post',
    trigger: 'hello',
    dataname: 'data',
    datanames: ['message'],
  }],
  methods: {
  },
  mounted() {
    this.hello(1, 2, 3)
  },
}
</script>

<style rel="stylesheet/scss" lang="less" scoped>

</style>