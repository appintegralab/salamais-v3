<template>
    <div class="m-1 p-2 border">
        <div class="">
            <div class="fw-200">
                Minhas inscrições:
            </div>
            <div class="border-t mt-1 mb-3 mr-3"></div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-3">
                <div v-for="(insc, index) in inscricoes" :key="index">
                    <q-card class="p-2">
                        <div class="border-b mb-2 fw-600 text-[9pt] text-purple-900">
                            {{ insc.formacao.nome }}
                        </div>
                        <div class="my-[3px] fw-400 text-[7pt]">
                            <span>DATA:</span>
                            <span class="ml-1 text-[7pt] fw-600 px-1 pt-[2px] rounded text-white bg-purple-900">
                                {{ moment(insc.formacao.data).format("DD/MM/YYYY") }}
                            </span>
                            <span class="ml-1 text-[8pt] fw-300">
                                ({{ moment(insc.formacao.data).locale('pt-br').format('dddd') }})
                            </span>
                        </div>
                        <!--
                        <div class="my-[3px] fw-400 text-[7pt]">
                            <span>HORÁRIO:</span>
                            <span class="ml-2 text-purple-800 fw-500">{{ insc.formacao.opcoes[insc.opcao].tipo }}</span>
                            <span class="ml-1 px-1 pt-[2px] rounded text-[6pt] fw-500 text-white bg-purple-900">
                                {{ insc.formacao.opcoes[insc.opcao].horaInicio }} às {{
                                        insc.formacao.opcoes[insc.opcao].horaTermino
                                }}
                            </span>
                        </div>-->
                        <div class="h-[80px] border-t mt-1 pt-1 text-[7pt] leading-[0.8rem] fw-300 pr-1 text-justify">
                            {{ insc.formacao.descr.substr(0, 200) }}
                            <span class="fw-900" v-if="insc.formacao.descr.length > 200">...</span>
                        </div>
                        <div v-if="!isNaN(parseInt(insc.opcao))"
                            class="border-t mt-1 pt-1 flex items-center text-green-700 px-2">
                            <div>
                                <span class="text-green-700 text-[9pt] iconify" data-icon="mdi:calendar-check"></span>
                            </div>
                            <div class="ml-1 text-center pt-[2px] fw-500 text-[6pt]">
                                Inscrição realizada
                                <span>({{ insc.formacao.opcoes[insc.opcao].tipo }})</span>
                                <span class="ml-1 px-1 pt-[2px] rounded text-[6pt] fw-500 text-white bg-purple-900">
                                    {{ insc.formacao.opcoes[insc.opcao].horaInicio }} às {{ insc.formacao.opcoes[insc.opcao].horaTermino
                                    }}
                                </span>
                            </div>
                        </div>
                        <div v-if="isNaN(parseInt(insc.opcao))"
                            class="border-t mt-1 pt-1 flex items-center text-green-700 px-2">
                            <div>
                                <span class="text-green-700 text-[9pt] iconify" data-icon="mdi:calendar-check"></span>
                            </div>
                            <div class="ml-1 text-center pt-[2px] fw-500 text-[6pt]">
                                Inscrição realizada
                                <span>({{ insc.formacao.opcoes[0].tipo }})</span>
                                <span class="ml-1 px-1 pt-[2px] rounded text-[6pt] fw-500 text-white bg-green-900">{{
                                        insc.opcao
                                }}</span>
                                <span class="ml-1 px-1 pt-[2px] rounded text-[6pt] fw-500 text-white bg-purple-900">
                                    {{ insc.formacao.opcoes[0].horaInicio }} às {{ insc.formacao.opcoes[0].horaTermino
                                    }}
                                </span>
                            </div>
                        </div>
                        <div class="-mt-1 text-left ml-6">
                            <span class="text-[6pt] fw-600 text-black">
                                realizada em: 
                                {{ moment(insc.createdAt).format("DD/MM/YYYY") }} -
                                {{ moment(insc.createdAt).format("H:mm") }}
                            </span>
                        </div>
                        <div class="border-t pt-2 text-center">
                            <q-btn size="xs">
                                <span class="text-[10pt] iconify" data-icon="ph:info" data-inline="false"></span>
                                <span class="ml-1 text-[5pt]">ver informações</span>
                            </q-btn>
                        </div>
                    </q-card>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { cb } from "../../clapback/clapback.js"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../stores/user-store"
//import { db } from "../../firebase.js"


export default {
    components: {},
    data() {
        return {
            userStore: userStore(),
            inscricoes: []
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {
        console.log("minhas-formações mounted");
        this.load()
        //console.log("email",email01);
    },
    methods: {
        load() {
            let self = this
            let inscModel = cb("salamais").coll("inscricoes")
            inscModel.aggregate([
                { "$match": { "userID": this.userStore.user.id } },
                {
                    "$lookup": {
                        "from": "formacoes",
                        "localField": "formacaoID",
                        "foreignField": "id",
                        "as": "formacao"
                    }
                }
            ]).then((inscricoes) => {
                for (let i in inscricoes) {
                    inscricoes[i].formacao = inscricoes[i].formacao[0]
                }
                console.log("inscricoes", inscricoes);
                self.inscricoes = inscricoes
            })
        },

        verInformacoes() {
            console.log("verInformacoes");
        },



    }
}
</script>

<style>
</style>