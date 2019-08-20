<template>
  <div>
    123
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    headerOnFiles: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    fields: function (newVal) {
      console.log(newVal)
    }
  }
}
</script>

<style scoped>
</style>
