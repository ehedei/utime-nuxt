<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <CardButton
          class="mb-14"
          :to="toAppointments"
          :title="appointmentsTitle"
          :src="srcAppointments"
        ></CardButton>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <CardButton
          class="mb-14"
          :to="toNewAppointment"
          :title="newAppointmentTitle"
          :src="srcNew"
        ></CardButton>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="user.role !== 'user'">
      <v-col cols="12" sm="6" md="4" lg="3">
        <CardButton
          :to="toCreateAppointments"
          :title="createAppointmentsTitle"
          :src="srcCreateAppointments"
        ></CardButton>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      toNewAppointment: '/appointments/new', // { name: 'newAppointment', params: { id: this.userId } },
      toAppointments: '/appointments', // { name: 'appointments', params: { id: this.userId } },
      toCreateAppointments: '/appointments/create',
      newAppointmentTitle: 'New Appointment',
      appointmentsTitle: 'Appointments',
      createAppointmentsTitle: 'Create Appointments',
      srcNew: 'mdi-pencil',
      srcAppointments: 'mdi-newspaper-variant',
      srcCreateAppointments: 'mdi-calendar',
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
}
</script>
