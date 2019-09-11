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
      <functionalButton :ransak="vueVar" />
    </b-container>
  </div>
</template>

<script>
import Uploads from './Uploads';
import Header from '../components/layout/Header';
import CsvHeaders from './CsvHeaders';
import functionalButton from './functionalButton';
import Papa from 'papaparse';

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
    // dataSet: function(data) {
    //   console.table(data);
    // },

    newHeader: function (data) {
      console.log('this is coming from the core')
      this.filteredCsv = this.filterIt(data, this.dataSet)
      this.vueVar = 1
    }
  },
  methods: {
    ZoneFunc (val) {},
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
    CarrierTimesExtended () {
      let blob = new ([export_carrier_times_extended()],
      { type: 'text/csv' })()
      generateDownload(
        blob,
        'download-btn',
        filename + '-extendedCarrierTimes'
      )
    },

    export_carrier_times_extended () {
      console.log(this.largeDataSet)
      let data = this.largeDataSet.map(element => ({
        uuid: element.uuid,
        carrier_id: element.carrier_id,
        service_id: element.service_id,
        zone_id: element.zone_id,
        location_id: element.location_id,
        travel_time: element.travel_time,
        travel_time_min: element.travel_time_min,
        travel_time_max: element.travel_time_max
      }))
      console.log(data)
      return Papa.unparse(data)
    },

    findLocationByPostcode (postcode, country, town) {
      console.log('pct ' + postcode + country + town)

      if (!postcode || !country || !town) {
        buildAlert(
          null,
          `${postcode || ''} ${country || ''} ${town || ''}`,
          'missing-keys'
        )
      }

      let filteredArray = db_locations.filter(data => {
        return (
          data.location_postcode == postcode &&
          data.location_country == country &&
          data.location_town == town.toUpperCase()
        )
      })

      if (filteredArray.length < 1) {
        return 'NO_LOCATION_FOUND';
      } else {
        return filteredArray[0].location_id
      }
    }
  }
}
</script>

<style lang='scss'>
.mt {
  margin-top: 0.25rem;
}
</style>
