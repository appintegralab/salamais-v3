<template>
    <div class="p-2" v-if="formacaoObj != null">
        <div class="mb-2" v-if="!formacaoObj.inscricao">
            <q-btn outline @click="$refs.dialoginscricaoref.show(formacaoObj)" class="px-2 text-gray-700" size="6px">
                <span class="text-[8pt] iconify" data-icon="mdi:calendar-check"></span>
                <span class="ml-1 pt-[2px] text-[6pt]">
                    Realizar inscrição
                </span>
            </q-btn>
        </div>
        <div class="mb-2" v-if="formacaoObj.inscricao">
            <div class="flex items-center justify-between">
                <div class="leading-3">
                    <div class="flex">
                        <span class="text-green-700 text-[10pt] iconify" data-icon="mdi:calendar-check"></span>
                        <span class="ml-1 mt-[3px] text-[7pt] fw-500 text-green-800">Inscrição realizada</span>
                    </div>
                    <div>
                        <span class="ml-1 mt-[3px] text-[6pt] fw-300 text-black">
                            em
                            {{ moment(formacao.dataInscricao).format("DD/MM/YYYY") }} -
                            {{ moment(formacao.dataInscricao).format("HH:mm") }}
                        </span>
                    </div>
                </div>
                <div class="flex items-center ml-1 pt-[2px] fw-600 text-[8pt]">
                    <q-btn outline size="5pt" class="px-2 text-[7pt] ml-4 text-red-800">
                        <span class="iconify text-[8pt] mr-1" data-icon="ic:cancel"></span>
                        cancelar inscrição
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
        <div class="">
            <div class="col-span-3 md:col-span-2 border rounded p-2">
                <div class="fw-500 text-sm border-b">
                    Encontros
                </div>
                <div class="mt-2">
                    <div v-for="(encontro, index) in formacaoObj.encontros" :key="index">
                        <div v-if="encontro.inscricao == undefined"
                            class="flex items-center mt-1 p-1 bg-slate-200 rounded">
                            <div>
                                <span class="ml-1 text-[9pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                    {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                </span>
                                <span class="ml-1 text-[9pt] fw-300">
                                    ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0] }})
                                </span>
                            </div>
                            <div>
                                <span class="ml-1 text-[9pt] fw-200">Horário:</span>
                                <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                    {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                </span>
                            </div>
                            <div class="ml-2" v-if="false">
                                <q-btn @click="acessarSala(encontro.inscricao)" class="px-1 py-1 leading-3" size="5px"
                                    outline>
                                    <span class="text-[5pt]">acessar sala</span>
                                </q-btn>
                            </div>
                            <div class="flex-1" v-if="false">
                                <abrirPresenca :formacao="formacaoObj" :encontro="encontro" />
                            </div>
                        </div>
                        <div v-if="encontro.inscricao != undefined"
                            class="flex items-center mt-1 p-1 border border-green-800 rounded">
                            <div class="leading-3">
                                <span class="ml-1 text-[9pt] fw-500 px-1 rounded text-slate-700 bg-slate-200">
                                    {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                </span>
                                <span class="text-[9pt] fw-300">
                                    ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0] }})
                                </span>
                                <div class="mt-1">
                                    <span class="ml-1 text-[9pt] fw-300">Horário:</span>
                                    <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                        {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                    </span>
                                </div>
                            </div>
                            <div class="ml-2 h-[12px] w-[122px] flex items-center">
                                <div class="rounded-lg text-green-800 bg-gray-300 -mt-[1px]">
                                    <span class="iconify text-[10pt]" data-icon="ic:check"></span>
                                </div>
                                <span class="ml-1 text-[8pt] fw-500 mt-[1px]">inscrito</span>
                            </div>
                            <div class="-mt-[2px]" v-if="encontro.inscricao.area != ''">
                                <badgearea :sigla="encontro.inscricao.area" />
                            </div>
                            <div class="flex-1">
                                <div class="">
                                    <q-btn @click="acessarSala(encontro.inscricao)" class="px-1 py-1 leading-3"
                                        size="5px" outline>
                                        <span class="text-[5pt]">acessar sala</span>
                                    </q-btn>
                                </div>
                            </div>
                            <div class=""  v-if="false">
                                <abrirPresenca :formacao="formacaoObj" :encontro="encontro" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <dialoginscricao ref="dialoginscricaoref" @novaInscricao="novaInscricao" />
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "@/stores/user-store"
import { db, rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, set, get, onValue, query, orderByChild, equalTo } from "firebase/database"
import badgearea from "@/components/utils/badge-area.vue"
import dialoginscricao from "@/components/home/dialog-inscricao.vue"
import notif from "@/notif.js"
import abrirPresenca from './abrir-presenca.vue'

export default {
    components: { badgearea, dialoginscricao, abrirPresenca },
    props: {
        formacao: { default: null, type: Object }
    },
    data() {
        return {
            userStore: userStore(),
            formacaoObj: null,
            removeDialog: false,
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
    watch: {
        formacao() {
            this.load()
        }
    },
    methods: {

        load() {
            let self = this
            let queryRef = query(ref(rdb, "/salamais/inscricoes"), orderByChild('userID'), equalTo(this.userStore.user.id))
            onValue(queryRef, (snap) => {
                self.formacaoObj = JSON.parse(JSON.stringify(self.formacao))
                self.formacaoObj.inscricao = false
                let inscricoes = snap.val()
                //console.log("inscricoes", inscricoes);
                for (let i in inscricoes) {
                    //console.log(inscricoes[i].formacaoID);
                    //console.log(self.formacaoObj.id);
                    if (inscricoes[i].formacaoID == self.formacaoObj.id) {
                        self.formacaoObj.inscricaoID = inscricoes[i].id
                        //console.log("inscricoes[i]", inscricoes[i]);
                        for (let encKey in inscricoes[i].encontros) {
                            self.formacaoObj.inscricao = true
                            self.formacaoObj.dataInscricao = inscricoes[i].encontros[encKey].createdAt
                            self.formacaoObj.encontros[encKey].inscricao = inscricoes[i].encontros[encKey]
                        }
                    }
                }
                //console.log("self.formacaoObj", self.formacaoObj);
            })
        },

        cancelar() {
            let self = this
            console.log("cancelar", this.formacao);
            console.log(this.formacaoObj.inscricaoID);
            for (let i in this.formacaoObj.encontros) {
                let encontro = this.formacaoObj.encontros[i]
                console.log("encontro", encontro);
                let path = ""
                if (encontro.area == undefined || encontro.area == "") {
                    path = "/salamais/formacoes/" + this.formacaoObj.id + "/encontros/" + encontro.encontroID + "/salas/sala" + encontro.sala + "/inscricoes/" + this.userStore.user.id
                } else {
                    path = "/salamais/formacoes/" + this.formacaoObj.id + "/encontros/" + encontro.encontroID + "/areas/" + encontro.area + "/salas/sala" + encontro.sala + "/inscricoes/" + this.userStore.user.id
                }
                console.log("path", path);
                set(ref(rdb, path), null)
            }
            set(ref(rdb, "/salamais/inscricoes/" + this.formacaoObj.inscricaoID), null)
            self.$q.notify(notif.success("Inscrição cancelada com sucesso!"))
            self.removeDialog = false
            //self.$emit('removeInscricao')
        },

        novaInscricao() {
            this.load()
        },

        acessarSala(inscricao) {
            //console.log(inscricao);
            let id = "sala" + inscricao.sala + ":" + this.formacaoObj.id + ":" + inscricao.encontroID + ":" + inscricao.area
            //console.log(id);
            this.$router.push({ path: '/sala/' + id })
        }
    },
}
</script>
<style lang="">
    
</style>