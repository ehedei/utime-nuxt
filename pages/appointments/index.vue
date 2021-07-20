<template>
  <v-container>
    <AppointmentList
      v-if="getAppointmentsFromToday.length > 0"
      :today="today"
      :appointments="getAppointmentsFromToday"
    ></AppointmentList>
    <AppointmentTimeline class="mt-7"
      :appointments="getNextAppointments"
    ></AppointmentTimeline>
  </v-container>
</template>

<script>

export default {
  async asyncData(context) {
    const id = context.$auth.user._id

    const bookings = await context.$getActiveBookingsFromUser(id);
    bookings.sort((a, b) => (new Date (a.start)).getTime() - (new Date (b.start)).getTime())
    return { bookings }
  },
  data() {
    return {
      title: 'Appointments',
      today: true
    };
  },
  computed: {
    getAppointmentsFromToday() {
      const firstMinute = prepareDate();
      const lastMinute = prepareDate(23, 59, 59);

      return this.bookings.filter(
        (booking) =>
          new Date(booking.appointment.start) >= firstMinute &&
          new Date(booking.appointment.end) <= lastMinute
      );
    },
    getNextAppointments() {
      const lastMinute = prepareDate(23, 59, 59);
      const Appointments = this.bookings.filter(
        (booking) => new Date(booking.appointment.start) > lastMinute
      );
      Appointments.sort(function(a,b) {
          return new Date(a.appointment.start) - new Date(b.appointment.start)
        })
      return Appointments
    },
  }
};

function prepareDate(hours = 0, minutes = 0, seconds = 0) {
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date;
}
</script>