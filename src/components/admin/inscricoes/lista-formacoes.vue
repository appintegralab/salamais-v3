<template>
    <div class="">
        <q-table dense :pagination="{ rowsPerPage: 20 }" :rows="rows" :filter="filter" :columns="columns" row-key="id"
            table-colspan="1">
            <template v-slot:top>
                <div class="w-full">
                    <div class="p-1 flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="-mb-2 w-[160px]">
                                <FormKit v-model="filter" :classes="{ inner: 'h-7' }" type="text"
                                    placeholder="Filtrar" />
                            </div>
                            <div class="pl-1">
                                <span class="iconify text-[14pt]" data-icon="mi:search"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:body="props">
                <div :props="props" class="border">
                    <div class="p-1">
                        <div @click="$emit('select', props.row)"
                            class="p-1 border rounded hover:bg-gray-200 cursor-pointer">
                            <div class="flex-1 truncate p-1 leading-3 mb-[2px] text-ellipsis">
                                <div class="w-[200px]">
                                    <span class="text-[10pt] froboto fw-500">
                                        {{ props.row.nome }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <span class="text-[10pt] pt-[2px] fw-500 rounded bg-slate-200 px-1">
                                    {{ moment(props.row.dataInicio).format("DD/MM/YYYY") }}
                                </span>
                                <div class="text-center mt-[1px] text-[9pt] fw-400 mx-1 rounded">
                                    {{ moment(props.row.dataInicio).locale('pt-br').format("dddd") }}
                                </div>
                                <div>
                                    <qtdeinscricoes :formacao="props.row" />
                                </div>
                            </div>
                        </div>
                        <q-tooltip :delay="800">
                            {{ props.row.nome }}
                        </q-tooltip>
                    </div>
                </div>
            </template>
        </q-table>
    </div>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../../stores/user-store"
import qtdeinscricoes from "./qtde-inscricoes.vue"
import notif from "../../../notif.js"

export default {
    components: {
        qtdeinscricoes
    },
    data() {
        return {
            filter: "",
            columns: [
                { label: 'Formação', field: 'nome', align: 'left', sortable: true },
                //{ label: '', field: 'dataInicio' },
            ],
            rows: [],
            removeDialog: false
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

    },
    methods: {

        load() {
            let self = this
            onValue(ref(rdb, "/salamais/formacoes"), (snap) => {
                self.rows = snapToArray(snap)
            })
        },

        excluir(item) {
            let self = this
            this.removeDialog = false
            console.log(item);
            set(ref(rdb, "/salamais/formacoes/" + item.id), null)
            self.$q.notify(notif.success("Formação excluida com sucesso"))
        }
    }
}
</script>
<style lang="">
    
</style>