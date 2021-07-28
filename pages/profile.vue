<template>
  <v-container>
    <v-row class="d-flex justify-center mt-7">
      <v-col cols="10" lg="6">
        <div
          :class="[
            $vuetify.breakpoint.smAndDown
              ? 'profilePictureSmall'
              : 'profilePicture',
          ]"
        >
          <v-badge
            avatar
            bordered
            overlap
            color="orange"
            :value="!isEditPress"
            offset-x="25"
            offset-y="25"
          >
            <template v-slot:badge>
              <v-avatar>
                <v-icon
                >mdi-autorenew</v-icon>
              </v-avatar>
            </template>
            <v-avatar
              color="indigo darken-4 white--text my-2 elevation-3"
              :size="getImgSize"
              @click="activateImgInput"
              :class="[isEditPress ? '' : 'clickable']"
            >
              <v-img
                v-if="user.image"
                :src="user.image"
                :alt="user.username"
                cover
              ></v-img>
              <v-icon v-else color="white" size="60" >mdi-account</v-icon>
            </v-avatar>
          </v-badge>

          <div v-show="img" id="imgInput" class="pe-2">
            <v-file-input
              ref="input"
              accept="image/gif, image/jpeg, image/png"
              v-model="img"
              show-size
              truncate-length="15"
            ></v-file-input>
          </div>
        </div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          height="200px"
          class="scroll"
          @scroll.passive="onScroll"
        >
          <v-text-field
            v-model="username"
            dense
            filled
            label="Username"
            :placeholder="
              user.username ? user.username : 'Introduce your username'
            "
            required
            clearable
            persistent-placeholder
            :disabled="isDisable"
            prepend-inner-icon="mdi-account"
            class="inputtext"
          ></v-text-field>

          <v-text-field
            v-model="email"
            filled
            dense
            label="Email"
            :placeholder="user.email ? user.email : 'Introduce your email'"
            required
            clearable
            persistent-placeholder
            :disabled="isDisable"
            prepend-inner-icon="mdi-email"
            class="inputtext"
          ></v-text-field>

          <v-text-field
            v-if="!isEditPress"
            v-model="password"
            class="inputtext"
            filled
            dense
            label="Password"
            placeholder="Introduce a new password"
            required
            clearable
            persistent-placeholder
            prepend-inner-icon="mdi-lock"
            :type="passwordview ? 'password' : 'text'"
            :append-icon="passwordview ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append="passwordview = !passwordview"
          ></v-text-field>

          <v-text-field
            v-model="firstName"
            filled
            dense
            label="First name"
            :placeholder="
              user.firstName ? user.firstName : 'Introduce your first name'
            "
            required
            clearable
            persistent-placeholder
            :disabled="isDisable"
            prepend-inner-icon="mdi-rename-box"
            class="inputtext"
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            filled
            dense
            label="Last name"
            :placeholder="
              user.lastName ? user.lastName : 'Introduce your last name'
            "
            required
            clearable
            persistent-placeholder
            :disabled="isDisable"
            prepend-inner-icon="mdi-rename-box"
            class="inputtext"
          ></v-text-field>

          <v-text-field
            v-model="mobile"
            filled
            dense
            label="Phone number"
            :placeholder="
              user.mobile ? user.mobile : 'Introduce your phone number'
            "
            required
            clearable
            persistent-placeholder
            :disabled="isDisable"
            prepend-inner-icon="mdi-cellphone"
            class="app-inputtext inputtext"
          ></v-text-field>

          <div class="d-flex justify-center">
            <div
              v-if="isEditPress"
              class="buttonWrapper d-flex justify-center pt-2 mt-2"
            >
              <v-btn
                elevation="3"
                height="40"
                :class="[
                  'indigo',
                  $vuetify.breakpoint.smAndDown ? 'buttonSmall' : 'button',
                ]"
                @click="editPress"
              >
                Edit
              </v-btn>
            </div>
            <div
              v-else
              class="buttonWrapper d-flex justify-space-around pt-2 mt-2"
            >
              <v-btn
                elevation="3"
                height="40"
                :class="[
                  'indigo',
                  $vuetify.breakpoint.smAndDown ? 'buttonSmall' : 'button',
                ]"
                @click="editPress"
              >
                Cancel
              </v-btn>
              <v-btn
                elevation="3"
                height="40"
                :class="[
                  'orange darken-4',
                  $vuetify.breakpoint.smAndDown ? 'buttonSmall' : 'button',
                ]"
                @click="validate"
              >
                Save Changes
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Profile </v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo darken-1" text @click="closeModal">
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
  layout: 'default',

  data() {
    return {
      isEditPress: true,
      imgSrc: '',
      img: null,
      passwordview: true,
      username: '',
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      valid: true,
      message: '',
      dialog: false,
      isDisable: true,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    getImgSize() {
      return this.$vuetify.breakpoint.smAndDown ? '125' : '175'
    },
  },
  methods: {
    editPress() {
      this.isEditPress = !this.isEditPress
      this.isDisable = !this.isDisable
    },
    async selectFile() {
      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      /* Read data */
      const data = await readData(this.img)

      /* upload the converted data */
      const instance = await this.$cloudinary.upload(data, {
        folder: 'utime/user',
        uploadPreset: 'userProfile',
      })

      this.imgSrc = instance.url
    },
    async updateUser() {
      if (this.img) {
        await this.selectFile()
      }
      const updatedUser = {}

      if (this.username) {
        updatedUser.username = this.username.trim()
      }

      if (this.email) {
        updatedUser.email = this.email.trim().toLowerCase()
      }

      if (this.lastName) {
        updatedUser.lastName = this.lastName.trim()
      }

      if (this.firstName) {
        updatedUser.firstName = this.firstName.trim()
      }

      if (this.imgSrc) {
        updatedUser.image = this.imgSrc
      }

      if (this.password) {
        updatedUser.password = this.password
      }

      if (this.phone) {
        updatedUser.phone = this.phone.trim()
      }

      if (this.mobile) {
        updatedUser.mobile = this.mobile.trim()
      }
      try {
        const newUser = await this.$updateUser(updatedUser)
        this.$auth.setUser(newUser)
        this.img = null

        this.message = 'User updated'
      } catch (error) {
        this.message = 'Something went wrong. Try again!'
      }
      this.isEditPress = !this.isEditPress
      this.username = ''
      this.email = ''
      this.firstName = ''
      this.lastName = ''
      this.password = ''
      this.mobile = ''
      this.isEditPress = true
      this.passwordview = true
      this.isDisable = true
      this.dialog = true
    },
    closeModal() {
      this.dialog = false
    },
    validate() {
      const validate = this.$refs.form.validate()
      if (validate) {
        this.updateUser()
      }
    },
    activateImgInput() {
      if(!this.isEditPress) {
        this.$refs.input.$refs.input.click()
      }
    },
  },
}
</script>
<style scoped>

