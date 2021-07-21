<template>
  <v-container class="pt-6">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="12">
        <v-card class="p-4" elevation="6">
          <v-card-title>Creation of New Appointments</v-card-title>
          <v-card-text>
            <v-container>
              <v-row align="center">
                <v-col cols="12" lg="6" class="order-1 order-lg-2">
                  <v-row justify="space-around" align="center">
                    <v-col cols="12" sm="5">
                      <v-select
                        v-model="doctor"
                        :items="doctors"
                        label="Select a doctor"
                        item-text="name"
                        item-value="_id"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="minutes"
                        label="Insert the quantity of minutes for every appointment"
                        placeholder="Minutes"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <h3>Choose a range of time:</h3>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        label="Start Time"
                        v-model="start"
                        :max="end"
                        type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        label="End Time"
                        v-model="end"
                        :min="start"
                        type="time"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" lg="6" class="order-2 order-lg-1">
                  <v-row justify="space-around" align="center">
                    <v-col cols="12">
                      <h3>Select the days you want to create:</h3>
                    </v-col>
                    <v-col cols="12" sm="10" md="8" lg="12">
                      <v-date-picker
                        v-model="dates"
                        :min="minDate"
                        :allowed-dates="allowedDates"
                        :landscape="$vuetify.breakpoint.lgAndUp"
                        elevation="4"
                        color="indigo darken-3"
                        first-day-of-week="1"
                        full-width
                        multiple
                      >
                      </v-date-picker>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="indigo darken-4" dark @click="create">Create</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      return moment.utc().format('YYYY-MM-DD')
    },
  },
  methods: {
    allowedDates: (date) => {
      return moment.utc(date) >= moment.utc().startOf('day')
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