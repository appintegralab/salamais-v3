<template>
    <div class="flex justify-end mr-1">
        <q-btn v-if="aberta" @click="fecharPresenca" size="xs" class="text-red-800 bg-gray-100 px-2">
            <span class="iconify text-[10pt] text-red-800" data-icon="mdi:lock-outline"></span>
            <span class="ml-1 pt-[1px]">fechar lista presença</span>
        </q-btn>
        <q-btn v-if="!aberta" @click="abrirPresenca" size="xs" class="text-black bg-gray-100 px-2">
            <span class="iconify text-[10pt]" data-icon="mdi:lock-open-outline"></span>
            <span class="ml-1 pt-[1px]">abrir lista presença</span>
        </q-btn>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"

export default {
    props: {
        formacao: { default: null, type: Object },
        encontro: { default: null, type: Object }
    },
    data() {
        return {
            aberta: false
        }
    },
    watch: {
        formacao() {
            this.load()
        },
        encontro() {
            this.load()
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {
        let self = this
        this.load()
    },
    methods: {

        load() {
            let self = this
            if (this.formacao && this.encontro) {
                let path = `/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`
                console.log("path", path);
                onValue(ref(rdb, path + "/presencaAberta"), (snap) => {
                    self.aberta = snap.val()
                    console.log("self.aberta", self.aberta);
                })
            }
        },

        abrirPresenca() {
            let self = this
            console.log("abrirPresenca");
            console.log("this.formacao", this.formacao);
            console.log("this.encontro", this.encontro);

            let path = `/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`
            console.log("path", path);
            set(ref(rdb, path + "/presencaAberta"),true)
            self.$q.notify(notif.success("Lista de presença aberta com sucesso!"))
                
        },

        fecharPresenca() {
            let self = this
            console.log("fecharPresenca");
            let path = `/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`
            console.log("path", path);
            set(ref(rdb, path + "/presencaAberta"),false)
            self.$q.notify(notif.success("Lista de presença fechada com sucesso!"))
        }
    },
}
</script>
<style lang="">
    
</style>