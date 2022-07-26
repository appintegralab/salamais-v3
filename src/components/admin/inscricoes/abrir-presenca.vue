<template>
    <div class="flex justify-end mr-1" v-if="enabled" :key="refresh">
        <q-btn v-if="status =='liberada'" @click="fecharPresenca" size="xs" class="text-red-800 bg-gray-100 px-2">
            <span class="iconify text-[10pt] text-red-800" data-icon="mdi:lock-outline"></span>
            <span class="ml-1 pt-[1px] text-[5pt]">fechar presença</span>
        </q-btn>
        <q-btn v-if="status !='liberada'" @click="abrirPresenca" size="xs" class="text-black bg-gray-100 px-2">
            <span class="iconify text-[10pt]" data-icon="mdi:lock-open-outline"></span>
            <span class="ml-1 pt-[1px] text-[5pt]">abrir presença</span>
        </q-btn>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"

export default {
    props: {
        formacao: { default: null, type: Object },
        encontro: { default: null, type: Object }
    },
    data() {
        return {
            refresh: 0,
            status: "fechada",
            userStore: userStore(),
            enabled: false
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
                //console.log("path", path);
                onValue(ref(rdb, path + "/presencaStatus"), (snap) => {
                    let status = snap.val()
                    if(status) {
                        self.status = status
                    } else {
                        self.status = "fechada"
                    }
                    //console.log("self.status", self.status);
                    self.refresh++
                })
            }
            this.checkEnabled()
        },

        checkEnabled() {
            let cpf = this.userStore.user.cpf
            //console.log(cpf);
            let lista = ["18374109840", "28854077860", "99271176804", "12345678900", "36126741889"]
            if (lista.lastIndexOf(cpf) != -1) {
                this.enabled = true
            } else {
                this.enabled = false
            }
            this.refresh++
        },

        abrirPresenca() {
            let self = this
            console.log("abrirPresenca");
            console.log("this.formacao", this.formacao);
            console.log("this.encontro", this.encontro);

            let path = `/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`
            console.log("path", path);
            set(ref(rdb, path + "/presencaStatus"), "liberada")
            self.$q.notify(notif.success("Lista de presença aberta com sucesso!"))

        },

        fecharPresenca() {
            let self = this
            console.log("fecharPresenca");
            let path = `/salamais/formacoes/${this.formacao.id}/encontros/${this.encontro.id}`
            console.log("path", path);
            set(ref(rdb, path + "/presencaStatus"), "encerrada")
            self.$q.notify(notif.success("Lista de presença fechada com sucesso!"))
        }
    },
}
</script>
<style lang="">
    
</style>