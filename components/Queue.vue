<template>
  <v-card width="320px" class="ma-4 d-flex flex-column justify-space-between">
    <v-card-title>{{ doctor.name }}</v-card-title>
    <v-card-subtitle v-if="actualAppointment">{{
      getDifference
    }}</v-card-subtitle>
    <v-card-text>
      <v-list rounded>
        <v-list-item
          v-if="actualAppointment"
          :class="[
            actualAppointment.status === 'inside' ? 'green' : 'red',
            'lighten-3',
          ]"
        >
          <v-list-item-action>
            <v-btn
              fab
              small
              depressed
              dark
              :color="actualAppointment.status === 'inside' ? 'green' : 'red'"
              class="darken-3"
            >
              <small v-if="actualAppointment.status === 'inside'">Inside</small>
              <small v-else>No<br />Show</small>
            </v-btn>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <strong> {{ getTime(actualAppointment.start) }}</strong>
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon small @click="getInfo(actualAppointment._id)">
              mdi-open-in-new
            </v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-list-item v-if="nextAppointment" class="orange lighten-4">
          <v-list-item-action>
            <v-btn fab small depressed color="orange">
              <small>Next</small>
            </v-btn>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <strong> {{ getTime(nextAppointment.start) }}</strong>
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon small @click="getInfo(nextAppointment._id)">
              mdi-open-in-new
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-virtual-scroll :items="appointments" height="250" item-height="64">
        <template v-slot:default="{ item }">
          <v-list-item :key="item._id">
            <v-list-item-action>
              <v-btn fab small depressed dark color="indigo">
                {{ getIndex(item) }}
              </v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                <strong> {{ getTime(item.start) }}</strong>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon small @click="getInfo(item._id)">
                mdi-open-in-new
              </v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="red darken-3" @click="noShow"> No Show </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="indigo" @click="checkIn"> Check In </v-btn>
    </v-card-actions>
    <AppointmentDialog ref="appointmentDialog" :info="info"></AppointmentDialog>
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
      nextAppointment: null,
      info: {},
      dialog: false,
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
      if (this.nextAppointment) {
        const updatedTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.socket.emit('change-status', {
          doctorId: this.doctor._id,
          actualAppointment: this.actualAppointment,
          nextAppointment: this.nextAppointment,
          status: 'inside',
          updatedTime,
        })
      }
    },
    noShow() {
      if (this.nextAppointment) {
        const updatedTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.socket.emit('change-status', {
          doctorId: this.doctor._id,
          actualAppointment: this.actualAppointment,
          nextAppointment: this.nextAppointment,
          status: 'no-show',
          updatedTime,
        })
      }
    },
    getTime(start) {
      return moment.utc(start).format('LT')
    },
    async getInfo(id) {
      const appointment = await this.$getAppointmentById(id)
      this.info = appointment
      this.dialog = true
      this.$refs.appointmentDialog.dialog = true
    },
    getIndex(item) {
      return this.appointments.indexOf(item) + 2
    },
  },
  computed: {
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
  },
}
</script>
