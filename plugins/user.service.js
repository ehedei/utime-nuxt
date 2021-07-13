export default ({ $axios }, inject) => {
  inject('signup', async (newUser) => await $axios.$post('/auth/signup', newUser))
}
