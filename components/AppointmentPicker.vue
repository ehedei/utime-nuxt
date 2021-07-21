<template>
  <v-container>
    <v-bottom-sheet v-model="visibility" persistent>
      <v-sheet class="text-center">
        <v-btn class="mt-6" text color="indigo" @click="setInvisible">
          Close
        </v-btn>
        <div class="justify-center my-5">
          Available Appointments for
          <span class="red--text ms-1"> {{ date }} </span>
        </div>
        <v-container id="appointment-list">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="2"
              v-for="(appointment, idx) in appointments"
              :key="idx"
            >
              <v-btn @click="saveAppointment(appointment._id)" text block>
                {{ getTime(appointment) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Booking </v-card-title>
        <v-card-text>Do you want to book this appointment?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog = false"> No </v-btn>
          <v-btn color="indigo darken-1" text @click="confirmAppointment">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    date: String,
    appointments: Array,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      id: '',
    }
  },
  methods: {
    setInvisible() {
      this.$emit('setPickerInvisible')
    },
    saveAppointment(id) {
      this.id = id
      this.dialog = true
    },
    getTime(appointment) {
      return moment.utc(appointment.start).format('LT')
    },
    confirmAppointment() {
      this.$emit('saveAppointment', this.id)
      this.dialog = false
      this.setInvisible()
    },
  },
  computed: {
    visibility() {
      return this.visible
    }
  }
}
</script>


<style lang="scss" scoped>
#appointment-list {
  overflow-y: auto;
  height: 80vh;
}

@media (min-width: 600px) {
  #appointment-list {
    height: 30vh;
  }
}
</style>