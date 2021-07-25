<template>
  <v-dialog v-model="dialog" width="450">
    <v-card v-if="info.booking">
      <v-card class="d-flex justify-center align-center" height="250">
        <v-avatar
          color="indigo darken-4"
          :height="info.booking.user.image ? '200' : '120'"
          :width="info.booking.user.image ? '200' : '120'"
          class="elevation-6"
        >
          <v-img
            v-if="info.booking.user.image"
            height="250"
            :src="info.booking.user.image"
            contain
          ></v-img>
          <v-icon v-else size="100" color="white"> mdi-account </v-icon>
        </v-avatar>
      </v-card>
      <v-card-title>{{ info.booking.user.username }}</v-card-title>
      <v-card-subtitle class="mb-0">
        <span>{{ info.booking.user.email }}</span>
      </v-card-subtitle>
      <v-card-text>
        <v-divider class="mx-4 mb-3"></v-divider>
        <div class="text-subtitle-1">
          Appointment Date: <strong>{{ getDate(info.start) }}</strong>
        </div>
        <div class="mb-4 text-subtitle-1 d-flex justify-space-between">
          <div>
            Start: <strong>{{ getTime(info.start) }}</strong>
          </div>
          <div>
            End: <strong>{{ getTime(info.end) }}</strong>
          </div>
        </div>
        <div v-if="info.status === 'no-show'" class="my-4 text-subtitle-4">
          Status: <strong class="red--text">No show</strong>
        </div>
        <div v-else-if="info.status === 'inside'" class="my-4 text-subtitle-4">
          Status: <strong class="green--text">Inside</strong>
        </div>
        <div v-if="info.inAt" class="my-4 text-subtitle-4">
          Attended at <strong>{{ getTime(info.inAt) }}</strong>
        </div>
        <div class="my-4 text-subtitle-4">
          Booked on <strong>{{ getDate(info.booking.bookingDate) }}</strong> at
          <strong>{{ getTime(info.booking.bookingDate) }}</strong>
        </div>
        <v-divider class="mx-4 my-3"></v-divider>

        <div class="mt-3 text-subtitle-1">
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
        <v-btn color="grey" dark text @click="showUser"> User Info </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="indigo" dark text @click="dialog = false"> Close </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="
            transition-fast-in-fast-out
            v-card--reveal
            d-flex
            flex-column
            justify-space-between
          "
          style="height: calc(100% - 335px)"
        >
          <AppointmentDialogUserCard :user="user"></AppointmentDialogUserCard>
          <v-card-actions class="pt-0">
            <v-btn color="grey" dark text @click="reveal = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
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
      reveal: false,
      user: null,
    }
  },
  methods: {
    getDate(date) {
      return moment.utc(date).format('DD/MM/YYYY')
    },
    getTime(date) {
      return moment.utc(date).format('LT')
    },
    async showUser() {
      const user = await this.$getUser(this.info.booking.user._id)
      this.user = user
      this.reveal = true
    },
  },
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
