<template>
  <div>
    <Header class="heads" />
    <b-row>
      <b-col />
      <b-col>
        <Uploads
          class="inputs mt"
          @passData="(e) => {
            dataSet = e }"
          @passDataFile="(e) => {
            headerOnFiles = e
          }"
        />
      </b-col>
      <b-col />
    </b-row>
    <b-row>
      <b-col />
      <b-col>
        <CsvHeaders
          class="mx-auto mt"
          :csvfile="headerOnFiles"
          @mappedHeaderData="(e) =>{
            newHeader = e
          }"
        />
      </b-col>
      <b-col />
    </b-row>
  </div>
</template>

<script>
import Uploads from './Uploads';
import Header from '../components/layout/Header';
import CsvHeaders from './CsvHeaders';

export default {
  name: 'App',
  components: {
    Header,
    Uploads,
    CsvHeaders
  },

  data () {
    return {
      dataSet: {},
      headerOnFiles: {},
      newHeader: [],
      filteredCsv: []
    }
  },
  watch: {
    dataSet: function (data) {
      console.table(data)
    },
    headerOnFiles: function (data) {
      console.log('core ' + typeof data)
      console.log(data)
    },
    newHeader: function (data) {
      console.log('this is coming from the core')
      this.filteredCsv = this.filterIt(data, this.dataSet)
    }
  },
  methods: {
    filterIt (headers, largeDataSet) {
      const newFile = largeDataSet.map(largeDataSet => {
        return Object.keys(largeDataSet).filter(key => key === 'b')
      })
      console.log(newFile)
      return newFile
    }
  }
}
</script>

<style lang='scss'>
.mt {
  margin-top: 0.25rem;
}
</style>
