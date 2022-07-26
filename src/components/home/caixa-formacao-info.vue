<template>
    <div class="" v-if="formacao != null">
        <div class="grid grid-cols-2">
            <div class="col-span-1 pb-3">
                <div class="flex items-center">
                    <div class="fw-600 text-[12pt] text-slate-600">
                        {{ formacao.nome }}
                        <span v-if="formacao.turmasPorArea"
                            class="ml-1 text-[7pt] fw-600 px-1 pt-[2px] rounded text-slate-700 bg-slate-300">
                            Turmas por Área
                        </span>
                    </div>
                </div>

                <!-- DATA ÚNICA -->
                <div class="my-[3px] fw-400 text-[10pt]" v-if="formacao.dataInicio == formacao.dataTermino">
                    <span>DATA:</span>
                    <span class="ml-1 text-[10pt] fw-500 px-1 pt-[2px] rounded text-slate-700 bg-slate-200">
                        {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                    </span>
                    <span class="ml-1 text-[10pt] fw-300">
                        ({{ moment(formacao.dataInicio).locale('pt-br').format('dddd') }})
                    </span>
                </div>

                <!-- PERÍODO -->
                <div class="my-[3px] fw-400 text-[8pt]" v-if="formacao.dataInicio != formacao.dataTermino">
                    <span class="fw-500 text-[9pt]">Período:</span>
                    <span class="ml-1 text-[10pt] fw-500 pl-[1px] pt-[2px] rounded text-slate-700 bg-slate-200">
                        {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                        <span class="text-[8pt]">
                            ({{ moment(formacao.dataInicio).locale('pt-br').format('ddd').toUpperCase() }})
                        </span>
                    </span>
                    <span class="px-1">até</span>
                    <span class="ml-1 text-[10pt] fw-500 pl-[1px] pt-[2px] rounded text-slate-700 bg-slate-200">
                        {{ moment(formacao.dataTermino).format("DD/MM/YYYY") }}
                        <span class="text-[8pt]">
                            ({{ moment(formacao.dataTermino).locale('pt-br').format('ddd').toUpperCase() }})
                        </span>
                    </span>
                </div>
                <div class="leading-[0.8rem] fw-300 pr-2">
                    <div class="fw-500 mt-2 text-[10pt]">Descrição: </div>
                    <div class="border border-gray-200 rounded p-1 px-2 text-[9pt] finter text-justify mt-1">
                        {{ formacao.descr }}
                    </div>
                </div>
            </div>
            <div class="col-span-1 border rounded">
                <div class="p-1 fw-400 text-[7pt]">
                    <div v-if="formacao.inscrPorEncontro" class="flex items-center justify-between">
                        <div class="fw-500 text-[10pt]">
                            Opções de encontro(s):
                        </div>
                        <div v-if="!formacao.multiplaInscr" class="flex items-center fw-300 text-[7pt]">
                            <span>escolher 1 opção</span>
                            <div>
                                <span class="ml-1 iconify text-[11pt]" data-icon="ph:question-duotone"></span>
                                <q-tooltip class="bg-white text-slate-900 border">
                                    <div class="flex items-center">
                                        <div class="w-[20px] h-[20px] text-[15pt]">
                                            <span class="absolute iconify" data-icon="ph:question-duotone"></span>
                                        </div>
                                        <div class="pl-3 w-[180px]">
                                            Será ofertada a mesma formação nos diversos encontros
                                        </div>
                                    </div>
                                </q-tooltip>
                            </div>
                        </div>
                        <div v-if="formacao.multiplaInscr" class="flex items-center fw-300 text-[7pt]">
                            <span>escolher opções</span>
                            <div>
                                <span class="ml-1 iconify text-[11pt]" data-icon="ph:question-duotone"></span>
                                <q-tooltip class="bg-white text-slate-900 border">
                                    <div class="flex items-center">
                                        <div class="w-[20px] h-[20px] text-[15pt]">
                                            <span class="absolute iconify" data-icon="ph:question-duotone"></span>
                                        </div>
                                        <div class="pl-3 w-[180px]">
                                            Você poderá se inscrever em diversos encontros em diferentes horários
                                        </div>
                                    </div>
                                </q-tooltip>
                            </div>
                        </div>
                    </div>
                    <div v-if="!formacao.inscrPorEncontro">
                        <span class="fw-500 text-[10pt]">
                            Encontro(s):
                        </span>
                    </div>
                    <div v-for="(encontro, index) in formacao.encontros" :key="index">
                        <div class="flex items-center mt-1 p-1 bg-slate-200 rounded">
                            <div>
                                <span class="ml-1 text-[10pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                    {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                </span>
                                <span class="ml-1 text-[10pt] fw-300">
                                    ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0] }})
                                </span>
                            </div>
                            <div>
                                <span class="ml-2 text-[10pt] fw-200">Horário:</span>
                                <span class="px-1 rounded text-[10pt] fw-500 text-slate-900">
                                    {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'

export default {
    props: {
        formacao: { default: null, type: Object }
    },
    data() {
        return {

        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    methods: {

    }
}
</script>
<style lang="">
    
</style>