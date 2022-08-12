<template>
    <div>
        <div class="border rounded p-2">
            <div class="grid grid-cols-2">
                <div>
                    <div class="flex justify-center">
                        <div class="flex items-center mr-2">
                            <div class="ml-1 font-normal">
                                <span class="font-bold">{{ qtdeInscricoes }}</span>
                                inscrições
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">

                        <div class="flex items-center mr-3">
                            <div>
                                <span class="iconify text-teal-600" data-icon="ic:baseline-circle"
                                    data-inline="false"></span>
                            </div>
                            <div class="ml-1 font-extralight">
                                <span class="font-normal">{{ qtdePresencas }}</span> participações
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div>
                                <span class="iconify text-gray-400" data-icon="ic:baseline-circle"
                                    data-inline="false"></span>
                            </div>
                            <div class="ml-1 font-extralight">
                                <span class="font-normal">{{ qtdeAusentes }}</span> ausentes
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <div>
                            <donut :size="140" :data="donutData" />
                        </div>
                    </div>
                </div>
                <div class="border rounded p-2">
                    <div class="text-xs font-bold">
                        Encontros
                    </div>
                    <hr class="mb-2">
                    <div v-for="(encontro, index) in formacao.encontros">
                        <div class="flex items-center border rounded p-2 my-1">
                            <div>
                                <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                    {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                </span>
                            </div>
                            <div class="pl-2 flex-1">
                                <div class="mb-0.5 flex items-center justify-between text-xs">
                                    <div class="flex items-center">
                                        <div>
                                            <span class="iconify text-teal-600" data-icon="ic:baseline-circle"
                                                data-inline="false"></span>
                                        </div>
                                        <div class="ml-1 font-extralight">
                                            <span class="font-normal">{{ encontro.qtdePresencas }}</span> presentes
                                        </div>
                                    </div>
                                    <div class="flex items-center">
                                        <div>
                                            <span class="iconify text-gray-400" data-icon="ic:baseline-circle"
                                                data-inline="false"></span>
                                        </div>
                                        <div class="ml-1 font-extralight">
                                            <span class="font-normal">{{ encontro.qtdeInscricoes }}</span> inscritos
                                        </div>
                                    </div>
                                </div>
                                <q-linear-progress size="18px" :value="encontro.progress" color="teal">
                                    <div class="absolute-full flex flex-center">
                                        <q-badge color="white" text-color="teal" :label="encontro.progressLabel" />
                                    </div>
                                </q-linear-progress>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { rdbref, snapToArray } from "@/firebase/firebase.js"
import { ref, get, onValue } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import donut from "./donut.vue"

export default {
    components: { donut },
    props: {
        formacao: { default: {}, type: Object }
    },
    data() {
        return {
            presencas: {},
            size: 150,
            qtdePresencas: 0,
            qtdeInscricoes: 0,
            qtdeAusentes: 0,
            donutData: [],
        }
    },
    mounted() {
        let self = this
        console.log("this.formacao", this.formacao);

        onValue(rdbref("/listaPresenca"), async (snap) => {
            let presentes = snap.val()
            if (presentes) {
                self.presencas = presentes
            }
            console.log("self.presencas", self.presencas);
            this.load()
        })
    },
    methods: {

        load() {
            let self = this

            let qtdeInscr = 0
            let qtdePres = 0
            for (let keyE in this.formacao.encontros) {
                let salas = this.formacao.encontros[keyE].salas
                if (this.formacao.turmasPorArea) {
                    this.formacao.encontros[keyE].qtdeInscricoes = 0
                    this.formacao.encontros[keyE].qtdePresencas = 0
                    let areas = this.formacao.encontros[keyE].areas
                    //console.log("areas",areas);
                    for (let areaID in areas) {
                        let salas = this.formacao.encontros[keyE].areas[areaID].salas
                        //console.log("salas",salas);
                        for (let salaID in salas) {
                            let inscricoes = salas[salaID].inscricoes
                            if (inscricoes != undefined) {
                                qtdeInscr = qtdeInscr + Object.keys(inscricoes).length
                                this.formacao.encontros[keyE].qtdeInscricoes = this.formacao.encontros[keyE].qtdeInscricoes + Object.keys(inscricoes).length
                            }
                            let id = salaID + ":" + this.formacao.id + ":" + keyE + ":" + areaID
                            //console.log("id", id);
                            let presencas = this.presencas[id]
                            if (presencas != undefined) {
                                qtdePres = qtdePres + Object.keys(presencas).length
                                this.formacao.encontros[keyE].qtdePresencas = this.formacao.encontros[keyE].qtdePresencas + Object.keys(presencas).length
                            }
                        }
                    }
                    this.formacao.encontros[keyE].progress = (this.formacao.encontros[keyE].qtdePresencas / this.formacao.encontros[keyE].qtdeInscricoes)
                    this.formacao.encontros[keyE].progressLabel = parseInt(this.formacao.encontros[keyE].progress * 100) + "%"
                } else {
                    this.formacao.encontros[keyE].qtdeInscricoes = 0
                    this.formacao.encontros[keyE].qtdePresencas = 0
                    for (let salaID in salas) {
                        let inscricoes = salas[salaID].inscricoes
                        if (inscricoes != undefined) {
                            qtdeInscr = qtdeInscr + Object.keys(inscricoes).length
                            this.formacao.encontros[keyE].qtdeInscricoes = this.formacao.encontros[keyE].qtdeInscricoes + Object.keys(inscricoes).length
                        }
                        let id = salaID + ":" + this.formacao.id + ":" + keyE + ":"
                        //console.log("id", id);
                        let presencas = this.presencas[id]
                        if (presencas != undefined) {
                            qtdePres = qtdePres + Object.keys(presencas).length
                            this.formacao.encontros[keyE].qtdePresencas = this.formacao.encontros[keyE].qtdePresencas + Object.keys(presencas).length
                        }
                    }
                    this.formacao.encontros[keyE].progress = (this.formacao.encontros[keyE].qtdePresencas / this.formacao.encontros[keyE].qtdeInscricoes)
                    this.formacao.encontros[keyE].progressLabel = parseInt(this.formacao.encontros[keyE].progress * 100) + "%"
                }
            }
            console.log("qtdeInscr", qtdeInscr);
            console.log("qtdePres", qtdePres);

            this.qtdeInscricoes = qtdeInscr
            this.qtdePresencas = qtdePres
            this.qtdeAusentes = qtdeInscr - qtdePres
            this.donutData = [
                { value: qtdeInscr - qtdePres, name: 'Ausentes' },
                { value: qtdePres, name: 'Presentes' },
            ]
            //this.donuts('myChart', data)
        },

        donuts(elemID, data) {

            const config = {
                type: 'doughnut', data, options: {
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                boxWidth: 10,
                                font: {
                                    size: 10
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label;
                                    label = label + " " + context.raw
                                    console.log("context", context);
                                    return label
                                }
                            }
                        }
                    }
                }
            };

            const myChart = new Chart(
                document.getElementById(elemID),
                config
            );

        }
    },
}
</script>
<style lang="">
    
</style>