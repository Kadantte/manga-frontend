<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title>
        <h5>Register</h5>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Username" v-model="username" required></v-text-field>
          <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field name="Password" label="Enter your password" hint="At least 8 characters" v-model="password" min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter></v-text-field>
          <v-text-field name="Password" label="Enter your password" hint="At least 8 characters" v-model="password2" min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" :rules="passwordRules"
            counter></v-text-field>
          <v-btn @click="submit">
            submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => {
      return {
        username: '',
        password: '',
        password2: '',
        email: '',
        e1: true,
        alert: false
      }
    },
    methods: {
      submit: function (e) {
        if (this.password !== this.password2) {
          this.$store.commit('alerts/addAlert', {
            type: 'error',
            alert: 'Passwords must match'
          })
          return
        }
        this.$axios.$post('/auth/register', JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        }))
          .then((response) => {
            if (response['response'] === null) {
              this.$store.commit('alerts/add', {
                type: 'error',
                text: 'Error something went wrong'
              })
              return
            }
            if (response['success'] !== true) {
              this.$store.commit('alerts/add', {
                type: 'error',
                text: 'The sign up attempt failed!'
              })
              return
            }
            this.$store.commit('alerts/add', {
              type: 'success',
              text: 'You signed up successfully!'
            })
            this.$router.push('/login')
          })
      }
    }
  }
</script>