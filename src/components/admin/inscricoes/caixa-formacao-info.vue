<template>
    <div class="" v-if="formacao != null">

        <div class="p-1 fw-400 text-[7pt]" :key="refresh">
            <div v-if="formacao.inscrPorEncontro" class="">
                <div class="fw-500 text-[9pt]">
                    Formação com inscrições por encontro(s)
                    <span v-if="formacao.turmasPorArea">
                        e por áreas
                    </span>
                </div>
                <div v-for="(encontro, index) in formacao.encontros" :key="index">
                    <div class="mt-1 bg-slate-200 rounded pb-1">
                        <div class="p-1 rounded flex items-center bg-slate-300">
                            <div>
                                <span class="ml-1 text-[9pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                    {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                </span>
                                <span class="ml-1 text-[9pt] fw-300">
                                    ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0] }})
                                </span>
                            </div>
                            <div>
                                <span class="ml-2 fw-200 text-[9pt]">Horário:</span>
                                <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                    {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                </span>
                            </div>
                            <div class="flex-1">
                                <abrirpresenca :encontro="encontro" :formacao="formacao" />
                            </div>
                        </div>
                        <div v-if="formacao.turmasPorArea">
                            <div v-for="(area, i) in areas" :key="i"
                                class="flex items-center rounded mx-1 my-1 bg-white">
                                <div class="w-12">
                                    <span :style="'background-color:' + area.cor"
                                        class="leading-3 ml-1 text-[7pt] fw-700 px-1 pt-[1px] rounded text-white">
                                        {{ area.sigla }}
                                        <q-tooltip :delay="800">
                                            {{ area.nome }}
                                        </q-tooltip>
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <div v-for="(sala, idx) in encontro.areas[area.id].salas" :key="idx"> 
                                        <salainfo :formacao="formacao" :sala="sala" :area="area" :encontroIdx="index"
                                            @showInscritos="showInscritos" @showEditar="showEditar"
                                            @showQuebra="showQuebra" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!formacao.turmasPorArea">
                            <div v-for="(sala, idx) in encontro.salas" class="ml-1 mt-1 border rounded bg-white p-1">
                                <salainfo class="" :formacao="formacao" :sala="sala" :encontroIdx="index"
                                    @showInscritos="showInscritos" @showEditar="showEditar" @showQuebra="showQuebra" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div v-if="!formacao.inscrPorEncontro">
                <span class="fw-500 text-[8pt]">
                    Formação única
                </span>
                <div v-for="(encontro, index) in formacao.encontros" :key="index">
                    <div class="flex items-center mt-1 p-1 bg-slate-200 rounded">
                        <div>
                            <span class="ml-1 text-[7pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                {{ moment(encontro.data).format("DD/MM/YYYY") }}
                            </span>
                            <span class="ml-1 text-[7pt] fw-300">
                                ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0] }})
                            </span>
                        </div>
                        <div>
                            <span class="ml-2 fw-200">Horário:</span>
                            <span class="px-1 rounded text-[7pt] fw-500 text-slate-900">
                                {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dialoginscritos ref="dialoginscritosref" />
        <dialogeditar ref="dialogeditarref" @salaUpdate="$emit('salaUpdate')" />
        <quebrarSala ref="quebrarSalaref" @salaUpdate="$emit('salaUpdate')" />
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import salainfo from "./sala-info.vue"
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import dialoginscritos from "./dialog-inscritos.vue"
import dialogeditar from "./dialog-editar-sala.vue"
import abrirpresenca from "./abrir-presenca.vue"
import quebrarSala from "./dialog-quebrar-sala.vue"

export default {
    components: { salainfo, dialoginscritos, dialogeditar, abrirpresenca, quebrarSala },
    props: {
        formacao: { default: null, type: Object }
    },
    data() {
        return {
            refresh: 0,
            areas: [],
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {
        let self = this
        //console.log("dialog mounted", userStore.user);
        get(ref(rdb, "/salamais/areas")).then((snap) => {
            let data = snap.val()
            self.areas = data
        })
    },
    methods: {
        showInscritos({ sala, encontroIdx, area }) {
            console.log(sala);
            console.log(encontroIdx);
            console.log(area);
            this.$refs.dialoginscritosref.show(sala, this.formacao, this.formacao.encontros[encontroIdx], area)
        },

        showEditar({ sala, encontroIdx, area }) {
            console.log(sala);
            console.log(encontroIdx);
            console.log(area);
            this.$refs.dialogeditarref.show(sala, this.formacao, this.formacao.encontros[encontroIdx], area)
        },
        showQuebra({ sala, encontroIdx, area }) {
            console.log(sala);
            console.log(encontroIdx);
            console.log(area);
            this.$refs.quebrarSalaref.show(sala, this.formacao, this.formacao.encontros[encontroIdx], area)
        }
    }
}
</script>
<style lang="">
    
</style>