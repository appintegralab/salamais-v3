<template>
    <div class="m-3">
        Form Teste

        <div class="grid grid-cols-2">
            <div>

            </div>
            <div class="border rounded p-3">
                <!--
                <minput label="nome" holder="Digite seu nome" />
                <minput class="mt-1" label="nome" holder="Digite seu nome" />
                <q-btn @click="formOk">
                    ok
                </q-btn>
                -->
                <mForm />
            </div>
        </div>
    </div>
</template>

<script>
import minput from "./m-input.vue"
import mForm from "./m-form.vue"

export default {
    components: { minput, mForm },
    props: {
    },
    data() {
        return {
        }
    },
    mounted() {


    },
    methods: {

        formOk() {

        }
    },
}
</script>
<style lang="">
    
</style>