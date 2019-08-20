<template>
  <div
    id="app"
    class="wrapper"
  >
    <Header class="heads" />
    <Uploads
      class="inputs"
      @passData="(e) => {
        dataSet = e }"
      @passDataFile="passToChildFile"
    />
    <CsvHeaders v />
  </div>
</template>

<script>
import Uploads from './Uploads';
import Header from '../components/layout/Header';
import CsvHeaders from './CsvHeaders';

export default {
  name: 'Core',
  components: {
    Header,
    Uploads,
    CsvHeaders
  },
  props: {
    dataSet: {
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
  data () {
    return {}
  },
  methods: {
    passToChild (dataSet) {
      console.log(dataSet)
    },
    passToChildFile (fileDataSet) {
      this.headerOnFiles = fileDataSet
      console.log(this.dataSet.data)
    }
  }
}
</script>

<style lang='scss'>
</style>
