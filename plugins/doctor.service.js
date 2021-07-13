export default ({ $axios }, inject) => {
  inject('getDoctors', async (params) => await $axios.$get('/doctor/'))
}
