<template>
    <div v-if="model != null">
        <div class="mb-3" v-for="(field, index) in model.fields" :key="index">
            <minput v-if="field.type == 'text'" :field="field" @onChange="change" />
            <mimage v-if="field.type == 'image'" :field="field" @onChange="change" />
        </div>
        <div v-if="model.saveButton">
            <hr class="mb-2" />
            <div class="text-center">
                <q-btn @click="formOk">
                    <span class="iconify mr-1" data-icon="material-symbols:save-outline" data-inline="false"></span>
                    Salvar
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import minput from "./m-input.vue"
import mimage from "./m-image.vue"
import notify from "./notify"

export default {
    components: { minput, mimage },
    props: {
        model: { default: null, type: Object }
    },
    data() {
        return {

        }
    },
    watch: {
        model() {
            //console.log("model changed");
            //console.log("this.model", this.model);
            this.$forceUpdate()
        }
    },
    mounted() {
        //console.log("form");
    },
    methods: {

        change(value) {
            this.$emit('onChange', value)
        },

        formOk() {
            //console.log("formOk");
            let ret = this.model.validate()
            if (ret.errors) {
                //console.log("ret",ret);
                let msg = ret.errors.errors.message
                if (msg.indexOf("this") != -1) {
                    msg = msg.replaceAll("this", ret.errors.errors.path)
                }
                if (msg.indexOf(ret.errors.errors.path) == -1) {
                    msg = ret.errors.errors.path + " " + msg
                }
                notify.error(msg)
                return
            }
            this.$emit('onSave', ret.data)
        },

        validate() {
            let ret = this.model.validate()
            if (ret.errors) {
                //console.log("ret",ret);
                let msg = ret.errors.errors.message
                if (msg.indexOf("this") != -1) {
                    msg = msg.replaceAll("this", ret.errors.errors.path)
                }
                if (msg.indexOf(ret.errors.errors.path) == -1) {
                    msg = ret.errors.errors.path + " " + msg
                }
                notify.error(msg)
                return false
            }
            return ret.data
        }
    },
}
</script>
<style>
</style>