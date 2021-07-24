const moment = require('moment')

export default ({ $axios }, inject) => {
  inject('getActiveBookingsFromUser', async (id) => {
    const today = moment.utc().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    return await $axios.$get(`/user/${id}/booking?status=booked&start=${today}`)
  })
  inject('createBookingIntoUser', async (id, appointmentId) => await $axios.$post(`/user/${id}/booking`, {
    appointment: appointmentId,
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  }))
  inject('getBookingByIdIntoUser', async (id, bookingId) => await $axios.$get(`/user/${id}/booking/${bookingId}`))
  inject('getBookingById', async id => await $axios.$get(`/booking/${id}`))
}
