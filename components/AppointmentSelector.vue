<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4" xl="3">
        <v-date-picker
          v-model="date"
          :min="minDate"
          :allowed-dates="allowedDates"
          elevation="4"
          color="indigo darken-3"
          first-day-of-week="1"
          full-width
          @change="selectDate"
        >
        </v-date-picker>
      </v-col>
      <v-col cols="12">
      <AppointmentPicker
        :appointments="appointments"
        :date="date"
        :visible="appointmentVisible"
        @setPickerInvisible="appointmentVisible = !appointmentVisible"
        @saveAppointment="saveAppointment"
      ></AppointmentPicker>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const moment = require("moment");

export default {
  props: {
    doctorId: String,
  },
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      appointments: [],
      appointmentVisible: false,
    };
  },
  computed: {
    minDate() {
      return moment().format("YYYY-MM-DD");
    }
  },
  methods: {
    allowedDates: (date) => {
      return moment(date) >= moment().startOf("day");
    },
    async selectDate() {
      const appointments = await this.$getFreeAppointmentsByDateAndDoctor(
        this.doctorId,
        this.date
      );
      this.appointments = appointments;
      this.appointmentVisible = true;
    },
    saveAppointment(id) {
      this.$emit("saveAppointment", id);
    },
  },
};
</script>