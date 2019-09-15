<template>
  <div>
    <b-row>
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
            <b-button @click="ZoneFunc(1)">
              Process Hubs
            </b-button>
          </b-col>
          <b-col>
            <b-button @click="ZoneFunc(2)">
              Location Carrier Zones
            </b-button>
          </b-col>
          <b-col>
            <b-button @click="ZoneFunc(3)">
              Carrier Times
            </b-button>
          </b-col>
          <b-col>
            <b-button @click="ZoneFunc(4)">
              Carrier Times Extended
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    vueVar: {
      type: Number,
      default: () => {
        return 0
      }
    }
  }
}
</script>

<style>
</style>
