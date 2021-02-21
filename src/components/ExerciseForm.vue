<template>
  <form action="" @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label" for="title">Titre</label>

      <div class="control">
        <input v-model="form.title" class="input" type="text" name="title" id="title" >
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="select">
            <select v-model="form.difficulty" name="difficulties" id="difficulties">
              <option value="">-</option>
              <option
                v-for="difficulty in difficulties"
                :key="difficulty.id"
                value=""
              >
                {{ difficulty.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <span v-for="tag in tags" :key="tag.id" class="tag is-primary ml-1">
            {{ tag.name }}
            <button class="delete is-small"></button>
          </span>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label" for="explenation">Explication</label>

      <div class="control">
        <textarea
          v-model="form.explenation"
          name="explenation"
          id="explenation"
          class="textarea"
        ></textarea>
      </div>
    </div>

    <div class="columns">
      <div class="column">
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
      </div>
      <div class="column">
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
      </div>
    </div>
    
    <button class="button is-large is-success">Ajouter</button>

  </form>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  props: ["handleSubmit", "form"],
  components: {},

  mounted() {
    this.getTags();
    this.getDifficulties();
  },

  data() {
    return {
      tags: [
        {id: 1,name: 'abdos'}, {id: 2,name: 'bras'}, {id: 3,name: 'jambes'}
      ],
      difficulties: [],
    };
  },

  methods: {
    async getTags() {
      /*await axios
        .get("/api/tags", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        })
        .then((resp) => (this.tags = resp.data))
        .catch((err) =>
          console.log("Les tags n'ont pas put être chargés:" + err)
        );*/
    },

    async getDifficulties() {
      await axios
        .get("/api/difficulties", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        })
        .then((resp) => (this.difficulties = resp.data))
        .catch((err) =>
          console.log("les difficultés n'ont pas put être chargés" + err)
        );
    },
  },
};
</script>
