<template>
  <div>
    <a v-for="page in pages" :key="page" :href="page">{{ page }}</a>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      pages: ['dev']
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="less" scoped>

</style>