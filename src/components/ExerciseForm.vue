<template>
    <form action="" @submit.prevent="handleSubmit">
        <div class="field">
            <label class="label" for="title">Titre</label>

            <div class="control">
                <input
                    v-model="formData.title"
                    class="input"
                    type="text"
                    name="title"
                    id="title"
                />
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label for="difficulties" class="label">Difficulté</label>
                    <div class="control">
                        <div class="select">
                            <select
                                v-model="formData.difficulty"
                                name="difficulties"
                                id="difficulties"
                            >
                                <option value="">-</option>
                                <option
                                    v-for="difficulty in difficulties"
                                    :key="difficulty.id"
                                    :value="difficulty.id"
                                >
                                    {{ difficulty.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <p class="has-text-centered label">Tag de l'exercice</p>

                <div class="columns">
                    <div class="column">
                        <div class="field has-addons">
                            <div class="control">
                                <input
                                    v-model="searchTerm"
                                    class="input is-small"
                                    type="text"
                                    placeholder="Chercher un tag"
                                />
                            </div>
                            <div class="control">
                                <a class="button is-info is-small"> Ajouter </a>
                            </div>
                        </div>

                        <div class="field">
                            <span
                                v-for="tag in filteredTagList"
                                :key="tag.id"
                                class="tag is-primary ml-1"
                                @click="addTag(tag.name)"
                            >
                                {{ tag.name }}
                            </span>
                        </div>
                    </div>
                    <div class="column">
                        <p class="mb-3">Tags sélectionnés</p>
                        <div>
                            <span
                                v-for="(tag, index) in formData.tags"
                                :key="index"
                                class="tag is-info ml-1"
                            >
                                {{ tag }}
                                <button
                                    class="delete is-small"
                                    @click="removeTag(tag)"
                                ></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label" for="explenation">Explication</label>

            <div class="control">
                <textarea
                    v-model="formData.explenation"
                    name="explenation"
                    id="explenation"
                    class="textarea"
                ></textarea>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="file has-name is-boxed">
                    <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            name="image"
                            accept="image/jpg, image/jpeg, image/png"
                            @change="
                                beginingImageChange($event.target.files[0])
                            "
                        />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label"> Image de début </span>
                        </span>
                        <span class="file-name">
                            {{
                                this.formData.beginingImage
                                    ? this.formData.beginingImage.name
                                    : ""
                            }}
                        </span>
                    </label>
                </div>
                <img
                    v-if="formData.beginingImage"
                    alt=""
                    :src="displayImageUrl(formData.beginingImage)"
                />
            </div>

            <div class="column">
                <div class="file has-name is-boxed">
                    <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            name="imageEnd"
                            accept="image/jpg, image/jpeg, image/png"
                            @change="endingImageChange($event.target.files[0])"
                        />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label"> Image de fin </span>
                        </span>
                        <span class="file-name">
                            {{
                                this.formData.endingImage
                                    ? this.formData.endingImage.name
                                    : ""
                            }}
                        </span>
                    </label>
                </div>
                <img
                    v-if="formData.endingImage"
                    alt=""
                    :src="displayImageUrl(formData.endingImage)"
                />
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <div class="file has-name is-boxed">
                        <label class="file-label">
                            <input
                                class="file-input"
                                type="file"
                                name="video"
                                accept="video/mp4, video/webm, image/gif"
                                @change="videoChange($event.target.files[0])"
                            />
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Vidéo
                                </span>
                            </span>
                            <span class="file-name">
                                {{
                                    this.formData.video
                                        ? this.formData.video.name
                                        : ""
                                }}
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
import axios from "axios";

export default {
    props: ["handleSubmit", "modelForm"],
    components: {},

    mounted() {
        this.getTags();
        this.getDifficulties();
    },

    computed: {
        formData: {
            get: function () {
                return this.modelForm;
            },
            set: function (formData) {
                this.$emit("update:modelForm", formData);
            },
        },
        filteredTagList() {
            return this.tags.filter((tag) => {
                return tag.name
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase());
            });
        },
    },

    data() {
        return {
            tags: [
                { id: 1, name: "abdos" },
                { id: 2, name: "bras" },
                { id: 3, name: "jambes" },
            ],
            difficulties: [],
            searchTerm: "",
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
                        Authorization:
                            "Bearer " + localStorage.getItem("user_token"),
                    },
                })
                .then((resp) => (this.difficulties = resp.data))
                .catch((err) =>
                    console.log(
                        "les difficultés n'ont pas put être chargés" + err
                    )
                );
        },

        selectTag(tagId) {
            if (!this.formData.tags.includes(tagId)) {
                this.formData.tags.push(tagId);
            }
        },

        addTag(tag) {
            if (!this.formData.tags.includes(tag)) {
                this.formData.tags.push(tag);
            }
        },

        removeTag(tag) {
            this.formData.tags = this.formData.tags.filter(
                (formTag) => formTag !== tag
            );
        },

        beginingImageChange(file) {
            this.formData.beginingImage = file;
        },

        endingImageChange(file) {
            this.formData.endingImage = file;
        },

        videoChange(file) {
            this.formData.video = file;
        },

        displayImageUrl(file) {
            return URL.createObjectURL(file);
        },
    },
};
</script>
