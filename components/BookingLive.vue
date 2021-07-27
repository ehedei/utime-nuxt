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
        <div
          v-if="actualAppointment._id === appointment._id"
          class="text-subtitle-1 d-flex justify-space-between"
        >
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
    <v-card-actions v-if="updatedAppointment">
      <v-spacer></v-spacer>
      <v-btn
        text
        color="indigo"
        class="text--darken-4"
        @click="$parent.questionCancelAppointment"
        >Cancel Appointment</v-btn
      >
    </v-card-actions>

    <v-dialog v-model="showModal" persistent :width="width">
      <v-card dark color="indigo" class="darken-4" elevation="6">
        <v-card-title class="text-h6"> Live </v-card-title>
        <v-card-text class="pb-0">
          <div class="d-flex justify-space-between">
            Doctor:
            <strong class="align-self-end">{{
              $parent.booking.appointment.doctor.name
            }}</strong>
          </div>
        </v-card-text>

        <v-card-title class="text-h5"> You are next! </v-card-title>
        <v-card-subtitle class="text-h6"> Be ready! </v-card-subtitle>
        <v-card-text>
          <div
            class="
              text-h5
              d-flex
              flex-column flex-sm-row
              justify-space-between
              white--text
            "
          >
            Your appointment:
            <strong class="align-self-end">{{
              getTime(appointment.start)
            }}</strong>
          </div>
        </v-card-text>

        <v-card-text v-if="actualAppointment">
          <div
            class="text-h6 d-flex flex-column flex-sm-row justify-space-between"
          >
            Actual appointment:
            <strong class="align-self-end">{{
              getTime(actualAppointment.start)
            }}</strong>
          </div>
          <div class="text-h6 d-flex justify-end white--text mt-1">
            {{ getDifference }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-large
            text
            color="white"
            class="my-3 py-6 text-decoration-underline"
            @click="modalDisposable = !modalDisposable"
            >Close</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      updatedAppointment: null,
      actualAppointment: null,
      nextAppointment: null,
      appointments: [],
      modalDisposable: true,
    }
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
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 300
        case 'sm':
          return 600
        case 'md':
        case 'lg':
        case 'xl':
          return 700
        default:
          return 290
      }
    },
    showModal() {
      return (
        this.nextAppointment?._id === this.appointment._id &&
        this.modalDisposable
      )
    },
  },
  methods: {
    getDate(date) {
      return moment.utc(date).format('DD/MM/YYYY')
    },
    getTime(date) {
      return moment.utc(date).format('LT')
    },
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
        this.updatedAppointment = appointments.find(
          (el) => el._id === this.appointment._id
        )
        this.nextAppointment = appointments.shift()
        this.appointments = appointments
        this.actualAppointment = appointment
      }
    })
  },
}
</script>
