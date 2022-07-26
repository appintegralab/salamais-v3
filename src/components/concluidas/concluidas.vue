<template>
    <div>
        <div class="flex items-center mx-4 my-1 pt-2 fw-500">
            <div class="h-[20px] fs-12pt mr-1">
                <span class="iconify" data-icon="mdi:school" data-inline="false"></span>
            </div>
            <div>
                Meus certificados emitidos
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
                        </div>
                    </div>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td>
                            <div class="flex items-center">
                                <div>
                                    <span class="iconify text-[12pt]" data-icon="mdi:school"></span>
                                </div>
                                <div class="ml-2 w-[160px]">
                                    <div class="text-[5pt] leading-3 fw-600">
                                        Formação
                                    </div>
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
import { ref, get, onValue, query, orderByChild, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "@/stores/user-store"
import notif from "@/notif.js"

export default {
    components: {},
    props: {},
    data() {
        return {
            refresh: 0,
            tab: 'mails',
            userStore: userStore(),
            filter: "",
            columns: [
                { label: 'Formações concluídas', field: "nome", align: 'left', sortable: true },
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
        this.load()
    },
    methods: {

        async load() {
            let self = this
            let queryRef = query(ref(rdb, "/salamais/inscricoes"), orderByChild('userID'), equalTo(this.userStore.user.id))
            onValue(queryRef, (snap) => {
                let inscricoes = snap.val()
                console.log("inscricoes", inscricoes);

                function pushCeritificado(path,inscricao) {
                    get(ref(rdb,path)).then((snap) => {
                        if (snap.val()) {
                            self.rows.push(inscricao)
                        }
                    })
                }

                self.rows = []
                for (let i in inscricoes) {
                    for (let encontroID in inscricoes[i].encontros) {
                        let sala = "sala" + inscricoes[i].encontros[encontroID].sala
                        let area = inscricoes[i].encontros[encontroID].area
                        let pathID = sala + ":" + inscricoes[i].formacaoID + ":" + encontroID + ":" + area
                        console.log("pathID", pathID);
                        let path = "/salamais/listaPresenca/" + pathID + "/" + self.userStore.user.id
                        pushCeritificado(path,inscricoes[i])
                    }
                }
            });
        },

    },
}
</script>