<template>
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
        <div class="bg-white w-[600px]">
            <div class="flex items-center justify-between p-2 bg-slate-200 h-[36px]">
                <div class="fw-600">
                    Dividir inscritos / Abrir nova Sala
                </div>
                <q-btn dense round size="sm" icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </div>
            <div class="p-1">
                <div>
                    <div class="px-1">
                        <div
                            class="flex items-center font-bold text-lg md:text-lg max-w-lg text-gray-900 leading-tight">
                            <div class="">
                                <span class="iconify text-purple-900 text-2xl" data-icon="ic:school"></span>
                            </div>
                            <div class="flex-1 leading-3 ml-2">
                                <div class="pt-2 m-0 fw-200 text-[10pt] border-b border-gray-300">
                                    Formação
                                </div>
                                <div class="mt-1 leading-5 text-[12pt]">
                                    {{ formacao.nome }}
                                </div>
                            </div>
                        </div>
                        <!-- DATA ÚNICA -->
                        <div class="mx-8 my-[3px] fw-400 text-[10pt]"
                            v-if="formacao.dataInicio == formacao.dataTermino">
                            <span>DATA:</span>
                            <span class="ml-1 text-[10pt] fw-500 px-1 pt-[2px] rounded text-slate-700 bg-slate-200">
                                {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                            </span>
                            <span class="ml-1 text-[10pt] fw-300">
                                ({{ moment(formacao.dataInicio).locale('pt-br').format('dddd') }})
                            </span>
                        </div>
                        <!-- PERÍODO -->
                        <div class="mx-8 my-[3px] fw-400 text-[10pt]"
                            v-if="formacao.dataInicio != formacao.dataTermino">
                            <span class="fw-500 text-[10pt]">Período:</span>
                            <span class="ml-1 text-[10pt] fw-500 pl-[1px] pt-[2px] rounded text-slate-700 bg-slate-200">
                                {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                <span class="text-[10pt]">
                                    ({{ moment(formacao.dataInicio).locale('pt-br').format('ddd').toUpperCase() }})
                                </span>
                            </span>
                            <span class="px-1">até</span>
                            <span class="ml-1 text-[10pt] fw-500 pl-[1px] pt-[2px] rounded text-slate-700 bg-slate-200">
                                {{ moment(formacao.dataTermino).format("DD/MM/YYYY") }}
                                <span class="text-[10pt]">
                                    ({{ moment(formacao.dataTermino).locale('pt-br').format('ddd').toUpperCase() }})
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mx-2 my-1">
                <div class="text-[10pt] fw-600">
                    Encontro
                </div>
                <div class="py-1 rounded flex items-center bg-slate-300">
                    <div>
                        <span class="ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                            {{ moment(encontro.data).format("DD/MM/YYYY") }}
                        </span>
                        <span class="ml-1 text-[10pt] fw-300">
                            ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0] }})
                        </span>
                    </div>
                    <div>
                        <span class="ml-2 fw-200 text-[10pt]">Horário:</span>
                        <span class="px-1 rounded text-[10pt] fw-500 text-slate-900">
                            {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                        </span>
                    </div>
                </div>
                <div class="mt-2 fw-500">
                    Salas
                </div>
                <div v-for="(sala, index) in salas" :key="index" class="pt-1 pb-1 px-1 border shadow rounded">
                    <div class="flex items-center leading-3">
                        <span class="px-1 py-1 text-[12pt] rounded bg-slate-200">
                            {{ sala.id }}
                        </span>
                        <div class="flex pl-[3px] px-1 py-1 leading-3 border ml-1 rounded">
                            <div v-if="sala && sala.inscricoes != undefined"
                                class="text-[10pt] fw-600 py-0 text-center">
                                {{ Object.keys(sala.inscricoes).length }}
                            </div>
                            <div v-else class="text-[10pt] fw-600 py-0 text-center">
                                0
                            </div>
                            <div class="ml-1 fw-300 flato text-[10pt] py-0">
                                inscrições
                            </div>
                        </div>
                        <div class="ml-2" v-if="formacao.turmasPorArea && area != null">
                            <div class="flex items-center">
                                <span :style="'background-color:' + area.cor"
                                    class="leading-3 ml-1 text-[5pt] fw-700 px-1 pt-[1px] rounded text-white">
                                    {{ area.sigla }}
                                </span>
                                <span class="ml-1 mt-1 text-[8pt] fw-500" :style="'color:' + area.cor">
                                    {{ area.nome }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-2 text-center flex justify-end mr-2">
                <q-btn :loading="loading" @click="abrirNovaSala" class="flex items-center" size="sm" outline
                    color="blue-grey-8">
                    <span class="iconify mr-1 text-[11pt]" data-icon="ic:save"></span>
                    <span class="mt-[2px]">Abrir nova sala</span>
                </q-btn>
            </div>
            <hr>
            <div class="my-2 text-center flex justify-center">
                <q-btn @click="dialog = false" class="mr-4 flex items-center" size="sm" outline color="blue-grey-8">
                    <span class="mt-[2px]">Cancelar</span>
                </q-btn>
                <q-btn :disabled="confirmarDisabled" class="flex items-center" size="sm" outline color="red-8">
                    <span class="iconify mr-1 text-[11pt]" data-icon="ic:save"></span>
                    <span class="mt-[2px]">Confirmar</span>
                    <q-menu v-model="removeDialog">
                        <div class="rounded w-[200px]">
                            <div class="flex p-1 bg-red-800 text-white">
                                <div class="text-[10pt] px-1">
                                    <span class="iconify" data-icon="mdi:warning"></span>
                                </div>
                                <div class="text-[8pt] fw-700">Deseja realmente dividir as salas?</div>
                            </div>
                            <div class="flex justify-around p-2">
                                <q-btn @click="removeDialog = false" size="xs">não
                                </q-btn>
                                <q-btn @click="salvar" class="bg-red-800 text-white" size="xs">
                                    sim</q-btn>
                            </div>
                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </div>
    </q-dialog>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import selecionaruser from "./selecionar-user.vue"
import notif from "../../../notif.js"
import { rdb } from "@/firebase/firebase.js"
import { ref, set, get, query, orderByChild, equalTo } from "firebase/database"
import facilitadorinfo from "./facilitador-info.vue"

export default {
    components: { selecionaruser, facilitadorinfo },
    props: {},
    data() {
        return {
            dialog: false,
            loading: false,
            removeDialog: false,
            confirmarDisabled: true,
            inputCss: { inner: 'h-7 text-[8pt] fw-700' },
            salas: {},
            formacao: {},
            encontro: {},
            inscritos: [],
            area: null,
            userInscricaoID: {},
            link: "",
        }
    },
    computed: {
        moment() {
            return moment
        },
        qtdeInscricoes() {
            if (this.sala && this.sala.inscricoes != undefined) {
                return Object.keys(this.sala.inscricoes).length
            }
            return 0
        }
    },
    mounted() {

    },
    methods: {
        show(sala, formacao, encontro, area) {
            console.log("sala", sala);
            let self = this
            self.confirmarDisabled = true
            if (sala.inscricoes == undefined) {
                sala.inscricoes = {}
            }
            if (sala.facilitadores == undefined) {
                sala.facilitadores = {}
            }
            this.area = JSON.parse(JSON.stringify(area))
            this.formacao = JSON.parse(JSON.stringify(formacao))
            this.encontro = JSON.parse(JSON.stringify(encontro))
            console.log("this.formacao", this.formacao);
            console.log("this.encontro", this.encontro);
            this.salas = {}
            let salaObj = JSON.parse(JSON.stringify(sala))
            this.salas = {}
            if (formacao.turmasPorArea) {
                console.log("area", area);
                this.salas = this.encontro.areas[area.id].salas
            } else {
                console.log("não tem área");
                this.salas = this.encontro.salas
            }
            console.log("this.salas", this.salas);
            this.dialog = true
        },

        getUsersInscricaoID: async function (todosInscritos) {
            let queryRef = query(ref(rdb, "/salamais/inscricoes/"), orderByChild("formacaoID"), equalTo(this.formacao.id))
            let snap = await get(queryRef)
            let data = snap.val()
            let todosInscritosKey = {}
            for (let i in todosInscritos) {
                todosInscritosKey[todosInscritos[i]] = {
                    userID: todosInscritos[i],
                    inscricaoID: ""
                }
            }
            console.log("todosInscritosKey", todosInscritosKey);
            console.log("data", data);
            for (let i in data) {
                for (let key in data[i].encontros) {
                    if (this.formacao.turmasPorArea) {
                        if (key == this.encontro.id && this.area.id == data[i].encontros[key].area) {
                            todosInscritosKey[data[i].userID].inscricaoID = i
                        }
                    } else {
                        if (key == this.encontro.id) {
                            todosInscritosKey[data[i].userID].inscricaoID = i
                        }
                    }
                }
            }
            return todosInscritosKey
        },

        async quebraSalas(salaIDCtrl) {
            let quebraOk = true

            for (let i in this.salas) {
                let inscricoes = this.salas[i].inscricoes
                if (inscricoes != undefined) {
                    if (Object.keys(inscricoes).length <= 1) {
                        quebraOk = false
                    }
                } else {
                    quebraOk = false
                }
            }
            if (!quebraOk) {
                this.$q.notify(notif.error("Não é possível quebra de salas com menos de 2 inscritos!"))
                return this.salas
            }
            let todosInscritos = []
            for (let i in this.salas) {
                let inscricoes = this.salas[i].inscricoes
                if (inscricoes != undefined) {
                    for (let key in inscricoes) {
                        todosInscritos.push(inscricoes[key])
                    }
                }
                this.salas[i].inscricoes = {}
            }
            this.salas["sala" + salaIDCtrl] = {
                cancelado: false,
                facilitador: "",
                id: "sala" + salaIDCtrl,
                inscricoes: {},
                link: ""
            }
            console.log("todosInscritos", todosInscritos);
            let todosInscritosKey = await this.getUsersInscricaoID(todosInscritos)
            //console.log("todosInscritosKey", todosInscritosKey);
            while (todosInscritos.length > 0) {
                let inscricao = todosInscritos.pop()
                let salaComMenos = Object.keys(this.salas)[0]
                let inscMenor = 0
                for (let i in this.salas) {
                    let inscMenor = Object.keys(this.salas[salaComMenos].inscricoes).length
                    let inscAtual = Object.keys(this.salas[i].inscricoes).length
                    if (inscAtual < inscMenor) {
                        salaComMenos = i
                    }
                }
                this.salas[salaComMenos].inscricoes[inscricao] = inscricao
            }
            return todosInscritosKey
        },

        async abrirNovaSala() {
            let self = this
            self.loading = true
            console.log("this.salas", this.salas);
            console.log(this.encontro);
            console.log(this.formacao);
            this.userInscricaoID = {}
            if (this.formacao.turmasPorArea) {
                console.log("area", this.area);
                this.encontro.areas[this.area.id].salaIDCtrl++
                let salaIDCtrl = this.encontro.areas[this.area.id].salaIDCtrl
                this.userInscricaoID = await this.quebraSalas(salaIDCtrl)
            } else {
                console.log("não tem área");
                this.encontro.salaIDCtrl++
                let salaIDCtrl = this.encontro.salaIDCtrl
                this.userInscricaoID = await this.quebraSalas(salaIDCtrl)
            }
            console.log("this.userInscricaoID", this.userInscricaoID);
            console.log("this.salas", this.salas);
            self.loading = false
            self.confirmarDisabled = false
        },

        salvar() {
            let self = this
            console.log("this.salas", this.salas);
            console.log("this.encontro",this.encontro);
            console.log("this.formacao",this.formacao);
            console.log("this.userInscricaoID",this.userInscricaoID);

            if (this.formacao.turmasPorArea) {
                console.log("area", this.area);
                let pathEncontro = "/salamais/formacoes/" + this.formacao.id
                pathEncontro = pathEncontro + "/encontros/" + this.encontro.id
                //pathSalas = pathSalas + "/areas/" + this.area.id + "/salas"
                //console.log("pathEncontro", pathEncontro);

                console.log(pathEncontro + "/areas/" + this.area.id + "/salaIDCtrl", this.encontro.areas[this.area.id].salaIDCtrl);
                console.log(pathEncontro + "/areas/" + this.area.id + "/salas", this.salas);
                set(ref(rdb,pathEncontro + "/areas/" + this.area.id + "/salaIDCtrl"), this.encontro.areas[this.area.id].salaIDCtrl);
                set(ref(rdb,pathEncontro + "/areas/" + this.area.id + "/salas"), this.salas);



                for (let key in this.salas) {
                    let salaID = parseInt(key.substring(4))
                    for (let i in this.salas[key].inscricoes) {
                        let userID = this.salas[key].inscricoes[i]
                        console.log("userID",userID);
                        let path = "/salamais/inscricoes/" + this.userInscricaoID[userID].inscricaoID
                        path = path + "/encontros/" + this.encontro.id
                        console.log(path + "/sala", salaID);
                        set(ref(rdb,path + "/sala"), salaID);
                    }
                }

            } else {
                console.log("não tem área");
                let pathEncontro = "/salamais/formacoes/" + this.formacao.id
                pathEncontro = pathEncontro + "/encontros/" + this.encontro.id

                console.log(pathEncontro + "/salaIDCtrl", this.encontro.salaIDCtrl);
                console.log(pathEncontro + "/salas", this.salas);
                set(ref(rdb,pathEncontro + "/salaIDCtrl"), this.encontro.salaIDCtrl);
                set(ref(rdb,pathEncontro + "/salas"), this.salas);
                

                for (let key in this.salas) {
                    let salaID = parseInt(key.substring(4))
                    for (let i in this.salas[key].inscricoes) {
                        let userID = this.salas[key].inscricoes[i]
                        let path = "/salamais/inscricoes/" + this.userInscricaoID[userID].inscricaoID
                        path = path + "/encontros/" + this.encontro.id
                        console.log(path + "/sala", salaID);
                        set(ref(rdb,path + "/sala"), salaID);
                    }
                }
            }

            self.$q.notify(notif.success("Salas divididas com sucesso!"))
            this.removeDialog = false
            self.dialog = false
            self.$emit('salaUpdate')
        }

    },
}
</script>
<style lang="">
    
</style>