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
                  <h1 class="flex my-4 primary--text">Forget Password</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="username" label="Username" id="username" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="email" label="Email Address" id="email" type="email" v-model="model.email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="" @click="back_to_login">Back to Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="forgetPassword" :loading="loading">Forget Password</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      email: ''
    }
  }),

  methods: {
    back_to_login () {
      setTimeout(() => {
        this.$router.push('/login');
      }, 1000);
    },
    forgetPassword () {
      this.loading = true;
      setTimeout(() => {
        this.$router.push('/vision/advanced/?uuttype=IR1100');
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
