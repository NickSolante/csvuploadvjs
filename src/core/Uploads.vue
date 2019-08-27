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
