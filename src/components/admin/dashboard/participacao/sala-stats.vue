<template>
    <div class="cursor-pointer">
        <div class="mb-0.5 flex items-center justify-between text-xs">
            <div class="flex items-center">
                <div>
                    <span class="iconify text-teal-600" data-icon="ic:baseline-circle" data-inline="false"></span>
                </div>
                <div class="ml-1 font-extralight">
                    <span class="font-normal">{{ qtdePresencas }}</span> presentes
                </div>
            </div>
            <div class="flex items-center">
                <div>
                    <span class="iconify text-gray-400" data-icon="ic:baseline-circle" data-inline="false"></span>
                </div>
                <div class="ml-1 font-extralight">
                    <span class="font-normal">{{ qtdeInscricoes }}</span> inscritos
                </div>
            </div>
        </div>
        <q-linear-progress size="18px" :value="progress" color="teal">
            <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="teal" :label="progressLabel" />
            </div>
        </q-linear-progress>
        <q-menu>
            <div class="w-[400px] p-2 border rounded shadow">
                <q-tabs v-model="tab" class="text-slate-900" align="left" dense>
                    <q-tab name="presentes" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                        <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                            Presentes
                            <span class="rounded-lg px-1 py-[2px] bg-teal-700 text-[8pt] text-white">{{qtdePresencas}}</span>
                        </span>
                    </q-tab>
                    <q-tab name="ausentes" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                        <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                            Ausentes
                            <span class="rounded-lg px-1 py-[2px] bg-gray-700 text-[8pt] text-white">
                                {{qtdeInscricoes-qtdePresencas}}
                            </span>
                        </span>
                    </q-tab>
                </q-tabs>
                <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                    transition-next="jump-up">
                    <q-tab-panel name="presentes">
                        <div>
                            <q-table dense :pagination="{ rowsPerPage: 20 }" :rows="presentes" :filter="filter"
                                :columns="colsPresentes" row-key="name">
                                <template v-slot:top>
                                    <div class="w-full">
                                        <div class="p-1 flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="-mb-2">
                                                    <FormKit v-model="filter" :classes="{ inner: 'h-7' }" type="text"
                                                        placeholder="Filtrar" />
                                                </div>
                                                <div class="pl-1">
                                                    <span class="iconify text-[14pt]" data-icon="mi:search"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td>
                                            <div class="flex items-center">
                                                <q-avatar size="26px">
                                                    <q-img class="w-[26px] h-[26px]" :src="props.row.urlFoto" />
                                                </q-avatar>
                                                <div class="ml-1">
                                                    <span class="text-[7pt]">{{ props.row.nome }}</span>
                                                </div>
                                            </div>
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel name="ausentes">
                        <div>
                            <q-table dense :pagination="{ rowsPerPage: 20 }" :rows="ausentes" :filter="filter"
                                :columns="colsPresentes" row-key="name">
                                <template v-slot:top>
                                    <div class="w-full">
                                        <div class="p-1 flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="-mb-2">
                                                    <FormKit v-model="filter" :classes="{ inner: 'h-7' }" type="text"
                                                        placeholder="Filtrar" />
                                                </div>
                                                <div class="pl-1">
                                                    <span class="iconify text-[14pt]" data-icon="mi:search"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td>
                                            <div class="flex items-center">
                                                <q-avatar size="26px">
                                                    <q-img class="w-[26px] h-[26px]" :src="props.row.urlFoto" />
                                                </q-avatar>
                                                <div class="ml-1">
                                                    <span class="text-[7pt]">{{ props.row.nome }}</span>
                                                </div>
                                            </div>
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </q-menu>
    </div>
</template>

<script>
import { rdbref, snapToArray } from "@/firebase/firebase.js"
import { ref, get, onValue } from "firebase/database"
//import getFields from '@/firebase/getFields'
import { allUserStore } from "@/stores/allUser-store"

export default {
    props: {
        formacaoID: { default: "noid", type: String },
        encontroID: { default: "noid", type: String },
        salaID: { default: "noid", type: String },
        area: { default: "", type: String },
        inscritos: { default: {}, type: Object },
    },
    data() {
        return {
            tab: "presentes",
            qtdeInscricoes: 1,
            qtdePresencas: 0,
            presentes: [],
            ausentes: [],
            filter: "",
            colsPresentes: [
                { label: 'Participante', field: "nome", align: 'left', sortable: true },
            ],
            allUserStore: allUserStore()
        }
    },
    computed: {
        progressLabel() {
            return parseInt(this.progress * 100) + " %"
        },
        progress() {
            return (this.qtdePresencas / this.qtdeInscricoes)
        }
    },
    mounted() {
        //console.log("allUserStore",this.allUserStore.users);
        this.load()
    },
    methods: {
        load() {
            let self = this
            let id = this.salaID + ":" + this.formacaoID + ":" + this.encontroID + ":" + this.area
            //console.log("id",id);
            onValue(rdbref("/listaPresenca/" + id), async (snap) => {
                let presentes = snap.val()
                self.qtdeInscricoes = Object.keys(self.inscritos).length
                if(presentes) {
                    self.qtdePresencas = Object.keys(presentes).length
                } else {
                    self.qtdePresencas = 0
                    presentes = {}
                }
                //console.log("self.qtdeInscricoes",self.qtdeInscricoes);
                //console.log("self.qtdePresencas",self.qtdePresencas);

                self.presentes = []
                for (let i in presentes) {
                    let userID = presentes[i]
                    let user = self.allUserStore.users[userID]
                    if (user != undefined) {
                        //console.log("user", user);
                        self.presentes.push(user)
                    }
                }
                self.ausentes = []
                for (let i in self.inscritos) {
                    let userID = self.inscritos[i]
                    if (presentes[userID] == undefined) {
                        let user = self.allUserStore.users[userID]
                        if (user != undefined) {
                            //console.log("user", user);
                            self.ausentes.push(user)
                        }
                    }
                }
            })
        }
    },
}
</script>
<style lang="">
    
</style>