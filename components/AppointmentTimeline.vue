<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="checkappointments" id="card1">
          <v-card-title class="containerTitle">
            <p :class="[$vuetify.breakpoint.smAndDown ? 'title1Small' : 'title1']">Next Appointments</p>
          </v-card-title>
          <v-card-text :class="[$vuetify.breakpoint.smAndDown ? 'nextAppointmentsSmall' : 'nextAppointments']">
            <v-timeline :dense="$vuetify.breakpoint.smAndDown" witdh="300px">
              <v-timeline-item
                v-for="(appointment, ind) in appointmentsByDate"
                :key="ind"
                color="#cd722e"
                icon="mdi-calendar-clock"

              >
                <v-card id="cards" elevation="7">
                  <v-card-title
                    class="
                      text-h6
                      white--text
                      justify-center
                      mx-auto
                      pa-4
                      indigo
                    "
                  >
                    {{ appointment.date }}
                  </v-card-title>
                  <v-card>
                    <v-card-text class="white text--primary">
                      <div
                        v-for="(a, i) in appointment.appointments"
                        :key="i"
                        class="text-center rounded pink lighten-5"
                      >
                        <p>
                          {{ a.appointment.doctor.name }}
                        </p>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
        <v-card v-else id="card1">
          <v-card-title class="containerTitle">
            <p :class="[$vuetify.breakpoint.smAndDown ? 'title1Small' : 'title1']" >No appointments ahead</p>
          </v-card-title>
          <v-card-text class="bannerContainer">
            <v-banner :class="[$vuetify.breakpoint.smAndDown ? 'curiosityBannerSmall' : 'curiosityBanner',]">
              <p class="curiosityText">Do you know that ...</p>
              <p class="curiosityText">{{ getCuriosity }}</p>
              <template v-slot:actions>
                <v-btn text color="orange" class="btn text--darken-3" :class="['btn', 'text--darken-3', $vuetify.breakpoint.smAndDown ? 'btnSmall' : 'btn',]" @click="nextCuriosity">
                  Next curiosity
                </v-btn>
              </template>
            </v-banner>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    appointments: Array,
  },
  data() {
    return {
      index: 0,
      curiosities: [
        'One in every 1000 babies is born with a tooth.',
        'Laughing is good for the heart and can increase blood flow by 20 percent.',
        'Always look on the bright side: being an optimist can help you live longer.',
        'Exercise will give you more energy, even when you’re tired.',
        'Sitting and sleeping are great in moderation, but too much can increase your chances of an early death.',
        'A lack of exercise now causes as many deaths as smoking.',
        '39% of adults in the world are overweight.',
        'Between 2000 and 2015, the average global life expectancy increased by five years.',
        'Less than 1% of Americans ride their bike to work, while 50% of Copenhagen residents bike to work or school.',
        'The US spends almost three times more on healthcare than any other country in the world, but ranks last in life expectancy among the 12 wealthiest industrialized countries.',
        'Learning a new language or playing a musical instrument gives your brain a boost.',
        'Feeling stressed? Read. Getting lost in a book can lower levels of cortisol, and other unhealthy stress hormones, by 68%.',
        'Maintaining good relationships with your friends and family, reduces harmful levels of stress and boosts your immune system.',
        'Drinking coffee can reduce the risk of depression, especially in women.',
        'Smelling rosemary may increase alertness and improve memory so catch a whiff before a test or important meeting.',
        'Swearing can make you feel better when you’re in pain.',
        'Writing in a journal can make you a happier person!',
        'Chewing gum makes you more alert, relieves stress and reduces anxiety levels.',
        'Yoga can boost your cognitive function and lower stress.',
        'Walking outside – or spending time in green space – can reduce negative thoughts and boost self-esteem.',
        'Chocolate is good for your skin; its antioxidants improve blood flow and protect against UV damage.',
        'Almonds, avocados and arugula (the three ‘A’s) can boost your sex drive and improve fertility.',
        'Tea can lower risks of heart attack, certain cancers, type 2 Diabetes and Parkinson’s disease. Just make sure your tea isn’t too sweet!',
        'Eating oatmeal provides a serotonin boost to calm the brain and improve your mood.',
        'Although it only takes you a few minutes to eat a meal, it takes your body hours to completely digest the food.',
        'Women below the age of 50 need twice the amount of iron per day as men of the same age.',
        'An apple a day does keep the doctor away. Apples can reduce levels of bad cholesterol to keep your heart healthy.',
        'The amino acid found in eggs can help improve your reflexes.',
        'Extra virgin olive oil is the healthiest fat on the planet.',
        'Vitamin D is as important as calcium in determining bone health, and most people don’t get enough of it.',
        'There are five main components of fitness: the body’s ability to use oxygen, muscular strength, endurance, flexibility and body composition.',
        'The body has more than 650 muscles.',
        'Sleeping naked can help you burn more calories.',
        'Walking at a fast pace for three hours or more at least once a week, you can reduce your risk of heart disease by up to 65%.',
        'Even at rest, muscle is three times more efficient at burning calories than fat.',
        'Regular activity can ease the severity and reduce the frequency of lower back pain.',
        'Running is good for you. People who run 12-18 miles a week have a stronger immune system and can increase their bone mineral density.'
      ],
    }
  },
  computed: {
    appointmentsByDate() {
      return Array.from(
        new Set(
          this.appointments.map((appointment) =>
            moment(appointment.appointment.start).format('YYYY-MM-DD')
          )
        )
      )
        .sort()
        .map((el) => {
          return {
            date: el,
            appointments: this.appointments.filter(
              (element) =>
                moment(element.appointment.start).diff(el, 'days') === 0
            ),
          }
        })
    },
    checkappointments() {
      if (this.appointments.length === 0) {
        return false
      } else {
        return true
      }
    },
    getCuriosity() {
      return this.curiosities[this.index]
    },
  },
  methods: {
    nextCuriosity() {
      if (this.index < this.curiosities.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
    },
  },
}
</script>

<style scoped>
#cards {
  border-radius: 15px;
  box-shadow: 0 !important;
  max-width: 500px;
}
.baby {
  width: 150px;
  height: 100px;
}
#card1 {
  box-shadow: none;
  border-radius: 10px;
  background-color: transparent;
}
.curiosityBanner {
  width: 50vw;
  margin-top: 10vh;
  color: rgb(40, 50, 143);
  font-size: 1.2rem;
}
.curiosityBannerSmall {
  width: 90vw;
  margin-top: 10vh;
  color: rgb(40, 50, 143);
  font-size: 1.2rem;
}
.bannerContainer {
  display: flex;
  justify-content: center;
}
.containerTitle {
  display: flex;
  justify-content: center;
}
.row {
  margin: 0;
}
.btn {
  margin-bottom: 16px;
  font-size: 16px;
}
.btnSmall {
  font-size: 14px;
  margin-left: 0;
  justify-content: center;
}
.v-banner__actions {
  justify-content: center;
}
.v-card__text {
  width: auto;
}

.title1 {
  font-size: 40px;
  color: rgb(40, 50, 143);
  border-radius: 10px;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 1.1;
  text-align: center;
}
.title1Small {
  font-size: 25px;
  color: rgb(40, 50, 143);
  border-radius: 10px;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 1.1;
  text-align: center;
}
.nextAppointmentsSmall {
  margin-left: -50px;
}

</style>
