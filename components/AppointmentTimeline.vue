<template>
  <v-timeline  :dense="$vuetify.breakpoint.smAndDown" witdh="300px">
    <v-timeline-item
      v-for="(appointment, i) in appointmentsByDate"
      :key="i"
      color="#cd722e"
      icon="mdi-calendar-clock"

    >
      <v-card elevation="7" id="cards">
        <v-card-title  class="text-h6 white--text justify-center mx-auto pa-4 indigo">
          {{ appointment.date }}
        </v-card-title>
          <v-card>
        <v-card-text class="white text--primary" >
          <div
            v-for="(a, i) in appointment.appointments"
            :key="i"
            class="text-center rounded pink lighten-5"
          >
          <p>
            {{ a.appointment.doctor.name }}

          </p>

          </div>
        </v-card-text>

          </v-card>
      </v-card>
    </v-timeline-item>
  </v-timeline>

</template>

<script>
const moment = require('moment')
export default {
  props: {
    appointments: Array,
  },
  data: () => ({}),
  computed: {
    appointmentsByDate() {
      return Array.from(
        new Set(
          this.appointments.map((appointment) =>
            moment(appointment.appointment.start).format('YYYY-MM-DD')
          )
        )
      )
        .sort()
        .map((el) => {
          return {
            date: el,
            appointments: this.appointments.filter(
              (element) =>
                moment(element.appointment.start).diff(el, 'days') === 0
            ),
          }
        })
    },
  },
}
</script>

<style scoped>
#cards {
  border-radius: 15px;
}
</style>