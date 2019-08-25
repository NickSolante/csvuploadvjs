<template>
  <div v-if="csvfile === []">
    <b-form>
      <b-row>
        <b-col>Zone from</b-col>
        <b-col>
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
          <b-form-select class="thePaddening">
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
  </div>

  <div v-else />
</template>

<script>

import cloneDeep from 'lodash/cloneDeep'
export default {
  props: {

    // fields for header
    csvfile: {
      type: Array,
      required: false,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      selected: null,
      headerVal: [],
      newVal: []
    };
  },
  watch: {
    fields: function(newVal) {
      newVal ? this.cloneCopy() : console.log("no new val");
    },
    csvfile: function(headerVal) {
      console.log(headerVal)
      this.newVal = cloneCopy(headerVal)

    }
  },
  methods: {
    cloneCopy(csvHeader) {
     return cloneDeep(csvHeader)
    }
  }
};
</script>

<style scoped>
.thePaddening {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
