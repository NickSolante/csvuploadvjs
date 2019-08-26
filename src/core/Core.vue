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
import { type } from 'os';

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
      newHeader: []
    }
  },
  watch: {
    dataSet: function (data) {
      console.log(data)
    },
    headerOnFiles: function (data) {
      console.log('core ' + typeof data)
      console.log(data)
    }
  }
}
</script>

<style lang='scss'>
.mt {
  margin-top: 0.25rem;
}
</style>
