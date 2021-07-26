<template>
  <v-container>
    <v-row v-if="booking.appointment" class="justify-center">
      <v-col cols="12" sm="6" lg="4" class="order-2 order-sm-1">
        <v-card width="350px" class="ma-3 mx-auto" elevation="4">
          <v-card-text>
            <div class="d-flex flex-column align-center mt-4">
              <v-img
                height="100"
                width="100"
                src="https://res.cloudinary.com/dfuhm3pot/image/upload/v1627211603/utime/appointment/appointment-xs-gold_ion3tq.png"
              ></v-img>
            </div>
          </v-card-text>
          <v-divider class="mx-4 my-3"></v-divider>

          <v-card-title>
            <h3>{{ booking.appointment.doctor.name }}</h3>
          </v-card-title>
          <v-card-subtitle> Doctor </v-card-subtitle>

          <v-card-text>
            <div class="text-subtitle-1">
              Appointment Date:
              <strong>{{ getDate(booking.appointment.start) }}</strong>
            </div>
            <div class="mb-4 text-subtitle-1 d-flex justify-space-between">
              <div>
                Start: <strong>{{ getTime(booking.appointment.start) }}</strong>
              </div>
              <div>
                End: <strong>{{ getTime(booking.appointment.end) }}</strong>
              </div>
            </div>
            <div class="my-4 text-subtitle-4">
              Booked on
              <strong>{{ getDate(booking.bookingDate) }}</strong>
              at
              <strong>{{ getTime(booking.bookingDate) }}</strong>
            </div>
            <v-divider class="mx-4 my-3"></v-divider>
            <div class="mb-3 text-subtitle-1">Specialties:</div>
            <v-row justify="center" class="mx-0 my-2">
              <div
                v-for="(specialty, i) in booking.appointment.doctor.specialties"
                :key="i"
                class="d-flex flex-column text-center mx-5"
              >
                <v-img height="50" width="50" :src="specialty.image"></v-img>
                <small>{{ specialty.name }}</small>
              </div>
            </v-row>
          </v-card-text>

          <v-card-actions v-if="isCancellable && !isToday">
            <v-spacer></v-spacer>
            <v-btn
              text
              color="indigo"
              class="text--darken-4"
              @click="cancelAppointment"
              >Cancel Appointment</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        v-if="isToday && booking.status === 'booked'"
        cols="12"
        sm="6"
        lg="4"
        class="order-1 order-sm-2"
      >
        <BookingLive :appointment="booking.appointment"></BookingLive>
      </v-col>
    </v-row>
    <v-row v-else class="justify-center">
      <v-card elevation="5" max-width="350px" class="align-self-center pa-4">
        <v-card-title>
          <h2>Appointment cancelled</h2>
        </v-card-title>
        <v-card-text>
          <div class="my-4 text-subtitle-4">
            Booked on
            <strong>{{ getDate(booking.bookingDate) }}</strong>
            at
            <strong>{{ getTime(booking.bookingDate) }}</strong>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="orange"
            class="text--darken-4"
            text
            @click="$router.push('/appointments')"
            >Back</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Cancel Appointment </v-card-title>
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="cancelled" color="indigo darken-1" text @click="$router.push('/appointments')">
            Accept
          </v-btn>
          <v-btn v-else color="indigo darken-1" text @click="dialog = !dialog">
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
  async asyncData(context) {
    const id = context.$auth.user._id
    const bookingId = context.route.params.bookingId

    const booking = await context.$getBookingByIdIntoUser(id, bookingId)
    return { booking }
  },
  data() {
    return {
      message: '',
      dialog: false,
      cancelled: false
    }
  },
  computed: {
    isToday() {
      const today = moment.utc()
      const start = moment.utc(this.booking.appointment.start)
      return today.format('YYYY-MM-DD') === start.format('YYYY-MM-DD')
    },
    isCancellable() {
      return this.booking.status === 'booked'
    },
  },
  methods: {
    getDate(date) {
      return moment.utc(date).format('DD/MM/YYYY')
    },
    getTime(date) {
      return moment.utc(date).format('LT')
    },
    async cancelAppointment() {
      try {
        const userId = this.$auth.user._id
        const bookingId = this.booking._id
        await this.$cancelAppointmentIntoUser(userId, bookingId)
        this.cancelled = true
        this.message = 'Booking correctly cancelled'
        this.dialog = 'true'
      } catch (err) {
        this.cancelled = false
        this.message = 'Something goes wrong. Try again!'
        this.dialog = 'true'
      }
    },
  },
}
</script>
