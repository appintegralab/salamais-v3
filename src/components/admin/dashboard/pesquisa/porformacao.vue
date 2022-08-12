<template>
    <div class="grid grid-cols-4">
        <div class="col-span-1 border rounded p-2">
            <div class="text-xs font-medium">
                Formações
            </div>
            <hr>
            <div>
                <div v-for="(formacao, key, index) in formacoes" :key="index"
                    class="cursor-pointer hover:bg-gray-200 my-1" @click="formSel(key)">
                    <div v-if="formKey == key" class="bg-gray-200 flex items-center border p-1 text-xs">
                        <div class="px-1">
                            <span class="iconify text-xl" data-icon="material-symbols:school"
                                data-inline="false"></span>
                        </div>
                        <div class="flex-1">
                            <div>
                                <span class="text-xs fw-500 px-1 pt-[2px] rounded text-black bg-slate-200">
                                    {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                </span>
                                <span class="text-xs">
                                    ({{
                                            moment(formacao.dataInicio).locale('pt-br').format('dddd')
                                    }})
                                </span>
                            </div>
                            <div>
                                {{ formacao.nome }}
                            </div>
                        </div>
                    </div>
                    <div v-if="formKey != key" class="flex items-center border p-1 text-xs">
                        <div class="px-1">
                            <span class="iconify text-xl" data-icon="material-symbols:school"
                                data-inline="false"></span>
                        </div>
                        <div class="flex-1">
                            <div>
                                <span class="text-xs fw-500 px-1 pt-[2px] rounded text-black bg-slate-200">
                                    {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                </span>
                                <span class="text-xs">
                                    ({{
                                            moment(formacao.dataInicio).locale('pt-br').format('dddd')
                                    }})
                                </span>
                            </div>
                            <div>
                                {{ formacao.nome }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-3 border rounded mx-1 p-2">
            <div v-if="formKey != -1" :key="formKey">
                <div class="px-2 mt-1">
                    <div class="flex">
                        <div>
                            <span class="text-xs fw-500 px-1 pt-[2px] rounded text-black bg-slate-200">
                                {{ moment(formacoes[formKey].dataInicio).format("DD/MM/YYYY") }}
                            </span>
                            <span class="text-xs">
                                ({{
                                        moment(formacoes[formKey].dataInicio).locale('pt-br').format('dddd')
                                }})
                            </span>
                        </div>
                        <div class="ml-2 font-medium">
                            {{ formacoes[formKey].nome }}
                        </div>
                    </div>
                    <hr class="my-1">
                    <statsporformacao :formacao="formacoes[formKey]" />
                    <hr class="my-1">
                    <q-tabs v-model="tab" class="text-slate-900" align="left" dense>
                        <q-tab v-for="(encontro, index) in formacoes[formKey].encontros" :name="encontro.horaInicio"
                            class="" style="height: 30px; max-height: 30px; min-height: 30px">
                            <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                            </span>
                        </q-tab>
                    </q-tabs>
                </div>
                <div>
                    <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                        transition-next="jump-up">
                        <q-tab-panel v-for="(encontro, index) in formacoes[formKey].encontros"
                            :name="encontro.horaInicio">
                            <div v-if="formacoes[formKey].turmasPorArea">
                                turmas por área
                                <div v-for="(area, key, index) in encontro.areas" :key="key">
                                    <badgearea :sigla="key" />
                                    <div v-for="(sala, index) in encontro.areas[key].salas" :key="index">
                                        <div class="grid grid-cols-12 border rounded p-1 my-1.5 hover:bg-gray-200">
                                            <div class="col-span-1">
                                                <span class="border rounded px-1 mr-2 bg-slate-300 text-sm font-medium">
                                                    {{ sala.id }}
                                                </span>
                                            </div>
                                            <div class="col-span-2 pl-2">
                                                <div class=" text-xs font-extralight">Multiplicadores</div>
                                            </div>
                                            <div class="col-span-5">
                                                <div class="col-span-1 flex items-center">
                                                    <div class="mr-1" v-for="(userID, index) in sala.facilitadores"
                                                        :key="index">
                                                        <facilitadorAvatar :userID="userID" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-span-4">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!formacoes[formKey].turmasPorArea">
                                <div>
                                    <statsportrilha :formacao="formacoes[formKey]" :encontro="encontro" />
                                </div>
                                <div v-for="(sala, index) in encontro.salas" :key="index">
                                    <div class="grid grid-cols-12 border rounded p-1 my-1.5 hover:bg-gray-200">
                                        <div class="col-span-1">
                                            <span class="border rounded px-1 mr-2 bg-slate-300 text-sm font-medium">
                                                {{ sala.id }}
                                            </span>
                                        </div>
                                        <div class="col-span-2 pl-2">
                                            <div class=" text-xs font-extralight">Multiplicadores</div>
                                        </div>
                                        <div class="col-span-5">
                                            <div class="col-span-1 flex items-center">
                                                <div class="mr-1" v-for="(userID, index) in sala.facilitadores"
                                                    :key="index">
                                                    <facilitadorAvatar :userID="userID" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-span-4">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import getFields from '@/firebase/getFields'
import { rdbref, snapToArray } from "@/firebase/firebase.js"
import { ref, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import lodash from "lodash"
import facilitadorAvatar from "./facilitador-avatar.vue"
import { allUserStore } from "@/stores/allUser-store"
import badgearea from "./badge-area.vue"
import statsporformacao from "./stats-porformacao.vue"
import statsportrilha from "./stats-portrilha.vue"

export default {
    components: { badgearea, facilitadorAvatar, statsporformacao, statsportrilha },
    data() {
        return {
            formacoes: {},
            tab: "",
            formKey: -1,
            allUserStore: allUserStore()
        }
    },
    computed: {
        moment() {
            return moment
        },
    },
    mounted() {
        let self = this
        this.allUserStore.init()

        get(rdbref("/formacoes")).then((snap) => {
            let data = snapToArray(snap)
            data = lodash.orderBy(data, ['dataInicio'], ['asc'])
            if (data) {
                self.formacoes = data
                self.formKey = 0
                let firstEncontroKey = Object.keys(this.formacoes[self.formKey].encontros)[0]
                self.tab = self.formacoes[self.formKey].encontros[firstEncontroKey].horaInicio
                self.$forceUpdate()
            }
            console.log("self.formacoes", self.formacoes);
            console.log("self.formKey", self.formKey);
            console.log("self.tab", self.tab);
        })
    },
    methods: {

        formSel(key) {
            console.log(key);
            this.formKey = key
            let firstEncontroKey = Object.keys(this.formacoes[key].encontros)[0]
            this.tab = this.formacoes[key].encontros[firstEncontroKey].horaInicio
        }
    },
}
</script>
<style lang="">
    
</style>