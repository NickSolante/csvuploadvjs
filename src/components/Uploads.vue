/* eslint-disable */
<template>
  <div>
    <b-form-file
      v-model="file"
      class="bordering"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    />
    <b-button
      pill
      variant="primary"
      class="paddMeAmedala"
    >
      Drop chicken
    </b-button>
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
            this.results = results.meta.fields
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
.paddMeAmedala {
  margin-top: 10px;
}
</style>
