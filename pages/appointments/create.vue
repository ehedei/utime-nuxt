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
                        v-model="start"
                        label="Start Time"
                        :max="end"
                        type="time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="end"
                        label="End Time"
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
                        header-color="indigo darken-3"
                        color="orange darken-4"
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
            <v-btn color="orange darken-4" text dark @click="create"
              >Create</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Create Appointments </v-card-title>
        <v-card-text>{{ message }}</v-card-text>
        <v-list v-if="appointments.length">
          <v-list-group :value="false" prepend-icon="mdi-pencil-outline">
            <template v-slot:activator>
              <v-list-item-title>List of conflicts</v-list-item-title>
            </template>

            <v-list-item v-for="(appointment, i) in appointments" :key="i">
              <v-list-item-title> {{ getDate(appointment.start) }} {{ getTime(appointment.start) }} </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo darken-1" text @click="dialog = false">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      message: '',
      appointments: [],
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
    getDate(date) {
      return moment.utc(date).format('DD/MM/YYYY')
    },
    getTime(date) {
      return moment.utc(date).format('LT')
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
        this.appointments = []
        this.message = 'Operation successfully completed'
        this.dialog = true
      } catch (error) {
        if (error.response.status === 409) {
          this.appointments = error.response.data.appointments
          this.message = 'Conflict with appointments already exist'
          this.dialog = true
        } else {
          this.appointments = []
          this.message = 'Something goes wrong, try again!'
          this.dialog = true
        }
      }
    },
  },
}
</script>