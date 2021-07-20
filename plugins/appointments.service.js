export default ({ $axios }, inject) => {
  inject('getFreeAppointmentsByDateAndDoctor',
    async (doctorId, startDate, endDate) => await $axios.$get(`/appointment?booking=null&doctor=${doctorId}&start=${startDate}&end=${endDate}`))

  inject('createAppointmentsIntoDoctor',
    async (doctorId, body) => await $axios.$post(`/doctor/${doctorId}/appointment/`, body))
}
