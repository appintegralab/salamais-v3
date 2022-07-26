<template>
    <div class="m-3">
        Form Teste

        <div class="grid grid-cols-2">
            <div class="border rounded p-3">
                <!--
                <minput label="nome" holder="Digite seu nome" />
                <minput class="mt-1" label="nome" holder="Digite seu nome" />
                <q-btn @click="formOk">
                    ok
                </q-btn>
                -->
                <mForm :model="model" />
            </div>
        </div>
    </div>
</template>

<script>
import mForm from "@/components/m-forms/m-form.vue"
import { Model, string, number }  from "@/components/m-forms/m-models"

export default {
    components: { mForm },
    props: {
    },
    data() {
        return {
            model: null
        }
    },
    mounted() {

        let fields = {
            nome: {
                type: "text", name: "nome",
                label: "Nome do aluno", holder: "Digite nome do aluno",
                yupRules: string().trim().required()
            },
            idade: {
                type: "text", name: "idade",
                label: "Idade do aluno", holder: "Digite a idade do aluno",
                yupRules: number().required().positive().integer(),
            },
            email: {
                type: "text", name: "email",
                label: "Email do aluno", holder: "Digite um email válido",
                yupRules: string().required().email(),
            }
        }
        this.model = Model.init(fields)
        console.log("model", this.model.fields);
    },
    methods: {

        formOk() {

        }
    },
}
</script>
<style lang="">
    
</style>