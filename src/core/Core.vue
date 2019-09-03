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
import functionalButton from './functionalButton';

export default {
  name: 'App',
  components: {
    Header,
    Uploads,
    CsvHeaders,
    functionalButton
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

    newHeader: function (data) {
      console.log('this is coming from the core')
      this.filteredCsv = this.filterIt(data, this.dataSet)
    }
  },
  methods: {
    filterIt (headers, largeDataSet) {
      const result = largeDataSet.map(data => {
        const wantedData = {}

        for (let index = 0; index < headers.length; index++) {
          wantedData[headers[index]] = data[headers[index]]
        }

        return wantedData
      })

      console.log(result)

      // var words = [
      //   { nick: 1, age: 1 },
      //   { nick: 2, age: 2 },
      //   { nick: 3, age: 3 }
      // ]
      // const head = ['nick', 'age']
      // const result = words.map(words => {
      //   return Object.keys(words).filter(
      //     key => key === head.map(head => head.value)
      //   )
      // })

      // console.log(result)
      // expected output: Array ["exuberant", "destruction", "present"]
    }
  }
}
</script>

<style lang='scss'>
.mt {
  margin-top: 0.25rem;
}
</style>
