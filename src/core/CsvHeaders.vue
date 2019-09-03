<template>
  <div @variable="() => { csvfile !== {} }">
    <b-form>
      <b-row>
        <b-col>Zone from</b-col>
        <b-col>
          <b-form-select
            v-model="zoneFrom"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Service</b-col>
        <b-col>
          <b-form-select
            v-model="service"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Zone to if times</b-col>
        <b-col>
          <b-form-select
            v-model="zoneTo"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Town</b-col>
        <b-col>
          <b-form-select
            v-model="town"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>State</b-col>
        <b-col>
          <b-form-select
            v-model="state"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Postcode</b-col>
        <b-col>
          <b-form-select
            v-model="postcode"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Country</b-col>
        <b-col>
          <b-form-select
            v-model="country"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Parent Zone</b-col>
        <b-col>
          <b-form-select
            v-model="parentZone"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Delivery Time</b-col>
        <b-col>
          <b-form-select
            v-model="delTime"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row>
        <b-col>Delivery Time Max</b-col>
        <b-col>
          <b-form-select
            v-model="delTimeMax"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Delivery Time Min</b-col>
        <b-col>
          <b-form-select
            v-model="delTimeMin"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Hub</b-col>
        <b-col>
          <b-form-select
            v-model="hub"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Carrier Times</b-col>
        <b-col>
          <b-form-select
            v-model="carrierTimes"
            class="thePaddening"
          >
            <option
              v-for="(Value , index) of csvfile"
              :key="index"
            >
              {{ Value }}
            </option>
          </b-form-select>
        </b-col>
      </b-row>
    </b-form>
    <b-button

      pill
      variant="primary"
      class="paddMeAmedala mx-auto"
      @click="onClickDrop"
    >
      Dont touch me
    </b-button>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
  props: {
    // data from csv
    fields: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    // fields for header
    csvfile: {
      type: Array,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      postcode: null,
      town: null,
      zoneTo: null,
      zoneFrom: null,
      service: null,
      state: null,
      country: null,
      parentZone: null,
      delTimeMax: null,
      delTimeMin: null,
      delTime: null,
      carrierTimes: null,
      hub: null
    }
  },
  watch: {
    // fields: function (newVal) {
    //   newVal ? this.cloneCopy() : console.log('no new val')
    // },
    csvfile: function (headerVal) {
      console.log('its here just not there')
      console.table(headerVal)
    },
    selected: function (val) {
      console.log(val)
    }
  },
  methods: {
    onClickDrop () {
      let dataPass = [
        this.postcode,
        this.town,
        this.zoneTo,
        this.zoneFrom,
        this.service,
        this.state,
        this.country,
        this.parentZone,
        this.delTime,
        this.delTimeMin,
        this.delTimeMax,
        this.carrierTimes,
        this.hub
      ]
      let refinedHeader = dataPass.filter(function (str) {
        return str !== null
      })

      console.table(refinedHeader)
      this.$emit('mappedHeaderData', refinedHeader)
    }
  }
}
</script>

<style scoped>
.thePaddening {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