.buttonWrapper {
  width: 500px;
}

.profilePicture {
  text-align: center;
  margin-top: -50px;
  margin-bottom: 40px;
}
.profilePictureSmall {
  text-align: center;
  margin-top: -25px;
  margin-bottom: 20px;
}
.button {
  color: rgb(255, 255, 255) !important;
  width: 160px;
  height: 65px;
  border-radius: 12px;
  text-shadow: rgb(0 0 0 / 70%) 2px 2px 2px;
  padding: 0%;
  font-size: 1rem;
}
.buttonSmall {
  margin-top: 10px;
  color: rgb(255, 255, 255) !important;
  width: 120px;
  height: 50px;
  border-radius: 12px;
  text-shadow: rgb(0 0 0 / 70%) 2px 2px 2px;
  margin-bottom: 10px;
  padding: 0%;
  font-size: 0.75rem;
}
.scroll {
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: #f5f5f500;
}

::-webkit-scrollbar {
  width: 10px;
  left: -100px;
}
::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 100px;
  background-color: rgba(0, 0, 0, 0.15);
}
.v-form .v-text-field >>> .v-input__slot {
  background: rgb(255, 255, 255) !important;
}

.v-text-field >>> .v-input__slot::before {
  border-style: none;
}

.v-text-field >>> .error--text {
  color: rgb(255, 255, 255) !important;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}
.v-application .error--text {
  caret-color: rgb(255, 0, 0) !important;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}
.v-text-field >>> .v-label {
  color: rgba(0, 0, 0, 0.8) !important;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  font-size: 1rem;
}
.v-text-field >>> .v-messages__message {
  padding-left: 12px;
}
.v-text-field >>> .v-icon {
  color: rgb(63, 63, 63) !important;
  margin-right: 8px;
}
.inputtext {
  border-radius: 10px;
}
.clickable {
  cursor: pointer;
}
</style>
