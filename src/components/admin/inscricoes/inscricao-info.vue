<template >
    <div class="border rounded">
        <div>
            <div class="px-1">
                <div class="absolute right-0 mr-6 mt-2">
                    <q-btn @click="$router.push({ path: '/formacao/' + formacao.id })" outline size="5pt"
                        class="px-2 pt-[6px] text-[8pt] ml-4 text-green-800">
                        <span class="iconify text-[10pt] mr-1" data-icon="ic:school"></span>
                        ver formação
                    </q-btn>
                </div>
                <div class="flex items-center font-bold text-lg md:text-lg max-w-lg text-gray-900 leading-tight">
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
                <div class="mx-8 my-[3px] fw-400 text-[8pt]" v-if="formacao.dataInicio == formacao.dataTermino">
                    <span>DATA:</span>
                    <span class="ml-1 text-[9pt] fw-500 px-1 pt-[2px] rounded text-slate-700 bg-slate-200">
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
                <p class="leading-4 text-gray-800 text-[9pt] mx-8 mt-1 font-light">
                    {{ formacao.descr }}
                </p>
            </div>
        </div>
        <div class="mb-1 mt-2 mx-1 p-2 border rounded shadow">
            <div class="text-xs fw-600 border-b mb-2">
                Encontros
            </div>
            <caixaformacaoinfo :formacao="formacao" @salaUpdate="$emit('salaUpdate')" />
        </div>
    </div>
</template>

<script>
import caixaformacaoinfo from "./caixa-formacao-info.vue"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'

export default {
    components: { caixaformacaoinfo },
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
    mounted() {

    },
    methods: {


    }
}
</script>
<style lang="">
    
</style>