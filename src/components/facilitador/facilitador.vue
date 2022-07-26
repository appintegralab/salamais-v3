<template >
    <div>
        <div class="flex items-center mx-4 my-1 pt-2 fw-500">
            <div class="h-[20px] fs-12pt mr-1">
                <span class="iconify" data-icon="mdi:school" data-inline="false"></span>
            </div>
            <div>
                Meus encontros como facilitador
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
                                <div>
                                    <span class="iconify text-[12pt]" data-icon="mdi:school"></span>
                                </div>
                                <div class="ml-2 w-[160px]">
                                    <div class="text-[5pt] leading-3 fw-600">
                                        Formação
                                    </div>
                                    <div class="text-[6pt] leading-3 truncate">
                                        <router-link :to="{ path: '/formacao/' + props.row.formacao.id }"
                                            target="_blank">
                                            <span class="text-[7pt]">{{ props.row.formacao.nome }}</span>
                                        </router-link>
                                        <q-tooltip :delay="800">
                                            {{ props.row.formacao.nome }}
                                        </q-tooltip>
                                    </div>
                                </div>
                                <div class="ml-2 w-[130px] leading-3 pt-2">
                                    <div class="text-[6pt] leading-3">
                                        <span class="text-[7pt] fw-500 px-1 rounded text-slate-700 bg-slate-200">
                                            {{ moment(props.row.encontro.data).format("DD/MM/YYYY") }}
                                        </span>
                                        <span class="text-[8pt] fw-300">
                                            ({{
                                                    moment(props.row.encontro.data).locale('pt-br').format('dddd').split("-")[0]
                                            }})
                                        </span>
                                    </div>
                                    <div>
                                        <span class="ml-1 fw-300 text-[6pt]">Horário:</span>
                                        <span class="px-1 rounded text-[7pt] fw-500 text-slate-900">
                                            {{ props.row.encontro.horaInicio }} às {{ props.row.encontro.horaTermino }}
                                        </span>
                                    </div>
                                </div>
                                <div class="pt-1 pb-1 px-1 border shadow rounded">
                                    <div class="flex items-center leading-3">
                                        <span class="px-1 text-[7pt] rounded bg-slate-200">
                                            Sala {{ props.row.id }}
                                        </span>
                                        <div class="flex pl-[3px] px-1 py-1 leading-3 border ml-1 rounded">
                                            <div v-if="props.row.inscricoes != undefined"
                                                class="text-[8pt] fw-600 py-0 text-center">
                                                {{ Object.keys(props.row.inscricoes).length }}
                                            </div>
                                            <div v-if="props.row.inscricoes == undefined"
                                                class="text-[8pt] fw-600 py-0 text-center">
                                                0
                                            </div>
                                            <div class="ml-1 fw-300 flato text-[7pt] py-0">
                                                inscrições
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="ml-2 w-10" v-if="props.row.area == undefined">
                                </div>
                                <div class="ml-2 w-10" v-if="props.row.area != undefined">
                                    <div class="flex items-center">
                                        <span :style="'background-color:' + props.row.area.cor"
                                            class="leading-3 ml-1 text-[5pt] fw-700 px-1 pt-[1px] rounded text-white">
                                            {{ props.row.area.sigla }}
                                        </span>
                                        <q-tooltip :delay="800">
                                            {{ props.row.area.nome }}
                                        </q-tooltip>
                                    </div>
                                </div>
                                <div class="flex-1 ml-2 flex justify-start">
                                    <div>
                                        <q-btn @click="acessarSala(props.row.id,props.row.formacao.id,props.row.encontro,props.row.encontro.id,props.row.area)" class="px-2 py-1 leading-3" size="5px" outline>
                                            <span class="text-[5pt]">acessar sala</span>
                                        </q-btn>
                                    </div>
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
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "@/stores/user-store"
import notif from "@/notif.js"

export default {
    components: {},
    props: {},
    data() {
        return {
            refresh: 0,
            tab: 'mails',
            userStore: userStore(),
            filter: "",
            columns: [
                { label: 'Encontros', field: "nome", align: 'left', sortable: true },
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
        this.load()
    },
    methods: {

        async load() {
            let self = this

            onValue(ref(rdb, "/salamais/facilitadores/" + this.userStore.user.id), async (snap) => {
                let formacoes = snap.val()
                self.rows = []
                if (formacoes) {
                    console.log("formacoes", formacoes.formacoes);
                    for (let key in formacoes.formacoes) {
                        let snap = await get(ref(rdb, "/salamais/formacoes/" + key))
                        let formacao = snap.val()
                        console.log("formacao", formacao);
                        let encontros = formacoes.formacoes[key].encontros

                        for (let encontroID in encontros) {
                            console.log("encontroID", encontroID);
                            let area = encontros[encontroID].area
                            console.log("area", area);
                            let salaID = encontros[encontroID].salaID
                            console.log("salaID", salaID);
                            let encontro = formacao.encontros[encontroID]
                            let sala = {}
                            if (area == undefined) {
                                sala = encontro.salas[salaID]
                            } else {
                                sala = encontro.areas[area.id].salas[salaID]
                            }
                            console.log("sala", sala);
                            sala.area = area
                            sala.salaID = salaID
                            sala.nome = formacao.nome
                            sala.formacao = {
                                id: formacao.id,
                                nome: formacao.nome,
                            }
                            sala.encontro = {
                                id: encontro.id,
                                data: encontro.data,
                                horaInicio: encontro.horaInicio,
                                horaTermino: encontro.horaTermino,
                            }
                            self.rows.push(sala)
                        }
                    }
                    console.log("self.rows", self.rows);
                }
            })
        },

        acessarSala(sala,formacaoID,inscricao,encontroID,area) {
            console.log("inscricao",inscricao);
            let _area = ""
            if(area != undefined) {
                _area = area.id
            }
            let id = sala + ":" + formacaoID + ":" + encontroID + ":" + _area
            console.log(id);
            this.$router.push({ path: '/sala/' + id })
        }
    },
}
</script>
