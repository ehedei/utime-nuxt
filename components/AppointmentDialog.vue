<template>
  <v-dialog v-model="dialog" width="450">
    <v-card v-if="info.booking">
      <v-img
        v-if="info.booking.user.image"
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <div v-else class="text-center">
        <v-icon size="250"> mdi-account </v-icon>
      </div>
      <v-card-title>{{ info.booking.user.username }}</v-card-title>
      <v-card-subtitle>{{ info.booking.user.email }}</v-card-subtitle>

      <v-card-text>
        <div class="my-4 text-subtitle-1 d-flex justify-space-between">
          <div>
            Start: <strong>TODO</strong>
          </div>
          <div>
            End: <strong>TODO</strong>
          </div>
        </div>
        <div class="my-4 text-subtitle-1">
          Booked in <strong>{{ getBookingDate }}</strong> at
          <strong>{{ getBookingTime }}</strong>
        </div>

        <div class="mt-4 text-subtitle-1">
          Doctor: <strong>{{ info.doctor.name }}</strong>
        </div>
        <div class="mb-3 text-subtitle-1">Specialties:</div>
        <v-row justify="center" class="mx-0">
          <div
            v-for="(specialty, i) in info.doctor.specialties"
            :key="i"
            class="d-flex flex-column text-center mx-5"
          >
            <v-img height="50" width="50" :src="specialty.image"></v-img>
            <small>{{ specialty.name }}</small>
          </div>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" dark text @click="dialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    getFullName() {
      return `${1} ${1}`
    },
    getBookingDate() {
      return moment.utc(this.info.booking.bookingDate).format('DD/MM/YYYY')
    },
    getBookingTime() {
      return moment.utc(this.info.booking.bookingDate).format('HH:mm')
    },
  },
}
</script>
