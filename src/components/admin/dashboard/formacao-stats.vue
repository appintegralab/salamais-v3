<template>
    <div>
        <div class="border rounded p-2">
            Formação stats
            <div class="w-[300px]">
                <canvas id="myChart"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from "./chart"
import { rdbref, snapToArray } from "@/firebase/firebase.js"
import { ref, get, onValue } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'

export default {
    props: {
        formacao: { default: {}, type: Object }
    },
    data() {
        return {
            presencas: {}
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
                if (this.formacao.encontros[keyE].turmasPorArea) {

                } else {
                    for (let salaID in salas) {
                        let inscricoes = salas[salaID].inscricoes
                        if (inscricoes != undefined) {
                            qtdeInscr = qtdeInscr + Object.keys(inscricoes).length
                        }
                        let id = salaID + ":" + this.formacao.id + ":" + keyE + ":"
                        //console.log("id", id);
                        let presencas = this.presencas[id]
                        if (presencas != undefined) {
                            qtdePres = qtdePres + Object.keys(presencas).length
                        }
                    }
                }
            }
            console.log("qtdeInscr", qtdeInscr);
            console.log("qtdePres", qtdePres);
            const data = {
                labels: [
                    qtdeInscr+' inscrições',
                    qtdePres+' participações',
                ],
                datasets: [{
                    backgroundColor: ['#ff2020', '#2020ff'],
                    borderColor: ['#ff2020', '#2020ff'],
                    data: [qtdeInscr, qtdePres],
                }]
            };

            this.donuts('myChart', data)
        },

        donuts(elemID, data) {

            const config = { type: 'doughnut', data, options: {} };

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