<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/logo.png" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Genius Solution Center</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Please Input Username" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Please Input Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
                {{ error }}
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn> -->
                <v-btn block color="warn" @click="register" :loading="loadingRegister">Skip Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loadingLogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { getLogin } from '../api/user';

export default {
  data: () => ({
    loadingLogin: false,
    loadingRegister: false,
    error: '',
    model: {
      username: '',
      password: ''
    }
  }),

  methods: {
    login () {
      this.loadingLogin = true;

      getLogin(this.model.username, this.model.password)
        .then(response => {
          console.log(response.data);
          setTimeout(() => {
            this.$router.push('/tipbu-6streams');
          }, 2000);
        })
        .catch(e => {
          // console.log(e);
          this.error = 'Username or Password is incorrect';
          this.loadingLogin = false;
        });
    },

    register () {
      this.loadingRegister = true;
      setTimeout(() => {
        this.$router.push('/tipbu-6streams');
      }, 1000);
    }

  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
