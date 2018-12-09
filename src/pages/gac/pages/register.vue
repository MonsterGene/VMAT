<template>
  <v-app id="gac-register" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="/static/vue.png" alt="Vue Material Admin" width="120" height="120"> -->
                  <h1 class="flex my-4 primary--text">GAC New Account</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="username" label="Username" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                  <v-text-field append-icon="lock" name="first-name" label="First Name" id="first-name" type="text" v-model="model.first_name"></v-text-field>
                  <v-text-field append-icon="lock" name="given-name" label="Given Name" id="given-name" type="text" v-model="model.given_name"></v-text-field>
                  <v-text-field append-icon="lock" name="phone-number" label="Phone Number" id="phone-number" type="text" v-model="model.phone_number"></v-text-field>
                  <v-text-field append-icon="lock" name="email" label="Email Address" id="email" type="text" v-model="model.email"></v-text-field>
                  <v-text-field append-icon="lock" name="manager" label="Manager ID" id="manager" type="text" v-model="model.manager"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="" @click="back_to_login">Back to Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="register_submit" :loading="loading">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { getRegister } from '../api/gac';

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: '',
      first_name: '',
      given_name: '',
      phone_number: '',
      email: '',
      manager: '',
    }
  }),

  methods: {
    back_to_login () {
      setTimeout(() => {
        this.$router.push('/login');
      }, 1000);
    },
    register_submit () {
      this.loading = true;
      getRegister(this.model.username, this.model.password, this.model.first_name, this.model.given_name, this.model.phone_number, this.model.email, this.model.manager)
        .then(response => {
          // console.log(response.data);
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        })
        .catch(e => {
          // console.log(e);
          this.error = 'Username or Password is incorrect';
          this.loadingLogin = false;
        });

      setTimeout(() => {
        this.$router.push('/register');
      }, 2000);
    },
  }

};
</script>
<style scoped lang="css">
  #gac-register {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
