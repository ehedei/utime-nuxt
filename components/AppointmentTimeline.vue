<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card id="card1">
          <v-title>
            <p class="title1 text-center">Next Appointments</p>
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
                class="text-h6 white--text justify-center mx-auto pa-4 indigo"
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
  data: () => ({}),
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
  },
}
</script>

<style scoped>
#cards {
  border-radius: 15px;
  width: 90vw;
  box-shadow: 0 !important;
}
#card1 {
  box-shadow: none;
  padding: 20px;
  background-color: rgba(51, 59, 53, 0.24);
  border-radius: 10px;
}
.row {
  width: 80vw;
  display: flex;
  justify-content: center;
}

.title1 {
  font-size: 50px;
  color: white;
}


</style>
