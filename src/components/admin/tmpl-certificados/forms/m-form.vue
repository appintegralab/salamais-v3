<template>
    <div>
        <div v-for="(field, index) in model.fields" :key="index">
            <minput :field="field" />
        </div>
        <q-btn @click="formOk">
            ok
        </q-btn>
    </div>
</template>

<script>
import model from "./form-model"
import minput from "./m-input2.vue"

export default {
    components: { minput },
    data() {
        return {
            model: model.init()
        }
    },
    mounted() {
        console.log("form");

        console.log("this.model", this.model);
    },
    methods: {
        formOk() {
            console.log("formOk");

            let ret = this.model.validate()
            console.log("ret",ret);
        }
    },
}
</script>
<style>
</style>