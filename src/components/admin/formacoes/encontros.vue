<template>
    <div class="my-2 border border-gray-500 rounded p-2">
        <div class="-mt-[14px] ml-1 text-[9pt] fw-700 px-1 bg-white w-[70px]">
            Encontro(s)
        </div>
        <div class="p-1 mt-1 mb-2 border rounded">
            <div class="p-1">
                <q-toggle dense size="xs" v-model="inscrPorEncontro" />
                <span class="ml-1 text-xs fw-300">Inscrições por encontros</span>
            </div>
            <div class="p-1">
                <q-toggle dense size="xs" v-model="multiplaInscr" />
                <span class="ml-1 text-xs fw-300">Permitir inscrições em mais de um encontro</span>
            </div>
            <div class="p-1">
                <q-toggle dense size="xs" v-model="turmasPorArea" />
                <span class="ml-1 text-xs fw-300">Dividir encontros por áreas de conhecimento</span>
            </div>
        </div>
        <div class="flex mt-1 justify-center">
            <div>
                <div class="flex items-center mt-1">
                    <div class="text-[8pt]">
                        <FormKit v-model="encontro.data" :classes="{ inner: 'h-7' }" label="Data" type="date" />
                    </div>
                    <div class="text-[8pt] pl-2 pr-1">
                        <FormKit v-model="encontro.horaInicio" :classes="{ inner: 'h-7' }" label="Horário início"
                            type="time" />
                    </div>
                    <div class="text-[8pt] px-1 pr-3">
                        <FormKit v-model="encontro.horaTermino" :classes="{ inner: 'h-7' }" label="Horário Término"
                            type="time" />
                    </div>
                    <div class="ml-2">
                        <q-btn size="6pt" class="px-1 text-[7pt]" @click="addEncontro">
                            <span class="iconify text-[7pt] mr-1" data-icon="ion:add-circle-outline" />
                            <span class="lowercase text-[7pt]">adicionar</span>
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center rounded bg-slate-200 p-1 mt-1">
            <div class="text-[8pt] fw-500">
                Período:
            </div>
            <div v-if="encontros.length == 0" class="pl-2 text-[8pt] fw-400">
                sem informações
            </div>
            <div class="flex" v-if="encontros.length > 0">
                <div class="pl-2 text-[8pt] fw-400">
                    De
                </div>
                <div class="text-[8pt] fw-500 px-2">
                    {{ moment(periodo.dataInicio).format("DD/MM/YYYY") }}
                    <span class="fw-300 text-[7pt] capitalize">
                        ({{ moment(periodo.dataInicio).locale('pt-br').format("dddd").split("-")[0] }})
                    </span>
                </div>
                <div class="text-[8pt] fw-400">
                    até
                </div>
                <div class="text-[8pt] fw-500 px-2">
                    {{ moment(periodo.dataTermino).format("DD/MM/YYYY") }}
                    <span class="fw-300 text-[7pt] capitalize">
                        ({{ moment(periodo.dataTermino).locale('pt-br').format("dddd").split("-")[0] }})
                    </span>
                </div>
            </div>
        </div>
        <div class="mt-2 text-[8pt] px-1 border rounded flex-1 bg-slate-200">
            <div class="fw-500 border-b border-gray-300">
                Encontros:
            </div>
            <div v-if="encontros.length == 0" class="my-1 text-[8pt] fw-400">
                sem informações
            </div>
            <div class="py-1" v-if="encontros.length > 0">
                <div class="flex rounded bg-white p-1 text-[9pt] my-[3px]" v-for="(item, index) in encontros"
                    :key="index">
                    <div class="fw-600">
                        {{ moment(item.data).format("DD/MM/YYYY") }}
                        <span class="fw-300 text-[9pt] capitalize">
                            ({{ moment(item.data).locale('pt-br').format("dddd").split("-")[0] }})
                        </span>
                    </div>
                    <div class="pl-1">-</div>
                    <div class="pl-1 fw-500">{{ item.horaInicio }}</div>
                    <div class="pl-1">às</div>
                    <div class="pl-1 fw-500">{{ item.horaTermino }}</div>
                    <div class="flex-1 text-right pr-1">
                        <q-btn @click="removerEncontro(index)" class="ml-2 bg-red-900 text-white" size="4px" round>
                            <span class="text-[7pt] iconify" data-icon="line-md:remove"></span>
                            <q-tooltip>Remover encontro</q-tooltip>
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import notif from "../../../notif.js"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import _ from "lodash"

