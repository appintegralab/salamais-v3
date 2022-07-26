<template>
    <q-dialog v-model="dialog">
        <q-card class="w-[470px]">
            <q-toolbar class="h-[20px]">
                <q-avatar size="28px" class="bg-slate-300">
                    <span class="iconify text-lg" data-icon="ic:person"></span>
                </q-avatar>
                <q-toolbar-title>
                    <span class="text-base">
                        Editar dados pessoais
                    </span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <div class="border rounded shadow p-2 m-1 mx-3">
                <FormKit id="formacao" type="form" v-model="formData" :actions="false" @submit="submitHandler">
                    <div class="px-2">
                        <FormKit name='nome' label='Nome completo *' help='Indique seu nome completo'
                            :classes="inputCss" validation="required" />
                    </div>
                    <div class="px-2 mb-3">
                        <div class="fw-600 text-[9pt]">CPF *</div>
                        <q-input class="text-xs" dense outlined v-model="formData.cpf" mask="###.###.###-##" />
                    </div>
                    <div class="col-span-1 px-2">
                        <FormKit type="email" name='email' label='Email *' help='Indique um email válido'
                            :classes="inputCss" validation="required|email" />
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="col-span-1 px-2">
                            <FormKit type="tel" name='telefone' label='Telefone *'
                                help='Indique um telefone (99) 9999-9999' :classes="inputCss" validation="required" />
                        </div>
                        <div class="col-span-1 px-2">
                            <FormKit type="select" name='cargo' label='Cargo (função)'
                                help='Indique cargo / função de atuação' :classes="inputCss" :options="optionsCargos" />
                        </div>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="col-span-1 px-2">
                            <FormKit type="select" name='ies' label='Unidade (IES)' help='Indique a unidade de atuação'
                                :classes="inputCss" :options="optionsIES" />
                        </div>
                        <div class="col-span-1 px-2">
                            <FormKit type="select" name='campus' label='Campus' help='Indique o campus de atuação'
                                :classes="inputCss" :options="optionsCampus" />
                        </div>
                        <div class="col-span-1 px-2">
                            <FormKit type="select" name='regional' label='Regional' help='Indique a regional de atuação'
                                :classes="inputCss" :options="optionsRegionais" />
                        </div>
                    </div>
                    <div class="px-2 mb-3">
                        <div class="fw-600 text-[9pt]">Áreas de conhecimento *</div>
                        <div class="border rounded p-1">
                            <div class="grid grid-cols-2">
                                <div v-for="(area, index) in areas" :key="index">
                                    <q-checkbox size="30px" v-model="formData.areas" :val="area.id" color="grey">
                                        <div class="flex items-center">
                                            <div v-if="!$q.screen.xs" :style="'background-color:' + area.cor"
                                                class="text-[5pt] fw-400 py-0 px-1 rounded text-white">
                                                {{ area.sigla }}
                                            </div>
                                            <div :style="'color:' + area.cor"
                                                class="ml-1 text-[6pt] sm:text-[6pt] fw-600">
                                                {{ area.nome }}
                                            </div>
                                        </div>
                                    </q-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-1 border-t pt-2 px-2">
                        <div class="flex justify-center">
                            <q-btn @click="submitHandler" size="sm" outline class="flex items-center">
                                <span class="iconify text-base mr-1" data-icon="ic:save"></span>
                                salvar informações
                            </q-btn>
                        </div>
                    </div>
                </FormKit>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import notif from "../notif.js"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../stores/user-store"
import ies from "../components/profile/ies.js"
import cargos from "../components/profile/cargos.js"
import campus from "../components/profile/campus.js"
import regionais from "../components/profile/regionais.js"

export default {
    components: {},
    props: {},
    data() {
        return {
            dialog: false,
            user: null,
            inputCss: { inner: 'h-7 text-[8pt] fw-700' },
            areas: [],
            formData: {
                areas: []
            },
            optionsCampus: []
        }
    },
    computed: {
        optionsIES() {
            let vet = []
            for (let key in ies) {
                vet.push({ label: ies[key].nome, value: key })
            }
            return vet
        },
        optionsCargos() {
            let vet = []
            for (let key in cargos) {
                vet.push({ label: cargos[key].cargo, value: key })
            }
            return vet
        },
        optionsRegionais() {
            let vet = []
            for (let key in regionais) {
                vet.push({ label: regionais[key].regional, value: key })
            }
            return vet
        }
    },
    watch: {
        "formData.ies": function () {
            console.log("ies mudou");
            this.optionsCampus = []
            let iesSel = this.formData.ies
            if (ies[iesSel] != undefined) {
                for (let key in ies[iesSel].campus) {
                    this.optionsCampus.push({ label: campus[key].nome, value: key })
                }
            }
        }
    },
    mounted() {
        let self = this
        get(ref(rdb, "/salamais/areas/")).then((snap) => {
            self.areas = snap.val()
        })
    },
    methods: {

        show(user) {
            let item = JSON.parse(JSON.stringify(user))
            this.formData = item
            this.dialog = true
        },

        uuidv4(nome) {
            let _nome = nome.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
            return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ).substr(0, 6);
        },

        submitHandler() {
            let self = this
            console.log("this.formData", this.formData);
            if (this.formData.nome == "") {
                this.$q.notify(notif.error("Nome obrigatório!"))
                return
            }
            if (this.formData.cpf == "") {
                this.$q.notify(notif.error("CPF obrigatório!"))
                return
            }
            if (this.formData.email == "") {
                this.$q.notify(notif.error("Email obrigatório!"))
                return
            }
            let er = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!er.test(this.formData.email)) {
                this.$q.notify(notif.error("Email inválido!"))
                return
            }
            if (this.formData.telefone == "") {
                this.$q.notify(notif.error("Telefone obrigatório!"))
                return
            }
            if (this.formData.areas.length == 0) {
                this.$q.notify(notif.error("Seleção de Área é obrigatória!"))
                return
            }
            if (this.formData.id == undefined) {
                let id = this.uuidv4(this.formData.nome)
                console.log(id);
                this.formData.id = id
                this.formData.cpf = this.formData.cpf.replaceAll("-", "").replaceAll(".", "")
                console.log(this.formData);
                self.dialog = false
                set(ref(rdb, "/salamais/usuarios/" + this.formData.id), this.formData)
                self.$emit('updated')
                self.$q.notify(notif.success("Cadastro de informações pessoais realizada com sucesso"))
            } else {
                self.dialog = false
                this.formData.cpf = this.formData.cpf.replaceAll("-", "").replaceAll(".", "")
                set(ref(rdb, "/salamais/usuarios/" + this.formData.id), this.formData)
                self.$emit('updated')
                self.$q.notify(notif.success("Alteração de informações pessoais realizada com sucesso"))
            }
        }
    },
}
</script>
<style lang="">
    
</style>