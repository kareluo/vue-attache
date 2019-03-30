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
      console.log(response, response)
      return 'hahahahah'
    },
    result(data) {
      console.log('result', data)
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