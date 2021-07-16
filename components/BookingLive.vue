<template>
  <div class="green lighten-4">Is today, so... you can see it</div>
</template>

<script>
export default {
  data() {
    return {
      socket: null
    }
  },
  mounted() {
    const token = this.$auth.strategy.token.get().replace('token ', '')
    console.log(token)

    this.socket = this.$nuxtSocket({
      name: 'main',
      query: `token=${token}`
    })
    /* Listen for events: */

  },
}
</script>
