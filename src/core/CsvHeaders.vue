<template>
  <div>
    <p @thing="(e) => { console.log(e)}">
      this is here
    </p>
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
  }
}
</script>

<style scoped>
</style>
