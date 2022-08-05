<template>
    <div class="p-2 border rounded fw-600 text-[8pt]">

        <div class="">
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
                            <div>
                                <span class="font-normal mr-1">
                                    Participantes presentes:
                                </span>
                                <span class="rounded bg-green-600 px-1 text-white">
                                    {{ Object.keys(presentes).length }}
                                </span>
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
                                <div class="ml-1 leading-3">
                                    <div>
                                        <router-link :to="{ path: '/profile/' + props.row.id }" target="_blank">
                                            <span class="text-[7pt]">{{ props.row.nome }}</span>
                                        </router-link>
                                    </div>
                                    <div class="text-[7pt] fw-300" v-if="props.row.cargo != undefined">
                                        {{ cargos[props.row.cargo].cargo }}
                                    </div>
                                </div>
                                <span class="text-[7pt] rounded px-1 ml-4 bg-gray-200">
                                    {{ props.row.ies }} -
                                    <span v-if="props.row.campus != undefined">
                                        {{ campus[props.row.campus].nome }}
                                    </span>
                                </span>

                                <span class="text-[7pt] rounded px-1 ml-1 mr-3 bg-gray-200">
                                    {{ props.row.regional }}
                                </span>
                                <span v-for="(areaID, index) in props.row.areas">
                                    <badgearea :sigla="areaID" />
                                </span>
                                <div v-if="props.row.presenca" class="ml-4 text-xs font-light">
                                    <span class="flex items-center bg-green-600 rounded px-1 text-white">
                                        <i class="iconify" data-icon="ic:twotone-playlist-add-check-circle"
                                            data-inline="false"></i>
                                        <span class="ml-1">presente</span>
                                    </span>
                                </div>
                                <div v-if="props.row.pesquisa" class="ml-4 text-xs font-light">
                                    <span class="flex items-center bg-gray-300 rounded px-1 text-black">
                                        <i class="iconify" data-icon="ic:twotone-playlist-add-check-circle"
                                            data-inline="false"></i>
                                        <span class="ml-1">pesquisa respondida</span>
                                    </span>
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
import { rdb, rdbref } from "@/firebase/firebase.js"
import { ref, get, onValue } from "firebase/database"
import badgearea from "@/components/utils/badge-area.vue"
import _cargos from "@/components/profile/cargos.js"
import _campus from "@/components/profile/campus.js"

export default {
    components: { badgearea },
    props: {
        sala: { default: null, type: Object }
    },
    data() {
        return {
            filter: "",
            columns: [
                { label: 'Participantes', field: "nome", align: 'left', sortable: true },
            ],
            rows: [],
            removeDialog: [],
            presentes: {},
            pesquisas: {},
        }
    },
    watch: {
        sala() {
            this.load()
        }
    },
    computed: {
        cargos() {
            return _cargos
        },
        campus() {
            return _campus
        }
    },
    mounted() {
        let self = this
        let params = this.$route.params.id
        console.log("params", params);
        onValue(rdbref("listaPresenca/" + params), (snap) => {
            let data = snap.val()
            self.presentes = {}
            if (data) {
                self.presentes = data
            }
            console.log("self.presentes", self.presentes);
        })
        onValue(rdbref("pesquisas/quest01/" + params), (snap) => {
            let data = snap.val()
            self.pesquisas = {}
            if (data) {
                self.pesquisas = data
            }
            console.log("self.pesquisas", self.pesquisas);
        })

        this.load()
    },
    methods: {
        load() {
            let self = this
            console.log("participantes this.sala", this.sala);
            this.rows = []
            async function getUser(userKey) {
                get(rdbref("usuarios/" + userKey)).then((snap) => {
                    let user = snap.val()
                    if (self.presentes[user.id] != undefined) {
                        user.presenca = true
                    } else {
                        user.presenca = false
                    }
                    if (self.pesquisas[user.id] != undefined) {
                        user.pesquisa = true
                    } else {
                        user.pesquisa = false
                    }
                    self.rows.push(user)
                })
            }
            async function getInscritos() {
                for (let idx in self.sala.inscricoes) {
                    await getUser(idx)
                }
            }
            getInscritos()
            //this.rows = this.sala.inscricoes
        }
    },
}
</script>
<style lang="">
    
</style>