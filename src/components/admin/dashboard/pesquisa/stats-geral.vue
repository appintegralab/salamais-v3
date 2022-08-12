<template>
    <div>
        <div v-if="loading" class="p-3">
            <q-skeleton type="text" />
            <q-skeleton type="text" />
        </div>
        <div v-if="!loading" class="py-1">
            <div class="text-xs font-medium">
                Médias das respostas
            </div>
            <div v-for="(pergunta, index) in perguntas" :key="index">
                <div class="my-2">
                    <div class="border rounded shadow py-2 px-2">
                        <div class="text-sm font-medium mb-0.5">
                            Questão {{ index + 1 }}
                        </div>
                        <div class="text-xs font-light mb-8">
                            {{ perguntas[index].question }}
                        </div>
                        <div class="px-2">
                            <q-slider v-model="perguntas[index].media" :label-value="perguntas[index].media / 10"
                                :marker-labels="markers" dense track-size="2px" readonly :max="50" label label-always
                                color="teal" />
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
import { pesquisasStore } from "@/stores/pesquisas-store"

export default {
    props: {
    },
    data() {
        return {
            loading: false,
            pesquisasStore: pesquisasStore(),
            pesquisas: {},
            qtde: { presencas: 0, pesquisas: 0 },
            perguntas: [
                {
                    idx: 0, media: null, type: "likert",
                    question: "A temática é relevante para a organização do trabalho pedagógico na UC, com vistas à construção do desempenho final (A3)?"
                },
                {
                    idx: 1, media: null, type: "likert",
                    question: "A metodologia utilizada na oficina trouxe clareza para entender a relação entre o desenvolvimento de competências, o método de projeto e a construção da A3?",
                },
                {
                    idx: 2, media: null, type: "likert",
                    question: "O material disponibilizado para apoio à oficina contribui para ampliar os conhecimentos sobre o tema e auxiliar o professor em sua prática pedagógica?",
                },
                {
                    idx: 3, media: null, type: "likert",
                    question: "Os facilitadores (as) conduziram as atividades com clareza e eficiência?",
                },
            ]
        }
    },
    computed: {
    },
    mounted() {
        //console.log("allUserStore",this.allUserStore.users);
        this.load()
    },
    methods: {
        load() {
            let self = this
            self.loading = true
            let data = this.pesquisasStore.pesquisas
            self.pesquisas = data
            //console.log("self.pesquisas", self.pesquisas);
            let qtdePesq = 0
            for (let i in self.pesquisas) {
                for (let userID in self.pesquisas[i]) {
                    let resp = self.pesquisas[i][userID]
                    if (resp.done) {
                        for (let j = 0; j < 4; j++) {
                            self.perguntas[j].media = self.perguntas[j].media + resp.respostas[j]
                        }
                        qtdePesq++
                    }
                }
            }
            for (let j = 0; j < 4; j++) {
                self.perguntas[j].media = parseInt((self.perguntas[j].media / qtdePesq) * 10)
            }

            //            get(rdbref("/pesquisas/quest01")).then((snap) => {
            //                let data = snap.val()
            //                self.pesquisas = {}
            //                self.qtde.pesquisas = 0
            //                let qtdePesq = 0
            //                if (data) {
            //}
            //console.log("self.pesquisas", self.pesquisas);
            //console.log("self.perguntas", self.perguntas);
            //console.log("qtdePesq", qtdePesq);
            self.loading = false
        },

        markers(val) {
            let label = val / 10
            let margin = '0px'
            if ((val % 10) !== 0) {
                return {
                    label,
                    style: { 'display': 'none' }
                }
            } else {
                if (val == 0) {
                    label = 'discordo'
                }
                if (val == 50) {
                    label = 'concordo'
                    margin = '-36px'
                }
            }
            return {
                label,
                style: { 'font-size': '8pt', width: '6px', 'margin-left': margin }
            }
        }
    }
}
</script>

<style scoped>
.mklabel {
    font-size: 8px;
}
</style>