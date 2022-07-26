<template>
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
        <div class="bg-white w-[600px]">
            <div class="flex items-center justify-between p-2 bg-slate-200 h-[36px]">
                <div class="fw-600">
                    Editar Facilitador / Link
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
                <div class="pt-1 pb-1 px-1 border shadow rounded">
                    <div class="flex items-center leading-3">
                        <span class="px-1 py-1 text-[12pt] rounded bg-slate-200">
                            {{ sala.id }}
                        </span>
                        <div class="flex pl-[3px] px-1 py-1 leading-3 border ml-1 rounded">
                            <div class="text-[10pt] fw-600 py-0 text-center">
                                {{ sala.inscricoes.length }}
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

            <div class="mx-2 p-2 px-4 border rounded">
                <div class="flex items-center justify-between mb-1">
                    <div class="text-[10pt] fw-600">
                        Facilitadores
                    </div>
                    <div class="flex-1 flex justify-end">
                        <selecionaruser @onSelect="selectUser" />
                    </div>
                </div>
                <div class="ml-2 leading-3" v-if="Object.keys(facilitadores).length == 0">
                    <div class="text-[8pt] fw-300 text-red-800">
                        Nenhum facilitador informado
                    </div>
                </div>
                <div class="border rounded p-1" v-for="(user, index) in facilitadores" :key="index">
                    <facilitadorinfo :userID="user" @remove="removeFacilitador" />
                </div>
            </div>

            <div class="mx-2 p-2 border rounded">
                <div class="grid grid-cols-3">
                    <div class="px-2 col-span-2">
                        <FormKit type="select" v-model='modeloCert' label='Modelo certificado para facilitador'
                            help='selecione um modelo de certificado' required :classes="inputCss2"
                            :options="modeloOptions" />
                    </div>
                    <div class="px-2">
                        <FormKit v-model='chCertificado' label='Carga Horária' help='CH do certificado' required
                            :classes="inputCss" />
                    </div>
                </div>
            </div>

            <div class="mx-2 p-2 border rounded">
                <div class="px-2">
                    <FormKit v-model='link' label='Link do encontro' help='url do link de encontro' required
                        :classes="inputCss" />
                </div>
            </div>

            <div class="my-2 text-center flex justify-center">
                <q-btn @click="salvar" class="flex items-center" size="sm" outline color="blue-grey-8">
                    <span class="iconify mr-1 text-[11pt]" data-icon="ic:save"></span>
                    <span class="mt-[2px]">salvar</span>
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
import { rdb, rdbref } from "@/firebase/firebase.js"
import { ref, set, get } from "firebase/database"
import facilitadorinfo from "./facilitador-info.vue"

