<template>
  <div class="green lighten-4">Is today, so... you can see it</div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    const token = this.$auth.strategy.token.get()

    this.socket = this.$nuxtSocket({
      name: 'main',
      extraHeaders: { Authorization: `Bearer ${token}` },
    })
    /* Listen for events: */

  },
}
</script>
