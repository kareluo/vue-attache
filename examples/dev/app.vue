<template>
  <div id="app">
    {{ word }}
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      word: '',
    }
  },
  attaches: [{
    url: '/hello',
    trigger: 'hello',
    data(a, b, c) {
      return new Promise((resolve, reject) => {
        resolve({ a: 'hello' })
      })
    },
    response(response) {
      return {
        success: response.status === 200,
        data: response.data
      }
    },
    result(data) {
      return {
        success: data.success,
        data: data.data
      }
    },
    success(data) {
      console.log('success', data)
    },
    failure(data) {
      console.log('failure', data)
    }
  }],
  methods: {
  },

  created() {
    console.log('created')
  },

  mounted() {
    this.hello(1, 2, 3)
  },
}
</script>

<style rel="stylesheet/scss" lang="less" scoped>

</style>