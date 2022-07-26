<template lang="">
    <div class="flex mb-1" v-if="formacao != null">
        <div class="flex-shrink w-[48px]">
            <div>
                <div
                    class="absolute mx-3 bg-slate-500 text-white w-6 h-6 border rounded-full flex items-center justify-center">
                    <span class="iconify" data-icon="mdi:calendar-check" data-inline="false"></span>
                </div>
            </div>
            <div class="w-1 h-full mx-auto border bg-slate-300"></div>
        </div>
        <div class="pt-1 pb-3 flex-1">
            <caixaformacaoinfo :formacao="formacao" />
            <div class="mt-2" v-if="!formacao.inscricao">
                <q-btn outline @click="$emit('inscricao',formacao)" class="px-2 text-gray-700" size="6px">
                    <span class="text-[10pt] iconify" data-icon="mdi:calendar-check"></span>
                    <span class="ml-1 pt-[2px] text-[7pt]">
                        Realizar inscrição
                    </span>
                </q-btn>
                <q-btn @click="$router.push({ path: '/formacao/' + formacao.id })" outline size="5pt"
                            class="px-2 text-[7pt] ml-4 text-green-800">
                            <span class="iconify text-[10pt] mr-1" data-icon="ic:school"></span>
                            <span class="ml-1 pt-[2px] text-[7pt]">
                                ver formação
                            </span>
                        </q-btn>
            </div>
            
            <div class="border-t mt-1 mb-2"></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import caixaformacaoinfo from "./caixa-formacao-info.vue"

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
    methods: {

    }
}
</script>
<style lang="">
    
</style>