<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        v-model="form.email"
        type="email"
        name="mail"
        placeholder="E-mail"
      >
    </div>

    <div>
      <input
        v-model="form.password"
        type="password"
        name="pwd"
        placeholder="Mot de passe"
      >
    </div>

    <div>
      <button type="submit">Login</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
      async onSubmit() {
          const url = process.env.VUE_APP_API_URL
          
          await axios.post(url + '/api/login', this.form)
          .then(async resp => {
            const token = resp.data.access_token
            localStorage.setItem('user_token', token)
          
            await axios.post(url + '/api/me', {}, {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            })
            .then(resp => localStorage.setItem('user', JSON.stringify(resp.data)))
            .catch(err => console.log(err))

          })
          .catch(err => console.log(err))
      }
  }
};
</script>
