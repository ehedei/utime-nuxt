export default ({ $axios }, inject) => {
  inject('getFreeAppointmentsByDateAndDoctor',
    async (doctorId, startDate, endDate) => await $axios.$get(`/appointment?booking=null&doctor=${doctorId}&start=${startDate}&end=${endDate}`))

  inject('createAppointmentsIntoDoctor',
    async (doctorId, body) => await $axios.$post(`/doctor/${doctorId}/appointment/`, body))

  inject('getAppointmentById',
    async id => await $axios.$get(`/appointment/${id}`))

  inject('cancelAppointmentIntoUser', async (userId, bookingId) => await $axios.$put(`/user/${userId}/booking/${bookingId}`, { status: 'cancelled' }))
}
