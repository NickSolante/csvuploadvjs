/* eslint-disable */
<template>
  <div class="bordering">
    <b-form-file
      v-model="file"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    />
  </div>
</template>
<script>
import Papa from 'papaparse';
export default {
  data () {
    return {
      file: null,
      results: null
    }
  },
  watch: {
    file: function (newVal) {
      if (newVal) {
        Papa.parse(newVal, {
          header: true,
          complete: (results, file) => {
            this.results = results.data
            console.log(results)
          }
        })
      }
    }
  }
}
</script>

<style lang='scss'>
.bordering {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
