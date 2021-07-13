export default ({ $axios }, inject) => {
  inject('getActiveBookingsFromUser', async (id) => await $axios.$get(`/user/${id}/booking?status=booked`))
  inject('createBookingIntoUser', async (id, appointmentId) => await $axios.$post(`/user/${id}/booking`, {
    appointment: appointmentId
  }))
}
