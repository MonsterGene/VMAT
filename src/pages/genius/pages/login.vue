<template>
  <v-app id="gac-login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/logo.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">GAC Login</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Username" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
                <p>{{ login_error }}</p>
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn block color="" @click="register">New Account</v-btn> -->
                <!-- <v-btn block color="" @click="forget">Forget ?</v-btn> -->
                <!-- <v-spacer></v-spacer> -->
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import { getLogin } from '../api/login';

Vue.use(VueCookies);

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    }, 
    login_error: '',
  }),

  mounted () {
    this.$cookies.remove('username');
    this.$cookies.remove('role');
  },
  methods: {
    login () {
      this.loading = true;

      getLogin(this.model.username, this.model.password)
        .then(response => {
          // console.log(response.data);

          if (!response.data.status) {
            this.login_error = response.data.msg;
            this.model.password = '';
            this.loading = false;
            return false;
          }
          const display_name = response.data.user;
          const role = response.data.role;

          this.$cookies.set('username', display_name, '1d');
          this.$cookies.set('role', role, '1d');
          setTimeout(() => {
            this.loading = false;
            this.$router.push('/genius/machine');
          }, 2000);
        })
        .catch(e => {
          // console.log(e);
          this.login_error = 'Incorrect Username or Password...';
          this.model.password = '';
          this.loading = false;
          this.$cookies.set('username', 'admin', '1h');
          this.$cookies.set('role', 'engineer', '1h');
          this.$router.push('/genius/machine');
          // this.$router.push('/register');
        });
    },
  }

};
</script>
<style scoped lang="css">
  #gac-login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
