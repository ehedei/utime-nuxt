<template>
  <v-card class="indigo--text darken-4 my-4 rounded-xl">
    <v-card-title class="justify-center">
      {{ doctorsName }}
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{ doctorSpecialties }}
    </v-card-subtitle>
    <v-card-text>
      <AppointmentDetail
        v-for="(appointment, idx) in getSortedAppointments"
        :key="idx"
        :appointment="appointment.appointment"
        :today="today"
      ></AppointmentDetail>
    </v-card-text>
  </v-card>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    today: Boolean,
    appointments: Array,
  },
  computed: {
    doctorsName() {
      return this.appointments[0].appointment.doctor.name
    },
    doctorSpecialties() {
      return this.appointments[0].appointment.doctor.specialties
        .map((el) => el.name)
        .join(', ')
    },
    getSortedAppointments() {
      return this.appointments.slice().sort((a, b) => {
        if (moment(a.appointment.start).isAfter(b.appointment.start)) {
          return 1
        }
        if (moment(a.appointment.start).isBefore(b.appointment.start)) {
          return -1
        }
        return 0
      })
    },
  },
}
</script>
