<template>
  <div id="app">
    {{ message }}
    ...
    {{ data.message }}
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      message: '',
      data: {}
    }
  },
  configs: [{
    url: '/hello',
    trigger: 'hello',
    dataname: 'message',
    datanames: [{
      name: 'message',
      key: 'message'
    }],
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