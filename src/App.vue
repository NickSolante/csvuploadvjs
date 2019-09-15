<template>
  <div>
    <Core />
  </div>
</template>

<script>
import Core from './core/Core'

export default {
  name: 'App',
  components: {
    Core
  },
  data () {
    return {
      dataSet: [],
      headerOnFiles: []
    }
  }
}
</script>

<style lang='scss'>
</style>
