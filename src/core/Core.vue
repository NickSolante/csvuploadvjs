<template>
  <div>
    <Header class="heads" />

    <b-container fluid>
      <b-row>
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
        <b-col v-if="Object.keys(headerOnFiles).length > 0">
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
      <functionalButton
        :ransak="vueVar"
        :filtered="filteredCsv"
      />
    </b-container>
  </div>
</template>

<script>
import Uploads from './Uploads'
import Header from '../components/layout/Header'
import CsvHeaders from './CsvHeaders'
import functionalButton from './functionalButton'
import databaseHubs from '../database/database_hubs.json'
import databaseLocations from '../database/database_locations.json'
import databaseZone from '../database/db_zones.json'
import Papa from 'papaparse'

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
      filteredCsv: {},
      vueVar: 0,
      dbHubs: {},
      dbZones: {},
      dbLocations: {}
    }
  },
  watch: {

    newHeader: function (data) {
      console.log('this is coming from the core')
      this.filteredCsv = this.filterIt(data, this.dataSet)
      console.log('hello world filter works ' + JSON.stringify(this.filteredCsv))
      this.vueVar = 1
    }
  },
  methods: {
    ZoneFunc (val) { },
    filterIt (headers, largeDataSet) {
      const result = largeDataSet.map(data => {
        const wantedData = {}

        for (let index = 0; index < headers.length; index++) {
          wantedData[headers[index]] = data[headers[index]]
        }

        return wantedData
      })
      console.log(result)
      return result
    }
  }

}
</script>

<style lang='scss'>
.mt {
  margin-top: 0.25rem;
}
</style>
