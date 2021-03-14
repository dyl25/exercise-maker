<template>
  <div class="columns">
      <div class="column">
          <p>Nice Image</p>
      </div>
      <div class="colum">
          <p>{{ exercise.explenation }}</p>
      </div>
  </div>
</template>

<script>
//import axios from "axios";

export default {
    props: ['exercise'],

  data() {
    return {
      
    };
  },
  methods: {
      
  }
};
</script>
