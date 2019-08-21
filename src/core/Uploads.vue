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
      class="paddMeAmedala mx-auto"
      @click="clickedChicken"
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
      header: true
    }
  },
  // watch: {
  //   file: function (newVal) {
  //     if (newVal) {
  //       Papa.parse(newVal, {
  //         header: true,
  //         complete: (results, file) => {
  //           this.results = results.meta.fields

  //           // stores csv file header data
  //           const arrayResults = this.results
  //           // stores all of results
  //           const arrayResultsData = results.data

  //           console.log(arrayResults[0])
  //           console.log(arrayResultsData)
  //           const arrayResultsThing = arrayResultsData.map(d => {
  //             return get(d, arrayResults[0], '-')
  //           })

  //           console.log(arrayResultsThing)
  //         }
  //       })
  //     }
  //   }
  // },
  methods: {
    clickedChicken () {
      if (this.file) {
        Papa.parse(this.file, {
          header: true,
          complete: results => {
            this.$emit('passData', results.data)
            const file = results.meta.fields
            this.$emit('passDataFile', file)
          }
        })
      }
      // this.$emit('passData', arrayResults)
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
  margin-top: 0.25rem;
}
</style>
