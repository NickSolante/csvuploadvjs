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
      @passDataFile="(e) => {
        headerOnFiles = e
      }"
    />
    <CsvHeaders
      :fields="dataSet"
    />
  </div>
</template>

<script>
import Uploads from './core/Uploads';
import Header from './components/layout/Header';
import CsvHeaders from './core/CsvHeaders';

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
      dataFields: this.dataSet
    }
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0, 0, 0, 0;
}
.wrapper {
  border: 2px black;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 2fr auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  .heads {
    grid-column-start: 2;
  }
  .inputs {
    grid-column-start: 2;
    grid-row-start: 2;
    border-color: black;
    border: 2px solid black;
  }
}
</style>