export default {
    data() {
        return {
            encontros: [],
            inscrPorEncontro: false,
            multiplaInscr: false,
            turmasPorArea: false,
            periodo: {
                dataInicio: "",
                dataTermino: ""
            },
            encontro: {
                id: "",
                data: "",
                horaInicio: "",
                horaTermino: "",
                salaIDCtrl: 1
            }
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

        salaEmpty() {
            return {
                id: "sala1",
                cancelado: false,
                link: "",
                facilitador: "",
                inscricoes: []
            }
        },

        encontroEmpty() {
            return {
                id: "",
                data: "",
                horaInicio: "",
                horaTermino: "",
                salaIDCtrl: 1,
                areas: {
                    "AU&D": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "C&A": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "CA&MA": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "CB&S": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "CH": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "CJ": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "ENG": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "G&N": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "T&H": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                    "TI&C": { salaIDCtrl: 1, salas: { sala1: this.salaEmpty() }},
                },
                salas: { sala1: this.salaEmpty() },
            }
        },

        reset() {
            this.encontros = []
            this.inscrPorEncontro = false
            this.multiplaInscr = false
            this.turmasPorArea = false
            this.periodo = {
                dataInicio: "",
                dataTermino: ""
            }
            this.encontro = this.encontroEmpty()
        },

        init(formacao) {
            this.encontros = formacao.encontros
            this.inscrPorEncontro = formacao.inscrPorEncontro
            this.multiplaInscr = formacao.multiplaInscr
            this.turmasPorArea = formacao.turmasPorArea
            this.periodo = {
                dataInicio: formacao.dataInicio,
                dataTermino: formacao.dataTermino
            }
            this.encontro = this.encontroEmpty()
        },

        getEncontros() {
            return {
                encontros: this.encontros,
                dataInicio: this.periodo.dataInicio,
                dataTermino: this.periodo.dataTermino,
                inscrPorEncontro: this.inscrPorEncontro,
                multiplaInscr: this.multiplaInscr,
                turmasPorArea: this.turmasPorArea
            }
        },

        uuidv4(nome) {
            let _nome = nome.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
            return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ).substr(0, 6);
        },

        addEncontro() {
            if (this.encontro.data == undefined || this.encontro.data.trim() == "") {
                this.$q.notify(notif.error("Data do encontro obrigatória!"))
                return
            }
            if (this.encontro.horaInicio == undefined || this.encontro.horaInicio.trim() == "") {
                this.$q.notify(notif.error("Horário de início do encontro obrigatório!"))
                return
            }
            if (this.encontro.horaTermino == undefined || this.encontro.horaTermino.trim() == "") {
                this.$q.notify(notif.error("Horário de término do encontro obrigatório!"))
                return
            }
            let encontro = JSON.parse(JSON.stringify(this.encontro))
            encontro.data = moment(encontro.data).format()
            encontro.id = this.uuidv4("ENC-")
            console.log(encontro);
            this.encontros.push(encontro)
            this.encontros = _.orderBy(this.encontros, ['data','horaInicio'], ['asc','asc'])
            console.log("this.encontros", this.encontros);
            this.atualizaPeriodo()
        },

        removerEncontro(index) {
            console.log(index);
            this.encontros.splice(index, 1)
            this.atualizaPeriodo()
        },

        atualizaPeriodo() {
            let inicio = moment("2099-01-01").format()
            let termino = moment("1099-01-01").format()
            for (let i in this.encontros) {
                if (this.encontros[i].data < inicio) {
                    inicio = this.encontros[i].data
                }
                if (this.encontros[i].data > termino) {
                    termino = this.encontros[i].data
                }
            }
            this.periodo.dataInicio = inicio
            this.periodo.dataTermino = termino
        }
    }
}
</script>
<style lang="">
    
</style>