<template>
    <div class="flex mb-3" v-if="formacao != null">
        <div class="flex-shrink w-[48px]">
            <div>
                <div
                    class="absolute mx-3 bg-green-700 text-white w-6 h-6 border rounded-full flex items-center justify-center">
                    <span class="iconify" data-icon="mdi:calendar-check" data-inline="false"></span>
                </div>
            </div>
            <div class="w-1 h-full mx-auto border bg-green-400"></div>
        </div>
        <div class="pt-1 pb-3 flex-1">
            <caixaformacaoinfoinsc :formacao="formacao" :key="refresh" />
            <div class="mt-2" v-if="formacao.inscricao">
                <div class="flex items-center text-green-700">
                    <div>
                        <span class="text-green-700 text-[10pt] iconify" data-icon="mdi:calendar-check"></span>
                    </div>
                    <div class="flex items-center ml-1 pt-[2px] fw-600 text-[10pt]">
                        Inscrição realizada
                        <span class="ml-1 mt-[3px] text-[8pt] fw-300 text-black">
                            em
                            {{ moment(formacao.dataInscricao).format("DD/MM/YYYY") }} -
                            {{ moment(formacao.dataInscricao).format("HH:mm") }}
                        </span>
                        <q-btn @click="$router.push({ path: '/formacao/' + formacao.id })" outline size="5pt"
                            class="px-2  ml-4 text-green-800">
                            <span class="iconify text-[10pt] mr-1" data-icon="ic:school"></span>
                            <span class="text-[7pt] pt-[2px]">ver formação</span>
                        </q-btn>
                        <q-btn outline size="5pt" class="px-2 text-[7pt] ml-4 text-red-800">
                            <span class="iconify text-[8pt] mr-1" data-icon="ic:cancel"></span>
                            <span class="text-[7pt] pt-[2px]">cancelar inscrição</span>
                            <q-menu v-model="removeDialog" anchor="bottom right" self="bottom left">
                                <div class="rounded w-[240px]">
                                    <div class="flex p-1 bg-red-800 text-white">
                                        <div class="text-[10pt] px-1">
                                            <span class="iconify" data-icon="mdi:warning"></span>
                                        </div>
                                        <div class="text-[8pt] fw-700">Deseja realmente cancelar a inscrição?</div>
                                    </div>
                                    <div class="flex justify-around p-2">
                                        <q-btn @click="removeDialog = false" size="xs">Não</q-btn>
                                        <q-btn @click="cancelar" class="bg-red-800 text-white" size="xs">sim
                                        </q-btn>
                                    </div>
                                </div>
                            </q-menu>
                        </q-btn>
                    </div>
                </div>
            </div>
            <div class="border-t mt-1 mb-2"></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import caixaformacaoinfoinsc from "./caixa-formacao-info-insc.vue"
import notif from "../../notif.js"
import { userStore } from "@/stores/user-store"
import { db, rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, set, onValue, query, orderByChild, equalTo } from "firebase/database"

export default {
    components: { caixaformacaoinfoinsc },
    props: {
        formacao: { default: null, type: Object }
    },
    data() {
        return {
            removeDialog: false,
            refresh: 0,
            userStore: userStore(),
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    watch: {
        formacao() {
            this.refresh++
        }
    },
    methods: {

        cancelar() {
            let self = this
            console.log("cancelar", this.formacao);
            console.log(this.formacao.inscricaoID);
            for (let i in this.formacao.inscEncontros) {
                let encontro = this.formacao.inscEncontros[i]
                console.log("encontro", encontro);
                let path = ""
                if (encontro.area == undefined || encontro.area == "") {
                    path = "/salamais/formacoes/" + this.formacao.id + "/encontros/" + encontro.encontroID + "/salas/sala" + encontro.sala + "/inscricoes/" + this.userStore.user.id
                } else {
                    path = "/salamais/formacoes/" + this.formacao.id + "/encontros/" + encontro.encontroID + "/areas/" + encontro.area + "/salas/sala" + encontro.sala + "/inscricoes/" + this.userStore.user.id
                }
                console.log("path", path);
                set(ref(rdb, path), null)
            }
            set(ref(rdb, "/salamais/inscricoes/" + this.formacao.inscricaoID), null)
            self.$q.notify(notif.success("Inscrição cancelada com sucesso!"))
            self.removeDialog = false
            //self.$emit('removeInscricao')
        }
    }
}
</script>
<style lang="">
    
</style>