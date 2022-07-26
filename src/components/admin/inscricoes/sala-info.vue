<template>
    <div class="">
        <div class="flex items-center" v-if="salaObj != null">
            <div class="pt-1 pb-1 px-1 border shadow rounded mr-1">
                <div class="flex items-center leading-3">
                    <span class="px-1 text-[9pt] pt-[2px] rounded bg-slate-200 uppercase">
                        {{ salaObj.id }}
                    </span>
                    <div class="flex items-center justify-between ml-1 pl-1 rounded-2xl border w-18">
                        <div class="flex-1 pl-[3px] leading-3 h-6 mt-1">
                            <div class="text-[9pt] fw-600 py-0 text-center" v-if="salaObj.inscricoes == undefined">
                                0
                            </div>
                            <div class="text-[9pt] fw-600 py-0 text-center" v-if="salaObj.inscricoes != undefined">
                                {{ Object.keys(salaObj.inscricoes).length }}
                            </div>
                            <div class="fw-300 flato text-[7pt] py-0 -mt-[3px]">
                                inscrições
                            </div>
                        </div>
                        <div class="ml-1">
                            <q-btn @click="$emit('showInscritos', { sala: salaObj, encontroIdx, area })" size="7px" round
                                color="blue-grey-8">
                                <span class="iconify text-[13pt]" data-icon="ion:people-outline"></span>
                                <q-tooltip :delay="600">
                                    Visualizar inscritos
                                </q-tooltip>
                            </q-btn>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ml-2 leading-3 truncate flex-1 py-1">
                <div class="leading-3 mb-1">
                    <div class="text-[8pt] fw-300 ml-2 -mb-2 mx-2 bg-white">Facilitadores:</div>
                    <div class="flex items-center p-2 pt-3 border rounded">
                        <div v-for="(userID, index) in salaObj.facilitadores" :key="index">
                            <facilitadoravatar :userID="userID" class="mr-3" />
                        </div>
                        <span class="text-[7pt] text-red-800 ml-1 fw-500" v-if="salaObj.facilitadores == undefined">
                            não informado
                        </span>
                    </div>
                </div>
            </div>
            <div class="text-right pr-1 w-[30px]">
                <q-btn size="7px" round class="">
                    <span class="iconify text-[12pt]" data-icon="mdi:dots-horizontal"></span>
                    <q-tooltip>
                        Ações para a sala
                    </q-tooltip>
                    <q-menu v-model="menuShow" anchor="bottom left" self="center right">
                        <div class="p-1">
                            <div class="my-[2px] cursor-pointer hover:bg-gray-200">
                                <div @click="menuShow = false; $emit('showEditar', { sala: salaObj, encontroIdx, area })"
                                    class="flex items-center border rounded py-1 px-2">
                                    <div>
                                        <span class="iconify text-[14pt]" data-icon="mdi:account-edit"></span>
                                    </div>
                                    <div class="ml-2">
                                        <span class="text-[9pt]">Editar Facilitador/Link</span>
                                    </div>
                                </div>
                            </div>
                            <div class="my-[2px] cursor-pointer hover:bg-gray-200">
                                <div @click="menuShow = false; $emit('showQuebra', { sala: salaObj, encontroIdx, area })"
                                    class="flex items-center border rounded py-1 px-2">
                                    <div>
                                        <span class="iconify text-[14pt]" data-icon="icomoon-free:page-break"></span>
                                    </div>
                                    <div class="ml-2">
                                        <span class="text-[9pt]">Quebrar salas</span>
                                    </div>
                                </div>
                            </div>
                            <div class="my-[2px] cursor-pointer hover:bg-gray-200">
                                <div @click="menuShow = false; $emit('showInscritos', { sala: salaObj, encontroIdx, area })"
                                    class="flex items-center border rounded py-1 px-2">
                                    <div>
                                        <span class="iconify text-[14pt]" data-icon="ion:people-outline"></span>
                                    </div>
                                    <div class="ml-2">
                                        <span class="text-[9pt]">Ver inscritos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </div>
        <div class="leading-3 truncate mt-1 mb-1 flex items-center">
            <q-btn @click="acessarSala" size="xs" class="h-2 px-2 mr-1" outline>
                <span class="text-[7px]">acessar sala</span>
            </q-btn>
            <span class="text-[8pt] fw-300">Link Sala:</span>
            <span class="ml-2 rounded bg-slate-200">
                <q-btn size="6px" round color="blue-grey-1" class="-ml-1">
                    <span class="iconify text-[7pt] text-slate-800" data-icon="ion:link"></span>
                    <q-tooltip :delay="600">
                        Copiar link
                    </q-tooltip>
                </q-btn>
                <span class="text-[7pt] text-red-800 pr-1 ml-1 fw-400 fmohave" v-if="sala.link == ''">
                    link não informado
                </span>
                <span class="text-[7pt] pr-1 ml-1 fw-400 froboto" v-if="sala.link != ''">
                    {{ sala.link }}
                </span>
            </span>
        </div>
    </div>
</template>

<script>
import facilitadoravatar from "./facilitador-avatar.vue"
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue } from "firebase/database"

export default {
    components: { facilitadoravatar },
    props: {
        formacao: { default: null, type: Object },
        sala: { default: null, type: Object },
        encontroIdx: { default: "0" },
        area: { default: null },
    },
    data() {
        return {
            menuShow: false,
            facilitador: null,
            salaObj: null
        }
    },
    watch: {
        sala() {
            this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {

        load() {
            let self = this
            if (this.area != null) {
                onValue(ref(rdb, "/salamais/formacoes/" + this.formacao.id + "/encontros/" + this.encontroIdx + "/areas/" + this.area.id + "/salas/" + this.sala.id), (snap) => {
                    console.log(snap.val());
                    self.salaObj = snap.val()
                    if(self.salaObj.inscricoes == undefined) {
                        self.salaObj.inscricoes = {}
                    }
                    self.loadFacilitador()
                })
            } else {
                onValue(ref(rdb, "/salamais/formacoes/" + this.formacao.id + "/encontros/" + this.encontroIdx + "/salas/" + this.sala.id), (snap) => {
                    console.log(snap.val());
                    self.salaObj = snap.val()
                    if(self.salaObj.inscricoes == undefined) {
                        self.salaObj.inscricoes = {}
                    }
                    self.loadFacilitador()
                })
            }
        },

        loadFacilitador() {
            let self = this
            if (this.salaObj.facilitadores == undefined) {
                this.facilitador = null
                return
            }
        },

        acessarSala() {
            //console.log("acessarSala");
            //console.log(this.sala.id);
            //console.log(this.formacao.id);
            let areaID = ""
            if(this.area) {
                areaID = this.area.id
            }
            let id = this.sala.id + ":" + this.formacao.id + ":" + this.encontroIdx + ":" + areaID
            //console.log(id);
            this.$router.push({ path: '/sala/' + id })
        }
    }
}
</script>
<style lang="">
    
</style>