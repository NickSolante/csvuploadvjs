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
    },
    hubs: {
      type: Array,
      default: () => {
        return []
      }
    },
    locations: {
      type: Array,
      default: () => {
        return []
      }
    },
    zones: {
      type: Array,
      default: () => {
        return []
      }
    },
    filtered: {
      type: Object,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    console.log('this is coming from functional button to check if filtered is passed' + this.filtered)
  },
  methods: {
    ZoneFunc (number) {
      switch (number) {
        case 1:
          this.carrierTimes()
          break
        case 2:
          this.GetUUID()
          break
      }
    },
    carrierTimes () {

    },
    GetUUID () {
      var seed = Date.now()
      if (window.performance && typeof window.performance.now === 'function') {
        seed += performance.now()
      }

      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (seed + Math.random() * 16) % 16 | 0
        seed = Math.floor(seed / 16)

        return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16)
      })

      return uuid
    }

  }
}
</script>

<style>
</style>
