<template>
    <div class="border rounded shadow mx-2 mt-3 p-2">
        <div class="text-sm font-medium mb-0.5">
            Questão 5
        </div>
        <div class="text-sm font-light mb-1">
            Gostaria de deixar algum comentário / sugestão?
        </div>
        <div class="flex justify-end mb-2">
            <div class="text-xs">
                <span class="font-medium mr-1">{{ qtdeResp }}</span>
                <span class="font-light">respostas</span>
            </div>
        </div>
        <div v-for="(resp, key, index) in respostas" :key="index" class="mb-3">
            <div class="border rounded shadow p-1">
                <div class="grid grid-cols-12 items-center">
                    <div class="col-span-3 md:col-span-2 lg:col-span-1">
                        <q-avatar class="" size="40px">
                            <img :src="resp.user.urlFoto" alt="">
                        </q-avatar>
                    </div>
                    <div class="col-span-9 md:col-span-10 lg:col-span-11 pl-2">
                        <div class="text-xs">
                            {{ resp.user.nome }}
                            <span class="text-[7pt] font-light fraleway">
                                {{ resp.user.ies }} - {{ resp.user.regional }}
                            </span>
                        </div>
                        <div class="flex text-sm font-light">
                            <span class="font-medium mr-1">Formação:</span>
                            <span class="flex-1 font-light truncate">{{ resp.formacao.nome }}</span>
                        </div>
                        <div class="text-sm font-light text-ellipsis">
                            <span class="text-xs fw-500 rounded text-black">
                                {{ moment(resp.formacao.dataInicio).format("DD/MM/YYYY") }}
                            </span>
                            <span class="text-xs">
                                ({{
                                        moment(resp.formacao.dataInicio).locale('pt-br').format('dddd')
                                }})
                            </span>
                            <span class="font-medium mr-1">Trilha:</span>
                            <span class="rounded text-[9pt] fw-500 text-slate-900">
                                {{ resp.encontro.horaInicio }} às {{ resp.encontro.horaTermino }}
                            </span>
                            <span class="font-medium ml-2">{{ resp.sala }}</span>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="mt-2 mb-1 text-base font-light fraleway text-justify px-3">
                    {{ resp.resposta }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { rdbref, snapToArray } from "@/firebase/firebase.js"
import { ref, get, onValue } from "firebase/database"
import { allUserStore } from "@/stores/allUser-store"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { pesquisasStore } from "@/stores/pesquisas-store"

export default {
    data() {
        return {
            loading: false,
            allUserStore: allUserStore(),
            pesquisasStore: pesquisasStore(),
            pesquisas: {},
            respostas: {},
            qtdeResp: 0,
            formacoes: {
                "FM-8be86d": {
                    nome: "Planejamento por área de conhecimento II",
                    dataInicio: "2022-08-05T00:00:00-03:00",
                    encontros: {
                        "ENC-3785b3": {
                            horaInicio: "08:50",
                            horaTermino: "11:40"
                        },
                        "ENC-3bb891": {
                            horaInicio: "19:00",
                            horaTermino: "21:40"
                        },
                    }
                },
                "FM-bae95f": {
                    nome: "O projeto como método para o desenvolvimento de competências",
                    dataInicio: "2022-08-03T00:00:00-03:00",
                    encontros: {
                        "ENC-561d5a": {
                            horaInicio: "14:30",
                            horaTermino: "17:20"
                        },
                        "ENC-8fb64a": {
                            horaInicio: "19:00",
                            horaTermino: "21:40"
                        },
                        "ENC-a99763": {
                            horaInicio: "08:50",
                            horaTermino: "11:40"
                        },
                    }
                },
                "FM-d3e149": {
                    nome: "Planejamento por área de conhecimento I",
                    dataInicio: "2022-08-04T00:00:00-03:00",
                    encontros: {
                        "ENC-0e6921": {
                            horaInicio: "08:50",
                            horaTermino: "11:40"
                        },
                        "ENC-2e05f9": {
                            horaInicio: "19:00",
                            horaTermino: "21:40"
                        },
                    }
                },
            }
        }
    },
    computed: {
        moment() {
            return moment
        },
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            let self = this
            self.loading = true
            let data = this.pesquisasStore.pesquisas

            self.pesquisas = {}
            self.respostas = {}
            self.qtdeResp = 0
            if (data) {
                self.pesquisas = data
                for (let i in self.pesquisas) {
                    for (let userID in self.pesquisas[i]) {
                        let resp = self.pesquisas[i][userID]
                        if (resp.done) {
                            if (resp.respostas[4].trim() != '') {
                                self.qtdeResp++
                                let [salaID, formacaoID, encontroID, areaID] = i.split(":")
                                let item = {
                                    user: self.allUserStore.getUser(userID),
                                    resposta: resp.respostas[4].trim(),
                                    formacao: {
                                        id: formacaoID,
                                        nome: self.formacoes[formacaoID].nome,
                                        dataInicio: self.formacoes[formacaoID].dataInicio,
                                    },
                                    encontro: {
                                        ...self.formacoes[formacaoID].encontros[encontroID]
                                    },
                                    sala: salaID,
                                }
                                self.respostas[i + '@' + userID] = item
                            }
                        }
                    }
                }
            }
            //console.log("self.pesquisas", self.pesquisas);
            //console.log("self.qtdeResp", self.qtdeResp);
            //console.log("self.respostas", self.respostas);
            self.loading = false
        }
    },
}
</script>
<style lang="">
    
</style>