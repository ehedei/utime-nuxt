export default ({ $axios }, inject) => {
  inject('getFreeAppointmentsByDateAndDoctor',
    async (doctorId, date) => await $axios.$get(`/appointment?booking=null&doctor=${doctorId}&start=${date}`))

  inject('createAppointmentsIntoDoctor',
    async (doctorId, body) => await $axios.$post(`/doctor/${doctorId}/appointment/`, body))
}
