/* eslint-disable */
<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
        <b-col
          cols="50"
          lg="auto"
        >
          <b-form-file
            v-model="file"
            class="bordering"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          />
        </b-col>
        <b-col
          cols="50"
          lg="auto"
        >
          <b-button

            pill

            class="paddMeAmedala mx-auto"
            @click="clickedChicken"
          >
            Big Button
          </b-button>
        </b-col>
      </b-row>
    </b-container>
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

  methods: {
    clickedChicken () {
      if (this.file) {
        Papa.parse(this.file, {
          header: true,
          complete: results => {
            console.log(typeof results.data)
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
