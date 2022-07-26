<template>
    <div>
        <div class="mx-4 my-1 pt-2 fw-500">
            Formações
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
                            <div>
                                <q-btn size="xs" class="px-2" @click="$refs.dialogformacaoref.show()">
                                    <span class="iconify text-[12pt] mr-1" data-icon="ion:add-circle-outline" />
                                    adicionar formação
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props" >
                        <q-td>
                            <span class="text-[8pt]">{{ props.row.id }}</span>
                        </q-td>
                        <q-td>
                            <router-link :to="{ path: '/formacao/' + props.row.id }">
                                <span class="text-[8pt] hover:font-bold hover:text-slate-500">
                                    {{ props.row.nome }}
                                </span>
                            </router-link>
                        </q-td>
                        <q-td>
                            <span class="text-[8pt]">{{ moment(props.row.dataInicio).format("DD/MM/YYYY") }}</span>
                            <span class="px-1 text-[7pt]">até</span>
                            <span class="text-[8pt]">{{ moment(props.row.dataTermino).format("DD/MM/YYYY") }}</span>
                        </q-td>
                        <q-td>
                            <q-btn @click="$refs.dialogformacaoref.show(props.row)" round size="xs" class="bg-gray-200">
                                <span class="iconify text-[10pt]" data-icon="mi:edit"></span>
                            </q-btn>
                            <q-btn round size="xs" class="ml-2 bg-gray-400">
                                <span class="iconify text-[10pt]" data-icon="mi:delete"></span>
                                <q-menu v-model="removeDialog[props.row.id]">
                                    <div class="rounded w-[200px]">
                                        <div class="flex p-1 bg-red-800 text-white">
                                            <div class="text-[10pt] px-1">
                                                <span class="iconify" data-icon="mdi:warning"></span>
                                            </div>
                                            <div class="text-[8pt] fw-700">Deseja realmente excluir o item?</div>
                                        </div>
                                        <div class="flex justify-around p-2">
                                            <q-btn @click="removeDialog[props.row.id] = false" size="xs">cancelar
                                            </q-btn>
                                            <q-btn @click="excluir(props.row)" class="bg-red-800 text-white" size="xs">
                                                sim</q-btn>
                                        </div>
                                    </div>
                                </q-menu>
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
        <dialogformacao ref="dialogformacaoref" />
    </div>
</template>

<script>
//import { cb } from "../../../clapback/clapback.js"
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../../stores/user-store"
import dialogformacao from "./dialog-formacao.vue"
import notif from "../../../notif.js"

export default {
    components: {
        dialogformacao
    },
    data() {
        return {
            filter: "",
            columns: [
                { label: 'ID', align: 'left', sortable: true },
                { label: 'Nome', field: 'nome', align: 'left', sortable: true },
                { label: 'Período', field: 'dataInicio', align: 'left', sortable: true },
                //{ label: 'Descrição', align: 'left', sortable: true },
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
        //let model = cb("salamais").coll("formacoes")
        //model.listen(() => {
        //    self.load()
        //})
    },
    methods: {

        load() {
            let self = this

            //let model = cb("salamais").coll("formacoes")
            onValue(ref(rdb, "/salamais/formacoes"), (snap) => {
                let data = snapToArray(snap)
                //console.log(data);
                self.rows = data
                self.$forceUpdate()
            })
        },

        excluir(item) {
            let self = this
            this.removeDialog[item.id] = false
            console.log(item);
            set(ref(rdb, "/salamais/formacoes/" + item.id), null)
            self.$q.notify(notif.success("Formação excluida com sucesso"))
        }
    }
}
</script>

<style lang="scss" scoped>
</style>