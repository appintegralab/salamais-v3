<template>
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
        <div class="bg-white w-[500px]">
            <div class="flex items-center justify-between p-2 bg-slate-200 h-[36px]">
                <div class="fw-600">
                    Lista de inscritos
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
                                <div class="pt-2 m-0 fw-200 text-[9pt] border-b border-gray-300">
                                    Formação
                                </div>
                                <div class="mt-1 leading-5 text-[12pt]">
                                    {{ formacao.nome }}
                                </div>
                            </div>
                        </div>
                        <!-- DATA ÚNICA -->
                        <div class="mx-8 my-[3px] fw-400 text-[10pt]" v-if="formacao.dataInicio == formacao.dataTermino">
                            <span>DATA:</span>
                            <span class="ml-1 text-[10pt] fw-500 px-1 pt-[2px] rounded text-slate-700 bg-slate-200">
                                {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                            </span>
                            <span class="ml-1 text-[10pt] fw-300">
                                ({{ moment(formacao.dataInicio).locale('pt-br').format('dddd') }})
                            </span>
                        </div>
                        <!-- PERÍODO -->
                        <div class="mx-8 my-[3px] fw-400 text-[8pt]" v-if="formacao.dataInicio != formacao.dataTermino">
                            <span class="fw-500 text-[8pt]">Período:</span>
                            <span class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-slate-700 bg-slate-200">
                                {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                <span class="text-[6pt]">
                                    ({{ moment(formacao.dataInicio).locale('pt-br').format('ddd').toUpperCase() }})
                                </span>
                            </span>
                            <span class="px-1">até</span>
                            <span class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-slate-700 bg-slate-200">
                                {{ moment(formacao.dataTermino).format("DD/MM/YYYY") }}
                                <span class="text-[6pt]">
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
                <div class="pt-1 pb-1 px-1 mt-1 border shadow rounded">
                    <div class="flex items-center leading-3">
                        <span class="px-1 py-1 text-[12pt] rounded bg-slate-200">
                            {{ sala.id }}
                        </span>
                        <div class="flex pl-[3px] px-1 py-1 leading-3 border ml-1 rounded">
                            <div class="text-[11pt] fw-600 py-0 text-center" v-if="sala.inscricoes == undefined">
                                0
                            </div>
                            <div class="text-[11pt] fw-600 py-0 text-center" v-if="sala.inscricoes != undefined">
                                {{ Object.keys(sala.inscricoes).length }}
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

            <div class="mx-2 p-2 border rounded">

                <q-table dense :pagination="{ rowsPerPage: 20 }" :rows="inscritos" :filter="filter" :columns="columns"
                    row-key="id" table-colspan="1">
                    <template v-slot:top>
                        <div class="w-full">
                            <div class="p-1 flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="-mb-2 w-[160px]">
                                        <FormKit v-model="filter" :classes="{ inner: 'h-5' }" type="text"
                                            placeholder="Filtrar" />
                                    </div>
                                    <div class="pl-1 -mt-1">
                                        <span class="iconify text-[11pt]" data-icon="mi:search"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:header>
                        <div class="mx-2 text-[10pt] fw-600">
                            Inscritos
                        </div>
                    </template>
                    <template v-slot:body="props">
                        <div :props="props" class="">
                            <div class="px-1">
                                <div class="flex items-center p-2 border rounded">
                                    <div>
                                        <q-avatar size="30px">
                                            <q-img :src="props.row.urlFoto" />
                                        </q-avatar>
                                    </div>
                                    <div class="ml-1">
                                        <div class="leading-3 text-[10pt] fw-400 flato pt-1">
                                            {{ props.row.nome }}
                                        </div>
                                        <div class="leading-3 text-[9pt] flato fw-300 mt-[1px]">
                                            {{ props.row.email }}
                                        </div>
                                    </div>
                                    <div class="ml-3">
                                        <q-btn size="7px" round @click="goProfile(props.row.id)">
                                            <span class="iconify text-[10pt]"
                                                data-icon="ic:outline-remove-red-eye"></span>
                                            <q-tooltip>
                                                ver perfil
                                            </q-tooltip>
                                        </q-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </q-table>


            </div>
        </div>
    </q-dialog>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, set, get } from "firebase/database"

export default {
    props: {
    },
    data() {
        return {
            dialog: false,
            sala: {},
            formacao: {},
            encontro: {},
            inscritos: [],
            area: null,
            filter: "",
            columns: [
                { label: 'Formação', field: 'nome', align: 'left', sortable: true },
                //{ label: '', field: 'dataInicio' },
            ],
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
        show(sala, formacao, encontro, area) {
            this.sala = sala
            this.formacao = formacao
            this.encontro = encontro
            this.area = area

            this.dialog = true
            this.loadUsers()
        },

        loadUsers() {
            let self = this
            this.inscritos = []
            //let userModel = cb("salamais").coll("usuarios")
            for (let i in this.sala.inscricoes) {
                let userID = this.sala.inscricoes[i]
                //console.log(userID);
                get(ref(rdb,"/salamais/usuarios/"+userID)).then((snap) => {
                    let data = snap.val()
                    //console.log(`user: ${userID}`, data);
                    self.inscritos.push(data)
                })
            }
        },

        goProfile(userID) {
            //console.log(userID);
            let route = this.$router.resolve({ path: '/profile/' + userID });
            // let route = this.$router.resolve('/link/to/page'); // This also works.
            window.open(route.href, '_blank');
        }

    },
}
</script>
<style lang="">
    
</style>