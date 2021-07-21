<template>
  <v-card width="250px" class="ma-4">
    <v-card-title>{{ doctor.name }}</v-card-title>
    <v-card-subtitle v-if="actualAppointment">{{ getDifference }}</v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item v-if="actualAppointment" :class="[actualAppointment.status === 'inside' ? 'green' : 'red', 'lighten-3']">
          <v-list-item-content>
            <v-list-item-title class="text-h6" color="black">
              {{ getTime(actualAppointment.start) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="nextAppointment" class="blue lighten-4">
          <v-list-item-content>
            <v-list-item-title class="text-h6" color="black">
              {{ getTime(nextAppointment.start) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="appointment in appointments" :key="appointment._id">
          <v-list-item-content>
            <v-list-item-title class="text-h6" color="black">
              {{ getTime(appointment.start) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="red darken-3" @click="noShow"> No Show </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="indigo" @click="checkIn"> Check In </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    doctor: {
      type: Object,
      required: true,
    },
    socket: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      appointments: [],
      actualAppointment: null,
      nextAppointment: null
    }
  },
  mounted() {
    this.socket.emit('subscribe', this.doctor._id)

    this.socket.on('update', (doctorId, appointments, appointment) => {
      if (doctorId === this.doctor._id) {
        this.nextAppointment = appointments.shift()
        this.appointments = appointments
        this.actualAppointment = appointment
      }
    })

  },
  methods: {
    checkIn() {
      this.socket.emit('check-in', this.actualAppointment, this.nextAppointment)

    },
    noShow() {
      this.socket.emit('no-show', this.actualAppointment, this.nextAppointment)
    },
    getTime(start) {
      return moment.utc(start).format('LT')
    }
  },
  computed: {
    getDifference() {
      const minutes = moment.utc(this.actualAppointment.start).diff(this.actualAppointment.inAt, 'minutes')

      const msg = minutes < 0 ? `Delay: ${minutes} minutes` : `Advance: ${minutes} minutes`

      return msg
    }
  }
}
</script>