<template >
    <div>
        <div class="flex items-center mx-4 my-1 pt-2 fw-500">
            <div class="h-[20px] fs-12pt mr-1">
                <span class="iconify" data-icon="mdi:school" data-inline="false"></span>
            </div>
            <div>
                Facilitadores
            </div>
        </div>
        <div class="mx-4">
            <q-table dense :pagination="{ rowsPerPage: 20 }" :rows="rows" :filter="filter" :columns="columns"
                row-key="name">
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
                            <div v-if="false">
                                <q-btn size="xs" class="px-2" @click="$refs.dialogformacaoref.show()">
                                    <span class="iconify text-[12pt] mr-1" data-icon="ion:add-circle-outline" />
                                    adicionar formação
                                </q-btn>
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
                                <div class="ml-1 flex-1">
                                    <facilitadorStats :formacoes="props.row.formacoes"/>
                                </div>
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
    </div>
</template>

<script>
import { rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, set, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../../stores/user-store"
import notif from "../../../notif.js"
import facilitadorStats from "./facilitador-stats.vue"

export default {
    components: { facilitadorStats },
    data() {
        return {
            filter: "",
            columns: [
                { label: 'Facilitadores', field: "nome", align: 'left', sortable: true },
                { label: '', sortable: false },
            ],
            rows: [],
            removeDialog: []
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {
        let self = this
        this.load()

    },
    methods: {

        async getUser(userID) {
            let self = this
            //console.log("pushUser",userID);
            let snap = await get(rdbref("usuarios/" + userID))
            let user = snap.val()
            console.log("user", user);
            return user
        },

        pushFacilitador(facilitadores, formacao, encontro, sala, keyArea) {
            if (sala.facilitadores != undefined) {
                for (let key in sala.facilitadores) {
                    if (facilitadores[key] == undefined) {
                        facilitadores[key] = {
                            formacoes: {}
                        }
                    }
                    console.log("facilitadores", facilitadores);
                    if (facilitadores[key].formacoes[formacao.id] == undefined) {
                        facilitadores[key].formacoes[formacao.id] = {
                            id: formacao.id,
                            encontros: {},
                            nome: formacao.nome,
                            dataInicio: formacao.dataInicio,
                            dataTermino: formacao.dataTermino,
                        }
                    }
                    if (facilitadores[key].formacoes[formacao.id].encontros[encontro.id] == undefined) {
                        facilitadores[key].formacoes[formacao.id].encontros[encontro.id] = {
                            id: encontro.id,
                            salas: {},
                            data: encontro.data,
                            horaInicio: encontro.horaInicio,
                            horaTermino: encontro.horaTermino
                        }
                    }
                    if (facilitadores[key].formacoes[formacao.id].encontros[encontro.id].salas[sala.id] == undefined) {
                        let item = {
                            id: sala.id,
                            link: sala.link
                        }
                        if (formacao.turmasPorArea) {
                            item.area = keyArea
                        }
                        facilitadores[key].formacoes[formacao.id].encontros[encontro.id].salas[sala.id] = item
                    }
                }
            }
        },

        load() {
            let self = this

            onValue(rdbref("/formacoes"), async (snap) => {
                let formacoes = snap.val()
                console.log("formacoes", formacoes);
                let facilitadores = {}
                for (let keyForm in formacoes) {
                    let formacao = formacoes[keyForm]
                    let encontros = formacao.encontros
                    for (let keyEnc in encontros) {
                        if (formacao.turmasPorArea) {
                            for (let keyArea in encontros[keyEnc].areas) {
                                let salas = encontros[keyEnc].areas[keyArea].salas
                                for (let keySala in salas) {
                                    self.pushFacilitador(facilitadores, formacao, encontros[keyEnc], salas[keySala], keyArea)
                                }
                            }
                        } else {
                            let salas = encontros[keyEnc].salas
                            for (let keySala in salas) {
                                self.pushFacilitador(facilitadores, formacao, encontros[keyEnc], salas[keySala])
                            }
                        }


                    }
                }

                for(let key in facilitadores) {
                    let user = await self.getUser(key)
                    facilitadores[key].nome = user.nome
                    facilitadores[key].urlFoto = user.urlFoto
                    self.rows.push(facilitadores[key])
                }
                console.log("facilitadores", facilitadores);
            });

            //            onValue(rdbref("/facilitadores"), (snap) => {
            //                let facilitadores = snap.val()
            //                console.log("facilitadores", facilitadores);
            //                for (let key in facilitadores) {
            //                    self.pushUser(key)
            //                }
            //            })
        },


    }
}
</script>
