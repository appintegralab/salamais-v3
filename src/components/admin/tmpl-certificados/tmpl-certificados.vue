<template >
    <div>
        <div class="flex items-center mx-4 my-1 pt-2 fw-500">
            <div class="h-[20px] fs-12pt mr-1">
                <span class="iconify" data-icon="mdi:school" data-inline="false"></span>
            </div>
            <div>
                Modelos Certificados
            </div>
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
                                <q-btn size="xs" class="px-2" @click="$refs.dialogModelEditorref.show()">
                                    <span class="iconify text-[12pt] mr-1" data-icon="ion:add-circle-outline" />
                                    novo modelo
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td>
                            <div class="flex items-center">
                                <q-avatar size="48px">
                                    <span class="iconify" data-icon="mdi:file-certificate-outline"
                                        data-inline="false"></span>
                                </q-avatar>
                                <div class="flex-1 ml-1">
                                    <span class="text-sm">{{ props.row.nome }}</span>
                                </div>
                                <div>
                                    <q-btn @click="$refs.dialogModelEditorref.show(props.row)" round size="xs"
                                        class="bg-gray-200">
                                        <span class="iconify text-[10pt]" data-icon="mi:edit"></span>
                                    </q-btn>
                                </div>
                            </div>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
        <dialogModelEditor ref="dialogModelEditorref"/>
    </div>
</template>

<script>
import { rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, set, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../../stores/user-store"
import notif from "../../../notif.js"
import dialogModelEditor from "./dialog-model-editor.vue"

export default {
    components: { dialogModelEditor },
    data() {
        return {
            filter: "",
            columns: [
                { label: 'Modelos', field: "nome", align: 'left', sortable: true },
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

    },
    methods: {

        load() {
            let self = this
            onValue(rdbref("modelosCertificados"), (snap) => {
                let modelos = snap.val()
                console.log("modelos", modelos);
                self.rows = []
                for (let key in modelos) {
                    self.rows.push(modelos[key])
                }
            })
        },


    }
}
</script>
