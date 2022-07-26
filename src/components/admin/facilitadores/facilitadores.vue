<template >
    <div>
        <div class="flex items-center mx-4 my-1 pt-2 fw-500">
            <div class="h-[20px] fs-12pt mr-1">
                <span class="iconify" data-icon="mdi:school" data-inline="false"></span>
            </div>
            <div>
                Facilitadores
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
                                <div class="ml-1">
                                    <span class="text-[7pt]">{{ props.row.nome }}</span>
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
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../../stores/user-store"
import notif from "../../../notif.js"

export default {
    data() {
        return {
            filter: "",
            columns: [
                { label: 'Facilitadores', field: "nome", align: 'left', sortable: true },
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

    },
    methods: {

        pushUser(userID) {
            let self = this
            //console.log("pushUser",userID);
            get(ref(rdb, "/salamais/usuarios/" + userID)).then((snap) => {
                let user = snap.val()
                console.log("user", user);
                self.rows.push(user)
            })
        },

        load() {
            let self = this
            onValue(ref(rdb, "/salamais/facilitadores"), (snap) => {
                let facilitadores = snap.val()
                console.log("facilitadores", facilitadores);
                for (let key in facilitadores) {
                    self.pushUser(key)
                }
            })
        },


    }
}
</script>
