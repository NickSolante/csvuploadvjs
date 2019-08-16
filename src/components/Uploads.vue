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
import get from 'lodash/get';

export default {
  data () {
    return {
      file: null,
      results: null,
      header: true
    }
  },
  watch: {
    file: function (newVal) {
      if (newVal) {
        Papa.parse(newVal, {
          header: true,
          complete: (results, file) => {
            Object.size = function (obj) {
              var size = 0
              var key
              for (key in obj) {
                if (obj.hasOwnProperty(key)) size++
              }
              return size
            };
            this.results = results.meta.fields

            console.log(this.results)
            const arrayResults = this.results
            const arrayResultsData = results.data

            console.log(arrayResults[0])
            console.log(arrayResultsData)
            const arrayResultsThing = arrayResultsData.map(d => {
              return get(d, arrayResults[0], '-')
            })
            // const arrayResultsThing = arrayResultsData.map(d => {
            //   return result => result[arrayResults[0]];
            // });
            console.log(arrayResultsThing)
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
