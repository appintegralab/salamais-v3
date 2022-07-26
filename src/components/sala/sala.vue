<template>
    <div v-if="formacao != null && sala != null">
        <div class="flex items-center justify-between px-4 border rounded shadow m-2">
            <div>
                <div class="flex items-center">
                    <div class="flex items-center">
                        <div class="mt-2 fw-600 leading-5 text-[16pt]">
                            Encontro
                        </div>
                        <div class="pt-2 pl-1 ml-2">
                            <span class="rounded bg-slate-300 py-[3px] px-1 fw-600 text-[14pt]">
                                {{ sala.id }}
                            </span>
                        </div>
                        <div class="-mt-[2px]" v-if="areaID != ''">
                            <badgearea :sigla="areaID" />
                        </div>
                    </div>
                    <div class="ml-6" v-if="userStore.user.cpf == '18374109840'">
                        <q-btn size="xs" @click="incluir10UsersTeste">
                            incluir 10 inscrições teste
                        </q-btn>
                    </div>
                </div>
                <div v-if="encontro != null" class="flex items-center">
                    <div class="mt-1">
                        <span class="fw-400 text-[10pt]">HORÁRIO:</span>
                        <span class="px-1 rounded text-[10pt] fw-500 text-slate-900">
                            {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <div class="py-2 m-1 mx-2">
                    <div class="hero-text col-span-6">
                        <h1 class="flex items-center font-bold text-lg md:text-lg max-w-lg text-gray-900 leading-tight">
                            <div>
                                <span class="iconify text-purple-900 text-5xl mr-1" data-icon="ic:school"></span>
                                <hr class="w-12 h-[4px] bg-purple-900 rounded-full mt-0">
                            </div>
                            <div class="flex-1 leading-3 ml-2">
                                <div class="pt-2 m-0 fw-200 text-[10pt] border-b border-gray-300">
                                    Formação
                                </div>
                                <div class="mt-2 leading-5 text-[13pt]">
                                    {{ formacao.nome }}
                                </div>
                            </div>
                        </h1>
                        <div class="flex mt-2">
                            <!-- DATA ÚNICA -->
                            <div class="my-[3px] fw-400 text-[10pt]" v-if="formacao.dataInicio == formacao.dataTermino">
                                <span>DATA:</span>
                                <span class="ml-1 text-[10pt] fw-500 px-1 pt-[2px] rounded text-black bg-slate-200">
                                    {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                </span>
                                <span class="ml-1 text-[10pt] fw-300">
                                    ({{ moment(formacao.dataInicio).locale('pt-br').format('dddd') }})
                                </span>
                            </div>

                            <!-- PERÍODO -->
                            <div class="my-[3px] fw-400 text-[8pt]" v-if="formacao.dataInicio != formacao.dataTermino">
                                <span class="fw-500 text-[8pt]">Período:</span>
                                <span class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-black bg-slate-200">
                                    {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                    <span class="text-[6pt]">
                                        ({{
                                                moment(formacao.dataInicio).locale('pt-br').format('ddd').toUpperCase()
                                        }})
                                    </span>
                                </span>
                                <span class="px-1">até</span>
                                <span class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-black bg-slate-200">
                                    {{ moment(formacao.dataTermino).format("DD/MM/YYYY") }}
                                    <span class="text-[6pt]">
                                        ({{
                                                moment(formacao.dataTermino).locale('pt-br').format('ddd').toUpperCase()
                                        }})
                                    </span>
                                </span>
                            </div>
                            <q-btn @click="$router.push({ path: '/formacao/' + formacao.id })" outline size="5pt"
                                class="px-2 text-[9pt] ml-4 text-green-800">
                                <span class="iconify text-[9pt] mr-1" data-icon="ic:school"></span>
                                ver formação
                            </q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="px-2 mt-1">
            <q-tabs v-model="tab" class="text-slate-900" align="left" dense>
                <q-tab name="mural" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[10pt]">Mural</span>
                </q-tab>
                <q-tab name="materiais" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[10pt]">Materiais de apoio</span>
                </q-tab>
                <q-tab name="participantes" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[10pt]">Participantes</span>
                </q-tab>
            </q-tabs>
        </div>
        <div>
            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
                <q-tab-panel name="mural">
                    <mural :sala="sala" :formacao="formacao" :encontro="encontro" />
                </q-tab-panel>

                <q-tab-panel name="materiais">
                    <materiais />
                </q-tab-panel>

                <q-tab-panel name="participantes">
                    <participantes :sala="sala" :key="refresh" />
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "@/stores/user-store"
import { db, rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, set, get, onValue, query, orderByChild, equalTo } from "firebase/database"
import notif from "@/notif.js"
import badgearea from "@/components/utils/badge-area.vue"
import mural from "./mural-sala.vue"
import materiais from "./materiais.vue"
import participantes from "./participantes.vue"
import salaTool from '@/components/utils/salaTool.js'

export default {
    components: { mural, materiais, participantes, badgearea },
    data() {
        return {
            refresh: 0,
            userStore: userStore(),
            formacao: null,
            sala: null,
            encontro: null,
            areaID: "",
            tab: "mural",
            isFacilitador: false,
            salaTool: salaTool(),
        }
    },
    computed: {
        moment() {
            return moment
        },
    },
    mounted() {
        let self = this
        //console.log("sala")
        let [salaID, formacaoID, encontroID, areaID] = this.$route.params.id.split(":")
        //console.log("salaID", salaID);
        //console.log("formacaoID", formacaoID);
        //console.log("encontroID", encontroID);
        //console.log("areaID", areaID);
        this.areaID = areaID

        this.salaTool.init(this.$route.params.id, (salaTool) => {
            self.salaTool = salaTool
            self.isFacilitador = self.salaTool.isFacilitador(self.userStore.user.id)
            console.log("salaTool", salaTool);
        })

        onValue(ref(rdb, "/salamais/formacoes/" + formacaoID), (snap) => {
            //console.log(snap.val());
            self.formacao = snap.val()
            //self.sala = salaID
            self.encontro = self.formacao.encontros[encontroID]
            if (areaID != undefined && areaID != "") {
                let path = `/salamais/formacoes/${formacaoID}/encontros/${encontroID}/areas/${areaID}/salas/${salaID}`
                onValue(ref(rdb, path), (snap) => {
                    console.log(snap.val());
                    self.sala = snap.val()
                    self.refresh++
                })
            } else {
                let path = `/salamais/formacoes/${formacaoID}/encontros/${encontroID}/salas/${salaID}`
                console.log(path);
                onValue(ref(rdb, path), (snap) => {
                    console.log(snap.val());
                    self.sala = snap.val()
                    self.refresh++
                })
            }
            //console.log("self.encontro", self.encontro);
            //console.log("self.sala", self.sala);
        })
    },
    methods: {

        uuidv4(nome) {
            let _nome = nome.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
            return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ).substr(0, 10);
        },

        inscricaoFake(user) {
            console.log("inscrição FAKE user", user);
            let formacao = this.salaTool.formacao
            let encontro = this.salaTool.encontro
            let sala = this.salaTool.sala
            let id = this.uuidv4("INS-" + formacao.nome)
            let elem = {
                id,
                formacaoID: formacao.id,
                encontros: {},
                userID: user.id,
                userEmail: user.email
            }
            //console.log("elem", elem);

            // POR ENCONTRO
            if (formacao.inscrPorEncontro) {
                // MULTIPLA INSCRICAO
                // POR ÁREA
                if (formacao.turmasPorArea) {
                    elem.encontros[encontro.id] = {
                        encontroID: encontro.id,
                        area: this.salaTool.areaID,
                        sala: parseInt(this.salaTool.salaID.substr(4, 1))
                    }
                } else {
                    elem.encontros[encontro.id] = {
                        encontroID: encontro.id,
                        area: "",
                        sala: parseInt(this.salaTool.salaID.substr(4, 1))
                    }
                }
            }
            console.log("elem", elem);

            if (this.salaTool.areaID != "") {
                //inscricao na sala por área
                let salaIDCtrl = parseInt(this.salaTool.salaID.substr(4, 1))
                let path = `/salamais/formacoes/${formacao.id}/encontros/${encontro.id}/areas/${this.salaTool.areaID}/salas/sala${salaIDCtrl}/inscricoes/`
                console.log("path", path + user.id);
                set(ref(rdb, path + user.id), user.id)
            } else {
                //inscricao na sala comum
                let salaIDCtrl = parseInt(this.salaTool.salaID.substr(4, 1))
                let path = `/salamais/formacoes/${formacao.id}/encontros/${encontro.id}/salas/sala${salaIDCtrl}/inscricoes/`
                console.log("path", path + user.id);
                set(ref(rdb, path + user.id), user.id)
            }

            let path = `/salamais/inscricoes/`
            console.log("path", path + elem.id);
            // Adiciona inscrição
            set(ref(rdb, path + elem.id), elem)

        },

        incluir10UsersTeste() {
            let self = this
            console.log("incluir10UsersTeste");
            console.log("this.salaTool", this.salaTool);

            get(ref(rdb, "/salamais/usuarios/")).then((snap) => {
                let users = snapToArray(snap)
                console.log("users", users);

                let usersInscr = []
                for (let i = 0; i < 10; i++) {
                    let index = parseInt(Math.random() * users.length)
                    self.inscricaoFake(users[index]);
                }
            })
        }
    },
}
</script>
