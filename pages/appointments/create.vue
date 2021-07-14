<template>
  <div>
    <div>
      <v-select
        v-model="doctor"
        :items="doctors"
        label="Select a doctor"
        item-text="name"
        item-value="_id"
      ></v-select>
      <v-text-field
        v-model="minutes"
        label="Insert the quantity of minutes for every appointment"
        placeholder="Minutes"
        type="number"
      ></v-text-field>
    </div>
    <div>
      <h1>Choose a range of time:</h1>
      <v-row justify="space-around" align="center">
        <v-col style="width: 350px; flex: 0 1 auto">
          <h2>Start:</h2>
          <v-time-picker v-model="start" :max="end"></v-time-picker>
        </v-col>
        <v-col style="width: 350px; flex: 0 1 auto">
          <h2>End:</h2>
          <v-time-picker v-model="end" :min="start"></v-time-picker>
        </v-col>
      </v-row>
    </div>
    <div>
      <h1>Select the days you want to create:</h1>
      <v-date-picker
        v-model="dates"
        :min="minDate"
        :allowed-dates="allowedDates"
        elevation="4"
        color="indigo darken-3"
        first-day-of-week="1"
        full-width
        multiple
      >
      </v-date-picker>
    </div>
    <v-btn color="indigo darken-4" @click="create">Create</v-btn>
  </div>
</template>

<script>
const moment = require('moment')

export default {
  middleware: ['advancedprivileges'],
  async asyncData(context) {
    const doctors = await context.$getDoctors()
    return { doctors }
  },
  data() {
    return {
      doctor: '',
      start: '09:00',
      end: '16:00',
      minutes: 15,
      dates: [],
    }
  },
  computed: {
    minDate() {
      return moment().format('YYYY-MM-DD')
    },
  },
  methods: {
    allowedDates: (date) => {
      return moment(date) >= moment().startOf('day')
    },
    async create() {
      const body = {
        start: this.start,
        end: this.end,
        dates: this.dates,
        minutes: this.minutes,
      }

      try {
        await this.$createAppointmentsIntoDoctor(this.doctor, body)
        alert('¡Creados!')
      } catch (error) {
        alert('Problema!')
      }
    },
  },
}
</script>