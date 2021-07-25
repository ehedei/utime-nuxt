<template>
  <v-card width="350px" class="ma-3 mx-auto darken-3" elevation="4">
    <v-card-title>
      <h4>Schedule Details</h4>
    </v-card-title>
    <v-card-text>
      <div class="text-subtitle-1 d-flex justify-space-between">
        Date:
        <strong>{{ getDate(appointment.start) }}</strong>
      </div>
      <div class="text-subtitle-1 d-flex justify-space-between">
        Time: <strong>{{ getTime(appointment.start) }}</strong>
      </div>
      <div v-if="areYouIn">
        <v-divider class="mx-4 my-3"></v-divider>
        <div
          v-if="actualAppointment.status === 'no-show'"
          class="text-subtitle-1 d-flex justify-space-between"
        >
          Status: <strong class="red--text">No show</strong>
        </div>
        <div
          v-else-if="actualAppointment.status === 'inside'"
          class="text-subtitle-1 d-flex justify-space-between"
        >
          Status: <strong class="green--text">Inside</strong>
        </div>
        <div
          v-if="actualAppointment.inAt"
          class="text-subtitle-1 d-flex justify-space-between"
        >
          Attended at <strong>{{ getTime(actualAppointment.inAt) }}</strong>
        </div>
      </div>
    </v-card-text>

    <v-divider class="mx-4 my-3"></v-divider>

    <v-card-title>
      <h4>Live</h4>
    </v-card-title>

    <v-card-text>
      <div v-if="actualAppointment">
        <div v-if="actualAppointment._id === appointment._id" class="text-subtitle-1 d-flex justify-space-between">
          <strong> This is your turn </strong>
        </div>
        <div v-else class="text-subtitle-1 d-flex justify-space-between">
          Actual appointment:
          <strong>{{ getTime(actualAppointment.start) }}</strong>
        </div>
        <div class="text-subtitle-1 d-flex justify-space-between">
          {{ getDifference }}
        </div>
      </div>

      <div v-if="areYouNext">You are next! Be ready!</div>
      <div v-else-if="!areYouNext && nextAppointment && getQueuePosition">
        <div class="text-subtitle-1 d-flex justify-space-between">
          Queue position:
          <strong>{{ getQueuePosition }}</strong>
        </div>
      </div>

      <v-divider class="mx-4 my-3"></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    appointment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      socket: null,
      actualAppointment: null,
      nextAppointment: null,
      appointments: [],
    }
  },
  mounted() {
    const token = this.$auth.strategy.token.get()

    this.socket = this.$nuxtSocket({
      name: 'main',
      extraHeaders: { Authorization: token },
    })

    this.socket.emit('subscribe', this.appointment.doctor._id)

    this.socket.on('update', (doctorId, appointments, appointment) => {
      if (doctorId === this.appointment.doctor._id) {
        this.nextAppointment = appointments.shift()
        this.appointments = appointments
        this.actualAppointment = appointment
      }
    })
  },
  methods: {
    getDate(date) {
      return moment.utc(date).format('DD/MM/YYYY')
    },
    getTime(date) {
      return moment.utc(date).format('LT')
    },
  },
  computed: {
    areYouNext() {
      return this.nextAppointment?._id === this.appointment._id
    },
    areYouIn() {
      return this.actualAppointment?._id === this.appointment._id
    },
    getDifference() {
      const inAt = moment(this.actualAppointment.inAt)
      const minutes = moment
        .utc(this.actualAppointment.start)
        .diff(inAt, 'minutes')

      const msg =
        minutes < 0
          ? `Delay: ${Math.abs(minutes)} minutes`
          : `Advance: ${minutes} minutes`

      return msg
    },
    getQueuePosition() {
      for (let i = 0; i < this.appointments.length; i++) {
        if (this.appointments[i]._id === this.appointment._id) {
          return i + 2
        }
      }
      return 0
    }
  },
}
</script>
