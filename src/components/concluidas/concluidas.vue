<template>
    <div>
        <div class="flex items-center mx-4 my-1 pt-2 fw-500">
            <div class="h-[20px] fs-12pt mr-1">
                <span class="iconify" data-icon="ph:book-bookmark-duotone" data-inline="false"></span>
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
                                    <span class="iconify text-base" data-icon="ph:book-bookmark-duotone"></span>
                                </div>
                                <div class="ml-2">
                                    <div class="flex-1 leading-3">
                                        <div class="pt-0 m-0 fw-200 text-xs">
                                            Formação
                                            <span
                                                class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200">
                                                {{ moment(props.row.formacao.dataInicio).format("DD/MM/YYYY") }}
                                                <span class="text-[6pt]">
                                                    ({{
                                                            moment(props.row.formacao.dataInicio).locale('pt-br').format('ddd').toUpperCase()
                                                    }})
                                                </span>
                                            </span>

                                        </div>
                                        <div class="mt-0 leading-5 text-xs font-medium">
                                            {{ props.row.formacao.nome }}
                                        </div>
                                    </div>
                                </div>
                                <div class="ml-2">
                                    <div class="flex-1 leading-3">
                                        <div class="pt-0 m-0 fw-200 text-xs">
                                            Trilha
                                            <div class="flex">
                                                <div>
                                                    <span
                                                        class="text-[9pt] fw-500 px-1 rounded text-slate-700 bg-slate-100">
                                                        {{ moment(props.row.encontro.data).format("DD/MM/YYYY") }}
                                                    </span>
                                                    <span class="ml-1 text-[9pt] fw-300">
                                                        ({{
                                                                moment(props.row.encontro.data).locale('pt-br').format('dddd').split("-")[0]
                                                        }})
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="ml-1 text-[9pt] fw-200">Horário:</span>
                                                    <span class="px-1 rounded text-[9pt] fw-500 text-slate-900">
                                                        {{ props.row.encontro.horaInicio }} às {{
                                                                props.row.encontro.horaTermino
                                                        }}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="border rounded px-1 bg-gray-200 font-medium">
                                                        {{ props.row.encontro.salaID }}
                                                    </span>
                                                    <badgearea :sigla="props.row.encontro.areaID" />
                                                    <q-btn @click="verCertificado(props.row)"
                                                        class="ml-1 px-1 py-1 leading-3" size="5px" outline>
                                                        <span class="text-[5pt]">ver certificado</span>
                                                    </q-btn>
                                                </div>
                                            </div>
                                        </div>
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
import { rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, get, onValue, query, orderByChild, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "@/stores/user-store"
import notif from "@/notif.js"
import getFields from "@/firebase/getFields.js"
import badgearea from "@/components/utils/badge-area.vue"
import buildCertificado from "@/components/admin/tmpl-certificados/buildCertificado.js"

window.moment = moment

export default {
    components: { badgearea },
    props: {},
    data() {
        return {
            refresh: 0,
            tab: 'mails',
            userStore: userStore(),
            filter: "",
            columns: [
                { label: 'Certificados', field: "nome", align: 'left', sortable: true },
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

        addCertificadosMult() {
            onValue(rdbref("facilitadores/" + this.userStore.user.id), async (snap) => {
                let formacoes = snap.val()
                console.log("formações mult", formacoes);
            })
        },

        async load() {
            let self = this
            self.rows = []
            let snap = await get(rdbref("/listaPresencaByUsers/" + this.userStore.user.id))
            let data = snapToArray(snap)
            console.log("data", data)
            for (let i in data) {
                let [salaID, formacaoID, encontroID, areaID] = data[i].split(":")
                console.log({ salaID, formacaoID, encontroID, areaID });
                let ret = await getFields("/formacoes/" + formacaoID, ["nome", "descr", "dataInicio", "dataTermino", "horasAtividade"])
                let item = {
                    nome: ret.nome,
                    formacao: { id: formacaoID, ...ret }
                }
                let path = "/formacoes/" + formacaoID + "/encontros/" + encontroID
                ret = await getFields(path, ["data", "horaInicio", "horaTermino"])
                item.encontro = {
                    id: encontroID,
                    salaID, areaID,
                    ...ret
                }
                self.rows.push(item)
            }
            console.log("self.rows", self.rows);

            snap = await get(rdbref("facilitadores/" + this.userStore.user.id))
            let formacoes = snap.val()
            console.log("formações mult", formacoes);
            if (formacoes) {
                for (let key in formacoes.formacoes) {
                    let formacaoID = key
                    let encontros = formacoes.formacoes[key].encontros
                    let areaID = ""
                    for (let keyEnc in encontros) {
                        let encontroID = keyEnc
                        let salaID = encontros[keyEnc].salaID
                        if (encontros[keyEnc].area != undefined) {
                            areaID = encontros[keyEnc].area.id
                        }
                        console.log({ salaID, formacaoID, encontroID, areaID });
                        let ret = await getFields("/formacoes/" + formacaoID, ["nome", "descr", "dataInicio", "dataTermino", "horasAtividade"])
                        let item = {
                            nome: ret.nome,
                            formacao: { id: formacaoID, ...ret }
                        }
                        let path = "/formacoes/" + formacaoID + "/encontros/" + encontroID
                        ret = await getFields(path, ["data", "horaInicio", "horaTermino"])
                        item.encontro = {
                            mult: true,
                            id: encontroID,
                            salaID, areaID,
                            ...ret
                        }
                        self.rows.push(item)
                    }
                }
            }

        },

        verCertificado(item) {
            console.log("verCertificado", item);
            let data = {
                nome: this.userStore.user.nome,
                nomeTrilha: item.nome,
                dataTrilha: moment(item.encontro.data).format("DD/MM/YYYY"),
                ch: item.formacao.horasAtividade
            }
            if (item.encontro.mult != undefined) {
                console.log("multiplicador");
                data.ch = 10
                buildCertificado("CERT-MOD-6be4", data)
                return
            }
            if (item.encontro.areaID != undefined && item.encontro.areaID != '') {
                let hora = item.encontro.horaInicio.split(":")[0]
                let periodo = "matutino"
                if (hora >= 12 && hora < 18) {
                    periodo = "vespertino"
                }
                if (hora >= 18 && hora < 24) {
                    periodo = "noturno"
                }
                data.periodo = periodo
                get(rdbref("/areas/" + item.encontro.areaID)).then((snap) => {
                    let area = snap.val()
                    data.area = area.nome
                    console.log("data", data);
                    buildCertificado("CERT-MOD-e1a0", data)
                })
            } else {
                console.log("data", data);
                buildCertificado("CERT-MOD-eff9", data)
            }
        }
    },
}
</script>