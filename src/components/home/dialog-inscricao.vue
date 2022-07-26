<template>
    <q-dialog v-model="dialog">
        <div class="bg-white md:min-w-[800px]">
            <q-toolbar class="h-[20px]">
                <q-avatar size="28px">
                    <img src="@/assets/salamais-icon.png">
                </q-avatar>
                <q-toolbar-title>
                    <span class="text-base">
                        Inscrição
                    </span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <div>
                <div class="mx-4 p-1 px-2 border rounded">
                    <caixaformacaoinfo :formacao="formacao" />
                </div>

                <!-- Formação ÚNICA - Todos os encontros -->
                <div class="mx-4 my-2 p-1 border rounded bg-gray-100" v-if="!formacao.inscrPorEncontro">
                    <div v-if="formacao.turmasPorArea" class="text-[9pt] ml-1 fw-300 mb-1">
                        Escolha qual área de conhecimento deseja realizar a inscrição:
                    </div>
                    <div v-if="formacao.turmasPorArea" class="ml-2 flex-1 flex items-center justify-center">
                        <div class="flex items-center">
                            <div class="fw-200 text-[7pt] pt-[2px] mr-2">Área: </div>
                            <div v-if="areaSel == ''"
                                class="flex ml-1 text-slate-800 bg-slate-300 px-1 rounded fw-300 text-[7pt]">
                                <span class="mr-1 text-[9pt] iconify" data-icon="ic:warning"></span>
                                Selecione uma área...
                            </div>
                            <div v-if="!areaSel == ''" class="">
                                <div class="flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200">
                                    <div :style="'background-color:' + areaSel.cor"
                                        class=" text-[5pt] fw-600 px-[2px] pt-[1px] rounded text-white">
                                        {{ areaSel.sigla }}
                                    </div>
                                    <div :style="'color:' + areaSel.cor"
                                        class="ml-[3px] pt-[3px] text-[6pt] froboto text-purple-900 fw-500">
                                        {{ areaSel.nome }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ml-2">
                            <selecionararea @onSelect="(area) => { areaSel = area }" />
                        </div>
                    </div>
                </div>

                <!-- ESCOLHA POR ENCONTRO -->
                <div class="mx-4 my-2 p-1 border rounded bg-gray-100" v-if="formacao.inscrPorEncontro">
                    <div class="text-[10pt] mb-1 fw-300">
                        Escolha qual encontro deseja se inscrever:
                    </div>
                    <!-- ESCOLHA APENAS 1 -->
                    <div v-if="!formacao.multiplaInscr">
                        <!-- ESCOLHA ENCONTROS -->
                        <div v-if="!formacao.turmasPorArea">
                            <div v-for="(encontro, index) in formacao.encontros" :key="index">
                                <div class="flex items-center mt-1 p-1 bg-slate-200 rounded">
                                    <q-radio color="grey" v-model="opcao" :val="index" dense size="34px" />
                                    <div>
                                        <span class="ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                            {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                        </span>
                                        <span class="ml-1 text-[10pt] fw-300">
                                            ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0]
                                            }})
                                        </span>
                                    </div>
                                    <div>
                                        <span class="ml-2 fw-200 text-[9pt]">Horário:</span>
                                        <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                            {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ESCOLHA POR ÁREA -->
                        <div v-if="formacao.turmasPorArea">
                            <div class="">

                                <div v-for="(encontro, index) in formacao.encontros" :key="index">
                                    <div class="flex items-center mt-1 p-1 bg-slate-200 rounded">
                                        <q-radio color="grey" v-model="opcao" :val="index" dense size="34px" />
                                        <div>
                                            <span
                                                class="ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                                {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                            </span>
                                            <span class="ml-1 text-[9pt] fw-300">
                                                ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0]
                                                }})
                                            </span>
                                        </div>
                                        <div>
                                            <span class="ml-2 fw-200 text-[9pt]">Horário:</span>
                                            <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                                {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                            </span>
                                        </div>
                                        <div v-if="opcao == index"
                                            class="ml-2 flex-1 flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="fw-200 text-[10pt] pt-[2px]">Área: </div>
                                                <div v-if="encontro.areaSel == ''"
                                                    class="flex ml-1 text-slate-800 bg-slate-300 px-1 rounded fw-300 text-[7pt]">
                                                    <span class="mr-1 text-[10pt] iconify"
                                                        data-icon="ic:warning"></span>
                                                    Selecione uma área...
                                                </div>
                                                <div v-if="!encontro.areaSel == ''" class="">
                                                    <div
                                                        class="flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200">
                                                        <div :style="'background-color:' + encontro.areaSel.cor"
                                                            class=" text-[5pt] fw-600 px-[2px] pt-[1px] rounded text-white">
                                                            {{ encontro.areaSel.sigla }}
                                                        </div>
                                                        <div :style="'color:' + encontro.areaSel.cor"
                                                            class="ml-[3px] pt-[3px] text-[6pt] froboto text-purple-900 fw-500">
                                                            {{ encontro.areaSel.nome }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ml-2">
                                                <selecionararea @onSelect="(area) => { encontro.areaSel = area }" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ESCOLHA MULTIPLA -->
                    <div v-if="formacao.multiplaInscr">
                        <!-- ESCOLHA ENCONTROS -->
                        <div v-if="!formacao.turmasPorArea">
                            <div v-for="(encontro, index) in formacao.encontros" :key="index">
                                <div class="flex items-center mt-1 p-1 bg-slate-200 rounded">
                                    <q-checkbox color="grey" v-model="encontro.selected" dense size="34px" />
                                    <div>
                                        <span class="ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                            {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                        </span>
                                        <span class="ml-1 text-[10pt] fw-300">
                                            ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0]
                                            }})
                                        </span>
                                    </div>
                                    <div>
                                        <span class="ml-2 fw-200 text-[10pt]">Horário:</span>
                                        <span class="px-1 rounded text-[10pt] fw-500 text-slate-900">
                                            {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ESCOLHA POR ÁREA -->
                        <div v-if="formacao.turmasPorArea">
                            <div class="">
                                <div v-for="(encontro, index) in formacao.encontros" :key="index">
                                    <div class="flex items-center mt-1 p-1 bg-slate-200 rounded">
                                        <q-checkbox color="grey" v-model="encontro.selected" dense size="34px" />
                                        <div>
                                            <span
                                                class="ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                                {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                            </span>
                                            <span class="ml-1 text-[10pt] fw-300">
                                                ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0]
                                                }})
                                            </span>
                                        </div>
                                        <div>
                                            <span class="ml-2 fw-200 text-[10pt]">Horário:</span>
                                            <span class="px-1 rounded text-[10pt] fw-500 text-slate-900">
                                                {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                            </span>
                                        </div>
                                        <div v-if="encontro.selected"
                                            class="ml-2 flex-1 flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="fw-300 text-[10pt] pt-[2px]">Área: </div>
                                                <div v-if="encontro.areaSel == ''"
                                                    class="flex ml-1 text-slate-800 bg-slate-300 px-1 rounded fw-300 text-[7pt]">
                                                    <span class="mr-1 text-[10pt] iconify"
                                                        data-icon="ic:warning"></span>
                                                    <span class="text-[9pt]">Selecione uma área...</span>
                                                </div>
                                                <div v-if="!encontro.areaSel == ''" class="">
                                                    <div
                                                        class="flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200">
                                                        <div :style="'background-color:' + encontro.areaSel.cor"
                                                            class=" text-[7pt] fw-500 px-[2px] pt-[1px] rounded text-white">
                                                            {{ encontro.areaSel.sigla }}
                                                        </div>
                                                        <div :style="'color:' + encontro.areaSel.cor"
                                                            class="ml-[3px] pt-[3px] text-[7pt] froboto text-purple-900 fw-500">
                                                            {{ encontro.areaSel.nome }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ml-2">
                                                <selecionararea @onSelect="(area) => { encontro.areaSel = area }" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="">
                    </div>
                </div>


                <div class="mx-4 mt-1 mb-2 border pt-2 px-2 rounded shadow bg-gray-100">
                    <div class="flex items-center">
                        <div class="flex-shrink w-[48px]">
                            <span class="iconify mx-auto text-[14pt]" data-icon="icon-park-outline:attention"
                                data-inline="false"></span>
                        </div>
                        <div class="flex-1 text-[8pt]">
                            <div class="fw-800 text-[7pt]">IMPORTANTE</div>
                            Um email será encaminhado confirmando sua inscrição e
                            futuros avisos sobre esta formação serão também enviados por email.
                            Indique um endereço de email que você utiliza com mais frequencia.
                            <span class="fw-800 text-[8pt]">
                                O email abaixo está correto?
                            </span>
                            <span class="fw-400 text-[7pt] text-red-900">
                                Caso não seja seu email, altere para o endereço correto!
                            </span>
                            <div class="mt-2 mb-0">
                                <q-input color="purple-9" class="dense" type="email" outlined dense v-model="email"
                                    label="Email" :rules="rules" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mb-2">
                    <q-btn outline size="sm" @click="registrarInscricao" class="py-1 px-4 rounded text-gray-900">
                        <span class="iconify mr-2" data-icon="ic:check" data-inline="false"></span>
                        Confirmar inscrição
                    </q-btn>
                </div>
            </div>
        </div>
    </q-dialog>
</template>

<script>
import notif from "../../notif.js"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../stores/user-store"
import { db, rdb, rdbref } from "@/firebase/firebase.js"
import { ref, set, get } from "firebase/database"
import inscricaook from "../email/templates/inscricao-ok.js"
import caixaformacaoinfo from "./caixa-formacao-info.vue"
import selecionararea from "./selecionar-area.vue"

export default {
    components: { caixaformacaoinfo, selecionararea },
    data() {
        return {
            dialog: false,
            cpf: "",
            formacao: null,
            opcao: 0,
            email: "",
            areas: [],
            areaSel: "",
            userStore: userStore(),
            rules: [
                function (val) {
                    if (val.trim() != '') {
                        let er = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                        if (er.test(val)) {
                            return (true)
                        } else {
                            return 'Email inválido'
                        }
                    } else {
                        return 'Email obrigatório'
                    }
                }
            ]
        }
    },
    computed: {
        moment() {
            return moment
        },
        user() {
            return this.userStore.user
        }
    },
    watch: {
        'userStore.user': function (newValue) {
            //console.log("dialog watch store", this.userStore.user);
            this.email = this.userStore.user.email;
        }
    },
    mounted() {
        let self = this
        //console.log("dialog mounted", userStore.user);
        get(rdbref("areas")).then((snap) => {
            let data = snap.val()
            self.areas = data
        })
    },
    methods: {
        show(formacao) {
            this.formacao = formacao
            console.log("formacao", formacao);
            for (let i in this.formacao.encontros) {
                this.formacao.encontros[i].selected = false
                this.formacao.encontros[i].areaSel = ""
            }
            this.opcao = 0
            this.areaSel = ""
            this.email = this.userStore.user.email
            this.dialog = true
        },

        uuidv4(nome) {
            let _nome = nome.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
            return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ).substr(0, 10);
        },

        registrarInscricao() {
            let self = this
            console.log("email", this.email);
            if (this.email == "") {
                this.$q.notify(notif.error("Email obrigatório!"))
                return
            }
            let er = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!er.test(this.email)) {
                this.$q.notify(notif.error("Email inválido!"))
                return
            }
            let id = this.uuidv4("INS-" + this.formacao.nome)
            let elem = {
                id,
                formacaoID: this.formacao.id,
                encontros: {},
                userID: this.userStore.user.id,
                userEmail: this.email
            }
            console.log("formacao", this.formacao);
            console.log("elem", elem);
            // POR ENCONTRO
            if (this.formacao.inscrPorEncontro) {
                // MULTIPLA INSCRICAO
                if (this.formacao.multiplaInscr) {
                    // POR ÁREA
                    if (this.formacao.turmasPorArea) {
                        for (let i in this.formacao.encontros) {
                            if (this.formacao.encontros[i].selected) {
                                if (this.formacao.encontros[i].areaSel == "") {
                                    this.$q.notify(notif.error("Escolha área de conhecimento para o encontro selecionado!"))
                                    return
                                } else {
                                    let areaID = this.formacao.encontros[i].areaSel.id
                                    elem.encontros[this.formacao.encontros[i].id] = {
                                        encontroID: this.formacao.encontros[i].id,
                                        area: this.formacao.encontros[i].areaSel.id,
                                        sala: this.formacao.encontros[i].areas[areaID].salaIDCtrl
                                    }
                                    //elem.encontros.push(this.formacao.encontros[i].id + ":" + this.formacao.encontros[i].areaSel.id)
                                }
                            }
                        }
                        if (elem.encontros.length == 0) {
                            this.$q.notify(notif.error("Escolha pelo menos uma opção de encontro!"))
                            return
                        }
                    } else {
                        for (let i in this.formacao.encontros) {
                            if (this.formacao.encontros[i].selected) {
                                elem.encontros[this.formacao.encontros[i].id] = {
                                    encontroID: this.formacao.encontros[i].id,
                                    area: "",
                                    sala: this.formacao.encontros[i].salaIDCtrl
                                }
                                //elem.encontros.push(this.formacao.encontros[i].id)
                            }
                        }
                        if (elem.encontros.length == 0) {
                            this.$q.notify(notif.error("Escolha pelo menos uma opção de encontro!"))
                            return
                        }
                    }
                } else {
                    // 1 OPÇÃO
                    // POR ÁREA
                    if (this.formacao.turmasPorArea) {
                        if (this.formacao.encontros[this.opcao].areaSel == "") {
                            this.$q.notify(notif.error("Escolha área de conhecimento para a formação!"))
                            return
                        } else {
                            let areaID = this.formacao.encontros[this.opcao].areaSel.id
                            elem.encontros = {}
                            elem.encontros[this.formacao.encontros[this.opcao].id] = {
                                encontroID: this.formacao.encontros[this.opcao].id,
                                area: this.formacao.encontros[this.opcao].areaSel.id,
                                sala: this.formacao.encontros[this.opcao].areas[areaID].salaIDCtrl
                            }
                            //elem.encontros.push(this.formacao.encontros[this.opcao].id + ":" + this.formacao.encontros[this.opcao].areaSel.id)
                        }
                    } else {
                        elem.encontros = {}
                        elem.encontros[this.formacao.encontros[this.opcao].id] = {
                            encontroID: this.formacao.encontros[this.opcao].id,
                            area: this.areaSel,
                            sala: this.formacao.encontros[this.opcao].salaIDCtrl
                        }
                        //elem.encontros.push(this.formacao.encontros[this.opcao].id)
                    }
                }
            }
            // FORMAÇÃO ÚNICA
            else {
                if (this.formacao.turmasPorArea) {
                    if (this.areaSel == "") {
                        this.$q.notify(notif.error("Escolha área de conhecimento para a formação!"))
                        return
                    } else {
                        elem.encontros = {}
                        elem.encontros[this.formacao.encontros[0].id] = {
                            encontroID: this.formacao.encontros[0].id,
                            area: this.areaSel,
                            sala: this.formacao.encontros[0].salaIDCtrl
                        }
                    }
                } else {
                    elem.encontros = {}
                    elem.encontros[this.formacao.encontros[0].id] = {
                        encontroID: this.formacao.encontros[0].id,
                        area: "",
                        sala: this.formacao.encontros[0].salaIDCtrl
                    }
                }
            }
            console.log("elem", elem);
            let horario = ""
            for (let i in elem.encontros) {
                //let vet = elem.encontros[i].split(":")
                let encontro = elem.encontros[i].encontroID
                let area = ""
                if (elem.encontros[i].area != undefined && elem.encontros[i].area != '') {
                    area = " - " + elem.encontros[i].area
                }
                let sala = " - sala " + elem.encontros[i].sala
                for (let k in this.formacao.encontros) {
                    let enc = this.formacao.encontros[k]
                    if (encontro == enc.id) {
                        horario = horario + "(" + enc.horaInicio + " às " + enc.horaTermino + area + sala + ") "
                    }
                }
            }
            console.log("horario", horario);

            this.dialog = false


            //Atualiza formações
            console.log("formacao", this.formacao);
            let formacao = this.formacao
            for (let i in elem.encontros) {
                console.log("encontro", elem.encontros[i]);
                for (let k in formacao.encontros) {
                    if (formacao.encontros[k].id == elem.encontros[i].encontroID) {
                        console.log("achei encontro:", formacao.encontros[k]);
                        let area = elem.encontros[i].area
                        console.log("area", area);
                        if (area != undefined && area != "") {
                            //inscricao na sala por área
                            let salaIDCtrl = formacao.encontros[k].areas[area].salaIDCtrl
                            let path = `/salamais/formacoes/${formacao.id}/encontros/${k}/areas/${area}/salas/sala${salaIDCtrl}/inscricoes/`
                            console.log("path", path + self.userStore.user.id);
                            set(rdbref(path + self.userStore.user.id), self.userStore.user.id)

                            //for (let j in formacao.encontros[k].areas[area].salas) {
                            //    if (formacao.encontros[k].areas[area].salas[j].id == salaIDCtrl) {
                            //        let inscricoes = formacao.encontros[k].areas[area].salas[j].inscricoes
                            //        if (inscricoes == undefined) {
                            //            formacao.encontros[k].areas[area].salas[j].inscricoes = [self.userStore.user.id]
                            //        } else {
                            //            if (inscricoes.lastIndexOf(self.userStore.user.id) == -1) {
                            //                inscricoes.push(self.userStore.user.id)
                            //            }
                            //        }
                            //    }
                            //}
                        } else {
                            //inscricao na sala comum
                            let salaIDCtrl = formacao.encontros[k].salaIDCtrl
                            let path = `formacoes/${formacao.id}/encontros/${k}/salas/sala${salaIDCtrl}/inscricoes/`
                            console.log("path", path + self.userStore.user.id);
                            set(rdbref(path + self.userStore.user.id), self.userStore.user.id)

                            //for (let j in formacao.encontros[k].salas) {
                            //    if (formacao.encontros[k].salas[j].id == salaIDCtrl) {
                            //        let inscricoes = formacao.encontros[k].salas[j].inscricoes
                            //        if (inscricoes == undefined) {
                            //            formacao.encontros[k].salas[j].inscricoes = [self.userStore.user.id]
                            //        } else {
                            //            if (inscricoes.lastIndexOf(self.userStore.user.id) == -1) {
                            //                inscricoes.push(self.userStore.user.id)
                            //            }
                            //        }
                            //    }
                            //}
                        }
                    }
                }
            }
            console.log("formacao", formacao);

            //            let modelForm = cb("salamais").coll("formacoes")
            //            modelForm.getID(this.formacao.id).then((data) => {
            //                console.log("formacao", data);
            //                for (let i in elem.encontros) {
            //                    console.log("encontro", elem.encontros[i]);
            //                    for (let k in data.encontros) {
            //                        if (data.encontros[k].id == elem.encontros[i].encontroID) {
            //                            console.log("achei encontro:", data.encontros[k]);
            //                            let area = elem.encontros[i].area
            //                            console.log("area", area);
            //                            if (area != undefined && area != "") {
            //                                let salaIDCtrl = data.encontros[k].areas[area].salaIDCtrl
            //                                for (let j in data.encontros[k].areas[area].salas) {
            //                                    if (data.encontros[k].areas[area].salas[j].id == salaIDCtrl) {
            //                                        let inscricoes = data.encontros[k].areas[area].salas[j].inscricoes
            //                                        if (inscricoes.lastIndexOf(self.userStore.user.id) == -1) {
            //                                            inscricoes.push(self.userStore.user.id)
            //                                        }
            //                                    }
            //                                }
            //                            } else {
            //                                let salaIDCtrl = data.encontros[k].salaIDCtrl
            //                                for (let j in data.encontros[k].salas) {
            //                                    if (data.encontros[k].salas[j].id == salaIDCtrl) {
            //                                        let inscricoes = data.encontros[k].salas[j].inscricoes
            //                                        if (inscricoes.lastIndexOf(self.userStore.user.id) == -1) {
            //                                            inscricoes.push(self.userStore.user.id)
            //                                        }
            //                                    }
            //                                }
            //                            }
            //                        }
            //                    }
            //                }
            //                data.save()
            //                console.log("data", data);
            //            })

            // Adiciona inscrição
            set(rdbref("inscricoes/" + elem.id), elem)
            self.$emit('novaInscricao')
            self.$q.notify(notif.success("Inscrição realizada com sucesso"))
            let info = {
                nome: self.userStore.user.nome,
                email: elem.userEmail,
                trilha: self.formacao.nome,
                data: moment(self.formacao.dataInicio).format("DD/MM/YYYY") + " (" + moment(self.formacao.dataInicio).locale('pt-br').format('dddd') + ")",
                horario: horario,
                link: "https://prj-salamais-prd.web.app/formacao/" + self.formacao.id
            }
            console.log("enviaEmail", info);
            self.enviaEmail(info)
        },
        showCadastro() {

        },

        enviaEmail(info) {
            console.log("enviaEmail");
            console.log("db", db);
            let dados = {
                nome: info.nome,
                to: info.email,
                message: {
                    subject: 'Sala Mais - Confirmação de inscrição - ' + info.trilha,
                    text: 'This is the plaintext section of the email body.',
                    html: inscricaook(info),
                }
            };
            db.collection('mail').add(dados).then((e) => {
                console.log("Email enviado!", e);
            });
        }
    }
}
</script>

<style>
</style>