<template>
  <section class="section">
    <exercise :exercise="exercise" v-for="exercise in exercises" :key="exercise.id" />
  </section>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Exercise from '@/components/Exercise.vue';

export default {
  components: {
    Exercise
    //Exercise,
  },

  mounted() {
    this.exercises = this.getExercises();
    console.log(this.exercises);
  },

  data() {
    return {
      exercises: [],
    };
  },

  methods: {
    async getExercises() {
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
