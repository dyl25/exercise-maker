<template>
  <form action="" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label" for="title">Titre</label>

      <div class="control">
        <input class="input" type="text" name="title" id="title" />
      </div>
    </div>

    <div class="field">
      <label class="label" for="explenation">Explication</label>

      <div class="control">
        <textarea
          name="explenation"
          id="explenation"
          class="textarea"
        ></textarea>
      </div>
    </div>

    <div class="field">
      <div class="file has-name is-boxed">
        <label class="file-label">
          <input class="file-input" type="file" name="image" />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choisir une image </span>
          </span>
          <span class="file-name">
            Screen Shot 2017-07-29 at 15.54.25.png
          </span>
        </label>
      </div>
    </div>

    <div class="field">
      <div class="file has-name is-boxed">
        <label class="file-label">
          <input class="file-input" type="file" name="video" />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label"> Choisir une vidéo </span>
          </span>
          <span class="file-name">
            Screen Shot 2017-07-29 at 15.54.25.png
          </span>
        </label>
      </div>
    </div>
  </form>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  props: ["handleSubmit"],
  components: {},

  mounted() {
      this.getTags();
  },

  data() {
    return {
      tags: [],
    };
  },

  methods: {
      getTags() {
          
      }
  },
};
</script>
