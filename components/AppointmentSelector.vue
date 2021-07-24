<template>
  <v-container fluid>
    <v-row justify="center" class="align-start">
      <v-col cols="12" sm="8" md="5" lg="4" xl="3">
        <v-date-picker
          v-model="date"
          :min="minDate"
          :allowed-dates="allowedDates"
          elevation="4"
          header-color="indigo darken-3"
          color="orange darken-4"
          first-day-of-week="1"
          full-width
          @change="selectDate"
        >
        </v-date-picker>
      </v-col>
      <div>
        <AppointmentPicker
          :appointments="appointments"
          :date="date"
          :visible="appointmentVisible"
          @setPickerInvisible="appointmentVisible = !appointmentVisible"
          @saveAppointment="saveAppointment"
        ></AppointmentPicker>
      </div>
    </v-row>
  </v-container>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    doctorId: String,
  },
  data() {
    return {
      date: moment.utc().format('YYYY-MM-DD'),
      appointments: [],
      appointmentVisible: false,
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
    async selectDate() {
      const now = moment()
      const endDate = `${this.date} 23:59:59`
      const startDate =
        now.format('YYYY-MM-DD') === this.date
          ? now.format('YYYY-MM-DD HH:mm:ss')
          : `${this.date} 00:00:00`

      const appointments = await this.$getFreeAppointmentsByDateAndDoctor(
        this.doctorId,
        startDate,
        endDate
      )
      this.appointments = appointments
      this.appointmentVisible = true
    },
    saveAppointment(id) {
      this.$emit('saveAppointment', id)
    },
  },
}
</script>