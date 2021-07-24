<template>
  <v-app dark>
    <BasicNavBar></BasicNavBar>
    <v-main class="app-bg">
      <v-container fluid fill-height>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Oswald:wght@700&display=swap');
.app-bg {
  background-image: radial-gradient(
      circle at 34% 75%,
      rgba(142, 142, 142, 0.06) 0%,
      rgba(142, 142, 142, 0.06) 50%,
      rgba(11, 11, 11, 0.06) 50%,
      rgba(11, 11, 11, 0.06) 100%
    ),
    radial-gradient(
      circle at 40% 51%,
      rgba(12, 12, 12, 0.06) 0%,
      rgba(12, 12, 12, 0.06) 50%,
      rgba(242, 242, 242, 0.06) 50%,
      rgba(242, 242, 242, 0.06) 100%
    ),
    radial-gradient(
      circle at 50% 87%,
      rgba(189, 189, 189, 0.06) 0%,
      rgba(189, 189, 189, 0.06) 50%,
      rgba(0, 0, 0, 0.06) 50%,
      rgba(0, 0, 0, 0.06) 100%
    ),
    linear-gradient(90deg, hsl(35, 0%, 96%), hsl(35, 0%, 96%));
}

h1 {
  font-size: 3.5rem;
  font-family: 'Josefin Sans', sans-serif;
  letter-spacing: 2px;
}

.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>