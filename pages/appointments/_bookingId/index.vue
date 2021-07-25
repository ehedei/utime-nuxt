<template>
  <div>
    <v-card>
      <v-card-text>
        <v-img v-for="(specialty, i) in booking.appointment.doctor.specialties"
          :key="i"
          height="100"
          width="100"
          :src="specialty.image"
        ></v-img>
      </v-card-text>

      <v-card-title>
        <h2>v-card-title</h2>
      </v-card-title>

      <v-card-text>
        line 1<br />
        line 2<br />
        line 3
      </v-card-text>

      <v-card-actions>
        <v-btn color="success">Click #1</v-btn>
        <v-btn text color="primary">Click #2</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <BookingLive v-if="isToday"></BookingLive>
  </div>
</template>

<script>
const moment = require('moment')
export default {
  async asyncData(context) {
    const id = context.$auth.user._id
    const bookingId = context.route.params.bookingId

    try {
      const booking = await context.$getBookingByIdIntoUser(id, bookingId)
      return { booking }
    } catch (error) {
      const status = error.response?.status

      if (status === 403) {
        context.redirect('/403')
      } else if (status === 404) {
        context.redirect('/404')
      } else {
        context.redirect('/500')
      }
    }
  },
  computed: {
    isToday() {
      const today = moment.utc()
      const start = moment.utc(this.booking.appointment.start)
      return today.diff(start, 'days') === 0
    },
  },
}
</script>
