<template>
    <div class="border rounded py-1 px-2">
        <div class="grid grid-cols-12">
            <div class="col-span-12 md:col-span-4">
                <statsgeral />
            </div>
            <div class="col-span-12 md:col-span-8">
                <div v-if="loading" class="p-3">
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                    <div class="flex justify-center">
                        <q-skeleton type="circle" size="120px" />
                    </div>
                </div>
                <div v-if="!loading">
                    <div class="flex justify-center mt-2">
                        <div class="flex items-center mr-2">
                            <div class="ml-1 font-normal">
                                <span class="font-bold">{{ qtde.presencas }}</span>
                                participações
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
                                <span class="font-normal">{{ qtde.pesquisas }}</span> pesquisas respondidas
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div>
                                <span class="iconify text-gray-400" data-icon="ic:baseline-circle"
                                    data-inline="false"></span>
                            </div>
                            <div class="ml-1 font-extralight">
                                <span class="font-normal">{{ qtde.presencas - qtde.pesquisas }}</span> não respondidas
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <donut :size="140" :data="donutData" />
                    </div>
                    <respostasOpen />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { rdbref, snapToArray } from "@/firebase/firebase.js"
import { ref, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import lodash from "lodash"
import { allUserStore } from "@/stores/allUser-store"
import { presencasStore } from "@/stores/presencas-store"
import { pesquisasStore } from "@/stores/pesquisas-store"
import donut from "./donut.vue"
import statsgeral from "./stats-geral.vue"
import respostasOpen from "./respostas-open.vue"

export default {
    components: { donut, statsgeral, respostasOpen },
    data() {
        return {
            allUserStore: allUserStore(),
            presencasStore: presencasStore(),
            pesquisasStore: pesquisasStore(),
            loading: false,
            donutData: [],
            pesquisas: {},
            presencas: {},
            qtde: { presencas: 0, pesquisas: 0 }
        }
    },
    mounted() {
        let self = this
        this.allUserStore.init()
        this.load()
    },
    methods: {

        load() {
            let self = this
            self.loading = true

            let pesqQtdePorFormacao = this.pesquisasStore.qtdePorFormacao
            console.log("pesqQtdePorFormacao", pesqQtdePorFormacao);
            self.qtde.pesquisas = 0
            for (let i in pesqQtdePorFormacao) {
                self.qtde.pesquisas = self.qtde.pesquisas + pesqQtdePorFormacao[i]
            }

            let qtdePorFormacao = this.presencasStore.qtdePorFormacao
            console.log("qtdePorFormacao", qtdePorFormacao);
            self.qtde.presencas = 0
            for (let i in qtdePorFormacao) {
                self.qtde.presencas = self.qtde.presencas + qtdePorFormacao[i]
            }

            console.log("self.presencas", self.presencas);
            console.log("self.qtde", self.qtde);

            self.donutData = [
                { value: self.qtde.presencas - self.qtde.pesquisas, name: 'Não respondidas' },
                { value: self.qtde.pesquisas, name: 'Pesquisas realizadas' },
            ]
            self.loading = false
        }
    },
}
</script>
<style lang="">
    
</style>