<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card
          :today="today"
          :class="[
            today ? 'indigo darken-2 rounded-xl' : 'transparent',
            today ? 'elevation-6' : 'elevation-0',
            today ? 'px-4' : '',
            today ? 'px-sm-16' : '',
          ]"
        >
          <v-card-title v-if="today" class="justify-center white--text pt-8"
            >Today's Appointments</v-card-title
          >
          <AppointmentGroup
            :today="today"
            v-for="(appointments, idx) in bookingsByDoctor"
            :key="idx"
            :appointments="appointments"
          ></AppointmentGroup>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppointmentGroup from "./AppointmentGroup.vue";
export default {
  props: {
    today: {
      type: Boolean,
      default: true
      },
    appointments: Array,
  },
  computed: {
    bookingsByDoctor() {
      return Array.from(
        new Set(this.appointments.map((el) => el.appointment.doctor._id))
      ).map((doc) =>
        this.appointments.filter((el) => el.appointment.doctor._id === doc)
      );

    },
  },
  components: {
    AppointmentGroup,
  },
};
</script>
