<template>
  <div>
    <Header class="heads" />

    <b-container fluid>
      <b-row v-if="vueVar !== 0">
        <!-- throw in an empty column -->
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
          <ul id="example-1">
            <li
              v-for="(Value, index) of headerOnFiles"
              :key="index"
            >
              {{ Value }}
            </li>
          </ul>
        </b-col>
        <b-col
          v-if="Object.keys(headerOnFiles).length > 0"
        >
          <CsvHeaders
            class="mx-auto mt"
            :csvfile="headerOnFiles"
            @mappedHeaderData="(e) =>{
              newHeader = e
            }"
          />
        </b-col>
        <!-- throw in an empty column -->
        <b-col />
      </b-row>

      <b-row v-else>
        <b-container>
          <b-row>
            <b-col>
              <h1 class="justify-content-md-center">
                Actions
              </h1>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-button>
                Process Hubs
              </b-button>
            </b-col>
            <b-col>
              <b-button>Location Carrier Zones</b-button>
            </b-col>
            <b-col>
              <b-button>Carrier Times</b-button>
            </b-col>
            <b-col>
              <b-button :click="CarrierTimesExtended">
                Carrier Times Extended
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
    </b-container>
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
      filteredCsv: [],
      vueVar: 0
    }
  },
  watch: {
    dataSet: function (data) {
      console.table(data)
    },

    newHeader: function (data) {
      console.log('this is coming from the core')
      this.filteredCsv = this.filterIt(data, this.dataSet)
      this.vueVar = 1
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

      // must configure to run map and filter
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
    },
    CarrierTimeExtended () {}
  }
}
</script>

<style lang='scss'>
.mt {
  margin-top: 0.25rem;
}
</style>
