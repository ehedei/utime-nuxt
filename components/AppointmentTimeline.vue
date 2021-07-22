<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="checkappointments" id="card1">
          <v-title class="containerTitle">
            <p class="title1">Next Appointments</p>
          </v-title>
          <v-text class="pa-4">
            <v-timeline :dense="$vuetify.breakpoint.smAndDown" witdh="300px">
              <v-timeline-item
                v-for="(appointment, ind) in appointmentsByDate"
                :key="ind"
                color="#cd722e"
                icon="mdi-calendar-clock"
              >
                <v-card id="cards" elevation="7">
                  <v-card-title
                    class="
                      text-h6
                      white--text
                      justify-center
                      mx-auto
                      pa-4
                      indigo
                    "
                  >
                    {{ appointment.date }}
                  </v-card-title>
                  <v-card>
                    <v-card-text class="white text--primary">
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
          </v-text>
        </v-card>
        <v-card v-else id="card1">
          <v-title class="containerTitle">
            <p class="title1">You don't have any appointment</p>
          </v-title>
          <v-text class="bannerContainer">
            <v-banner class="curiosityBanner">
              <p>Do you know that ...</p>
              <p>One in every 1000 babies is born with a tooth.</p>
              <template v-slot:actions>
                <v-btn text color="primary" class="btn"> Next curiosity </v-btn>
              </template>
            </v-banner>
          </v-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    appointments: Array,
  },
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
    checkappointments() {
      if (this.appointments.length === 0) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style scoped>
#cards {
  border-radius: 15px;
  width: 90vw;
  box-shadow: 0 !important;
}
.baby {
  width: 150px;
  height: 100px;
}
#card1 {
  box-shadow: none;
  padding: 20px;
  border-radius: 10px;
  background-color: transparent;
}
.curiosityBanner {
  width: 60vw;
  margin-top: 10vh;
  color: rgb(40, 50, 143);
  font-size: 1.2rem;
}
.bannerContainer {
  display: flex;
  justify-content: center;
}
.containerTitle {
  display: flex;
  justify-content: center;
}
.row {
  margin: 0;
}
.btn {
  margin-bottom: 16px;
}

.title1 {
  font-size: 40px;
  color: rgb(40, 50, 143);
  border-radius: 10px;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