export default {
    components: { selecionaruser, facilitadorinfo },
    props: {},
    data() {
        return {
            dialog: false,
            inputCss: { inner: 'h-7 text-[8pt] fw-700' },
            inputCss2: { inner: 'h-7 text-[9pt] fw-700' },
            sala: {},
            formacao: {},
            encontro: {},
            inscritos: [],
            area: null,
            facilitador: null,
            facilitadores: {},
            link: "",
            chCertificado: 6,
            modeloCert: "",
            modeloOptions: [
                'Monaco',
                'Vatican City',
                'Maldives',
                'Tuvalu',
            ]
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {

    },
    methods: {

        loadModeloOptions() {
            let self = this
            get(rdbref("modelosCertificados")).then((snap) => {
                let modelos = snap.val()
                self.modeloOptions = []
                for (let key in modelos) {
                    self.modeloOptions.push({
                        label: modelos[key].nome, value: key
                    })
                }
                if (self.modeloCert == undefined || self.modeloCert == '') {
                    self.modeloCert = self.modeloOptions[0].value
                }
            })
        },

        show(sala, formacao, encontro, area) {
            console.log("sala", sala);
            let self = this
            self.loadModeloOptions()
            if (sala.inscricoes == undefined) {
                sala.inscricoes = {}
            }
            if (sala.facilitadores == undefined) {
                sala.facilitadores = {}
            }
            this.sala = JSON.parse(JSON.stringify(sala))
            this.formacao = formacao
            this.encontro = encontro
            this.area = area
            this.facilitador = null
            this.facilitadores = JSON.parse(JSON.stringify(this.sala.facilitadores))
            this.chCertificado = sala.chCertificado
            if(this.chCertificado == undefined) {
                this.chCertificado = 6
            }
            this.modeloCert = sala.modeloCertificado
            console.log("this.sala", this.sala);
            this.dialog = true
        },

        selectUser(user) {
            console.log(user);
            this.facilitador = user
            this.facilitadores[user.id] = user.id
        },

        removeFacilitador(user) {
            console.log("removeFacilitador", user);
            delete this.facilitadores[user.id]
        },

        salvar() {
            let self = this
            //console.log("this.sala", this.sala);
            //console.log(this.encontro);
            //console.log(this.formacao);
            //console.log("facilitador", this.facilitador);
            //console.log("link", this.link);

            let path = "formacoes/" + this.formacao.id + "/encontros/" + this.encontro.id
            //console.log("path", path);
            if (this.formacao.turmasPorArea) {
                //console.log("self.area", self.area);
                path = path + "/areas/" + self.area.id + "/salas/" + this.sala.id + "/"
            } else {
                path = path + "/salas/" + this.sala.id + "/"
            }
            //console.log("path", path);
            set(rdbref(path + "facilitadores"), null)
            for (let i in self.facilitadores) {
                set(rdbref(path + "facilitadores/" + self.facilitadores[i]), self.facilitadores[i])
                //console.log(path + "facilitadores/" + self.facilitadores[i], self.facilitadores[i]);
            }
            set(rdbref(path + "link"), self.link)
            set(rdbref(path + "modeloCertificado"), self.modeloCert);
            set(rdbref(path + "chCertificado"), self.chCertificado);

            self.dialog = false
            self.$q.notify(notif.success("Facilitador / Link atualizado com sucesso!"))
            self.$emit('salaUpdate')
            //console.log("self.facilitadores", self.facilitadores);
            //console.log("self.sala.facilitadores", self.sala.facilitadores);

            //Atualizar facilitadores
            for (let i in self.facilitadores) {
                let userKey = self.facilitadores[i]
                if (self.sala.facilitadores[userKey] == undefined) {
                    //console.log("adicionar: ", userKey);
                    let path = "facilitadores/" + userKey
                    //console.log(path + "/id", userKey);
                    set(rdbref(path + "/id"), userKey)
                    path = path + "/formacoes/" + this.formacao.id
                    //console.log(path + "/id", this.formacao.id);
                    set(rdbref(path + "/id"), this.formacao.id)
                    //console.log(path + "/encontros/" + this.encontro.id, this.encontro.id);
                    set(rdbref(path + "/encontros/" + this.encontro.id), {
                        id: this.encontro.id,
                        area: self.area,
                        salaID: self.sala.id
                    })
                }
            }
            function removeFacilitadorVazio(userKey) {
                get(rdbref("facilitadores/" + userKey)).then((snap) => {
                    let data = snap.val()
                    //console.log("facilitador sem formação?", data.formacoes);
                    if (data.formacoes == undefined) {
                        //console.log(path, null);
                        set(rdbref("facilitadores/" + userKey), null)
                    }
                })
            }
            function removeEncontrosVazio(path, userKey) {
                get(rdbref(path + "/encontros/")).then((snap) => {
                    let data = snap.val()
                    //console.log("tem encontros?", data);
                    if (data == null) {
                        //console.log(path, null);
                        set(rdbref(path), null)
                        removeFacilitadorVazio(userKey)
                    }
                })
            }
            for (let i in self.sala.facilitadores) {
                let userKey = self.sala.facilitadores[i]
                if (self.facilitadores[userKey] == undefined) {
                    //console.log("remover: ", userKey);
                    let path = "facilitadores/" + userKey
                    path = path + "/formacoes/" + this.formacao.id
                    //console.log(path + "/encontros/" + this.encontro.id, null);
                    set(rdbref(path + "/encontros/" + this.encontro.id), null)
                    removeEncontrosVazio(path, userKey)
                }
            }

        }

    },
}
</script>
<style lang="">
    
</style>