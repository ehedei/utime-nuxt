<template>
  <v-container fluid>
    <v-stepper id="stepper" v-model="e1" alt-labels flat>
      <v-stepper-items>
        <v-stepper-content step="1" class="px-0">
          <v-card class="mb-12" color="transparent" flat>
            <v-card-title class="justify-center white--text">Select a Specialty</v-card-title>
            <SpecialtySelector
              :specialties="specialties"
              @specialtySelected="assignSpecialty"
            ></SpecialtySelector>
          </v-card>
          <div class="d-flex justify-center">
            <v-btn
              color="white"
              text
              class="text-decoration-underline"
              @click="back"
            >
              Back
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2" class="px-0">
          <v-card class="mb-12" color="transparent" flat>
            <v-card-title class="justify-center white--text">Choose your Doctor</v-card-title>
            <DoctorSelector
              :specialty="specialty"
              @selectDoctor="assignDoctor"
            ></DoctorSelector>
          </v-card>
          <div class="d-flex justify-center">
            <v-btn
              color="white"
              text
              class="text-decoration-underline"
              @click="e1--"
            >
              Back
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3" class="px-0">
          <v-card class="mb-12" color="transparent" flat>
            <v-card-title class="justify-center white--text">Schedule your Appointment</v-card-title>
            <AppointmentSelector
              :doctorId="doctorId"
              @saveAppointment="saveAppointment"
            ></AppointmentSelector>
          </v-card>

          <div class="d-flex justify-center">
            <v-btn
              color="white"
              text
              @click="e1--"
              class="text-decoration-underline"
            >
              Back
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="indigo darken-4">
          <span class="text-center">Select a Specialty</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" color="indigo darken-4">
          <span class="text-center">Choose your Doctor</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3" color="indigo darken-4"
          ><span class="text-center"
            >Schedule your Appointment</span
          ></v-stepper-step
        >
      </v-stepper-header>
    </v-stepper>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Booking process </v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo darken-1" text @click="dialog = false">
                Accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  async asyncData(context) {
    const specialties = await context.$getSpecialties()
    return { specialties }
  },
  data() {
    return {
      e1: 1,
      specialty: {},
      doctorId: "",
      message: "",
      dialog: false,
    };
  },
  methods: {
    async assignSpecialty(id) {
      const specialty = await this.$getSpecialtyById(id);
      this.specialty = specialty;
      this.e1++;
    },
    assignDoctor(id) {
      this.doctorId = id;
      this.e1++;
    },
    async saveAppointment(appointmentId) {
      const id = this.$auth.user._id

      try {
        await this.$createBookingIntoUser(id, appointmentId);
        this.message = "Booking confirmed";
      } catch (error) {
        this.message = "Something goes wrong. Try again";
      } finally {
        this.dialog = true;
      }
    },
    back() {
      this.$router.push('/home');
    },
  },
};
</script>

<style lang="scss" scoped>
#stepper {
  background: transparent;
}
</style>