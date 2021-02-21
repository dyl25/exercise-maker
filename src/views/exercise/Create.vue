<template>
  <section class="section">
    <h2 class="title">Création d'un exercice</h2>
    <exercise-form :form="form" :handleSubmit="handleSubmit" />
  </section>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import ExerciseForm from '@/components/ExerciseForm.vue';

export default {
  components: {
    ExerciseForm
  },

  mounted() {
  },

  data() {
    return {
      form: {
        title: '',
        explenation: '',
        difficulty: null,
        tags: [],
        image: null,
        video: null
      }
    };
  },

  methods: {
    async handleSubmit() {
      const url = process.env.VUE_APP_API_URL;

      await axios.get(url + "/api/exercises", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('user_token'),
        },
      })
      .then(resp => this.exercises = resp.data)
      .catch(err => console.log('exercise list:' + err));
    },
  },
};
</script>
