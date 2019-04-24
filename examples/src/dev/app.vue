<template>
  <div id="app">
    {{ message }}
    ...
    {{ data.message }}
  </div>
</template>

<script>
/* eslint-disable */
import {
  api_his_lottery_receive_post
} from './net/configs'

export default {
  data() {
    return {
      message: '',
      data: {}
    }
  },
  configs: [{
    ...api_his_lottery_receive_post
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