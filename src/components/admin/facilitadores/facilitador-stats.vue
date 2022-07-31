<template>
    <div v-if="formacoes != null" class="flex items-center">
        <span v-if="false" class="px-2 rounded border text-xs bg-gray-200">
            {{ qtdeFormacoes }}
            <span v-if="qtdeFormacoes > 1" class="font-light">formações</span>
            <span v-if="qtdeFormacoes == 1" class="font-light">formação</span>
            <span class="iconify inline-block text-sm ml-1" data-icon="ph:info-duotone"></span>
        </span>
        <span class="ml-4 px-2 rounded border text-xs bg-gray-200 cursor-pointer hover:bg-gray-300">
            {{ qtdeTrilhas }}
            <span v-if="qtdeTrilhas > 1" class="font-light">trilhas</span>
            <span v-if="qtdeTrilhas == 1" class="font-light">trilha</span>
            <span class="iconify inline-block text-sm ml-1" data-icon="ph:info-duotone"></span>
            <q-menu>
                <div class="border rounded p-2">
                    <div v-for="(formacao, index) in formacoes" class="border rounded p-1 mb-1">
                        <div class="flex-1 leading-3">
                            <div class="pt-0 m-0 fw-200 text-xs">
                                Formação
                                <span
                                    class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200">
                                    {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                    <span class="text-[6pt]">
                                        ({{ moment(formacao.dataInicio).locale('pt-br').format('ddd').toUpperCase() }})
                                    </span>
                                </span>

                            </div>
                            <div class="mt-0 leading-5 text-xs font-medium">
                                {{ formacao.nome }}
                            </div>
                        </div>
                        <span class="fw-500 text-[8pt]">Trilhas:</span>
                        <div v-for="(encontro, index) in formacao.encontros">
                            <div class="flex">
                                <div>
                                    <span class="text-[9pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                        {{ moment(encontro.data).format("DD/MM/YYYY") }}
                                    </span>
                                    <span class="ml-1 text-[9pt] fw-300">
                                        ({{ moment(encontro.data).locale('pt-br').format('dddd').split("-")[0] }})
                                    </span>
                                </div>
                                <div>
                                    <span class="ml-1 text-[9pt] fw-200">Horário:</span>
                                    <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                        {{ encontro.horaInicio }} às {{ encontro.horaTermino }}
                                    </span>
                                </div>
                                <div v-for="(sala, index) in encontro.salas" :key="index">
                                    <span class="border rounded px-1 bg-gray-200 font-medium">
                                        {{ sala.id }}
                                    </span>
                                    <badgearea :sigla="sala.area" />
                                    <q-btn @click="acessarSala(formacao,encontro,sala)" class="ml-1 px-1 py-1 leading-3"
                                        size="5px" outline>
                                        <span class="text-[5pt]">acessar sala</span>
                                    </q-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-menu>
        </span>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import badgearea from "@/components/utils/badge-area.vue"

export default {
    components: { badgearea },
    props: {
        formacoes: { default: null, type: Object }
    },
    data() {
        return {

        }
    },
    computed: {
        moment() {
            return moment
        },
        qtdeFormacoes() {
            if (this.formacoes != null) {
                return Object.keys(this.formacoes).length
            }
            return 0
        },
        qtdeTrilhas() {
            let qtde = 0
            if (this.formacoes != null) {
                for (let key in this.formacoes) {
                    qtde = qtde + Object.keys(this.formacoes[key].encontros).length
                }
                return qtde
            }
            return 0
        }
    },
    mounted() {

    },
    methods: {

        acessarSala(formacao,encontro,sala) {
            console.log("acessarSala");
            console.log({formacao,encontro,sala});
            //console.log(this.formacao.id);
            let areaID = ""
            if (sala.area) {
                areaID = sala.area
            }
            let id = sala.id + ":" + formacao.id + ":" + encontro.id + ":" + areaID
            //console.log(id);
            this.$router.push({ path: '/sala/' + id })
        }
    },
}
</script>
<style lang="">
    
</style>