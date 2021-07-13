export default ({ $axios }, inject) => {
  inject('getSpecialties', async () => await $axios.$get('/specialty'))
  inject('getSpecialtyById', async (id) => await $axios.$get(`/specialty/${id}`))
}
