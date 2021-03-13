<template>
    <section class="section">
        <h2 class="title">Création d'un exercice</h2>
        <!--<exercise-form :form="form" @update:form="form = $event" :handleSubmit="handleSubmit" />-->
        <exercise-form v-model:modelForm="form" :handleSubmit="handleSubmit" />

    </section>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ExerciseForm from "@/components/ExerciseForm.vue";

export default {
    components: {
        ExerciseForm,
    },

    mounted() {},

    data() {
        return {
            form: {
                title: "",
                explenation: "",
                difficulty: null,
                tags: [],
                beginingImage: null,
                endingImage: null,
                video: null,
                userId: JSON.parse(localStorage.getItem('user')).id
            },
        };
    },

    methods: {
        
        createFormData(form) {
            const formData = new FormData();

            Object.keys(form).forEach(key => {
                if(form[key]) {
                    if(Array.isArray(form[key])) {
                        form[key].forEach((item,i) => {
                            formData.append(key+'['+ i +']', item)
                        });
                    }else{
                        //if(!form[key]) {
                            //formData.append(key, null);
                    // }else{
                        formData.append(key, form[key]);
                        //}
                    }
                }
            });

            return formData;
        },

        async handleSubmit() {

            const formData = this.createFormData(this.form);
            console.log(formData);

            await axios
                .post("/api/exercises", formData,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("user_token")
                        //'content-type': 'multipart/form-data'
                    },
                })
                .then((resp) => (console.log(resp.data)))
                .catch((err) => console.log("exercise list:" + err));
        },
    },
};
</script>
