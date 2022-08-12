<template >
    <div class="m-2 p-2 border rounded">
        Exportar dados
        <hr class="mb-2">
        <div class="grid grid-cols-2">
            <div v-for="(item, index) in relatorios" :key="index" class="m-2 p-2 border rounded">
                <div v-if="!item.loading" class="flex items-center justify-between">
                    <div class="text-xs">
                        {{ item.titulo }}
                    </div>
                    <div>
                        <q-btn @click="item.action" size="xs" class="flex items-center px-2 py-[1px]">
                            <span class="iconify text-[10pt]" data-icon="ph:download"></span>
                            <span class="ml-1 pt-1">Exportar</span>
                        </q-btn>
                    </div>
                </div>
                <div v-if="item.loading" class="flex items-center justify-between">
                    <span class="text-xs font-light">Processando...</span>
                    <q-linear-progress indeterminate color="teal" class="q-mt-sm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import XLSX from "xlsx"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { db, rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, get, set, onValue, query, orderByChild, equalTo } from "firebase/database"
import { presencasStore } from "@/stores/presencas-store"
import { pesquisasStore } from "@/stores/pesquisas-store"
import { allUserStore } from "@/stores/allUser-store"

export default {
    components: {},
    data() {
        return {
            presencasStore: presencasStore(),
            pesquisasStore: pesquisasStore(),
            allUserStore: allUserStore(),
            relatorios: [
                {
                    titulo: "Inscrições por formação, encontros e salas",
                    action: this.exportInscricoes, loading: false,
                },
                {
                    titulo: "Usuários (professores)",
                    action: this.exportUsuarios, loading: false,
                },
                {
                    titulo: "Inscrições x Participações",
                    action: this.exportInscrParticipacoes, loading: false,
                },
                //{ titulo: "CORREÇÃO INSCRICOES", action: this.correcaoInscricoes },
            ]
        }
    },
    mounted() {
        let self = this
        console.log("mounted");
        this.allUserStore.init()
        this.presencasStore.init(() => {
            console.log(self.presencasStore.presencas);
            self.pesquisasStore.init(() => {
                console.log(self.pesquisasStore.pesquisas);
            })
        })
    },
    methods: {

        exportInscricoes() {

            get(rdbref("usuarios")).then((snap) => {
                let usuarios = snap.val()
                //console.log("usuarios", usuarios);
                get(rdbref("formacoes")).then((snap) => {
                    let formacoes = snap.val()
                    //console.log("formacoes", formacoes);
                    get(rdbref("inscricoes")).then((snap) => {
                        let inscricoes = snap.val()
                        //console.log("inscricoes", inscricoes);
                        let records = []
                        for (let idx in inscricoes) {
                            for (let key in inscricoes[idx].encontros) {
                                let formacao = formacoes[inscricoes[idx].formacaoID]
                                let encontro = formacao.encontros[key]
                                let rec = {
                                    profID: inscricoes[idx].userID,
                                    profNome: usuarios[inscricoes[idx].userID].nome,
                                    formacaoID: inscricoes[idx].formacaoID,
                                    formacao: formacao.nome,
                                    dataInicio: moment(formacao.dataInicio).format("DD/MM/YYY"),
                                    dataTermino: moment(formacao.dataTermino).format("DD/MM/YYY"),
                                    encontroID: key,
                                    encontroData: moment(encontro.data).format("DD/MM/YYY"),
                                    horaInicio: encontro.horaInicio,
                                    horaTermino: encontro.horaTermino,
                                    sala: inscricoes[idx].encontros[key].sala,
                                    area: inscricoes[idx].encontros[key].area,
                                    link: ""
                                }
                                records.push(rec)
                            }
                        }
                        //console.log("records", records);
                        const wb = XLSX.utils.book_new();
                        const ws = XLSX.utils.json_to_sheet(records);
                        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                        let fileName = "rel-salamais-inscricoes-" + moment().format() + ".xlsx"
                        XLSX.writeFile(wb, fileName);
                    })
                })
            })
        },

        exportUsuarios() {

            get(rdbref("usuarios")).then((snap) => {
                let usuarios = []
                let data = snap.val()
                for (let idx in data) {
                    let user = data[idx]
                    delete user.createdAt
                    delete user.urlFoto
                    delete user._id
                    usuarios.push(user)
                }
                //console.log(usuarios);
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(usuarios);
                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                let fileName = "rel-salamais-usuarios-" + moment().format() + ".xlsx"
                XLSX.writeFile(wb, fileName);
            })

        },

        exportInscrParticipacoes() {
            let self = this
            self.relatorios[2].loading = true
            get(rdbref("formacoes")).then((snap) => {
                let data = snap.val()
                //console.log("data", data);
                let result = []
                for (let formacaoID in data) {
                    let formacao = data[formacaoID]
                    //console.log("formacao",formacao);
                    for (let encontroID in formacao.encontros) {
                        let encontro = formacao.encontros[encontroID]
                        //console.log("encontro", encontro);
                        if (formacao.turmasPorArea) {
                            let areas = encontro.areas
                            for (let areaID in areas) {
                                let salas = encontro.areas[areaID].salas
                                for (let salaID in salas) {
                                    //console.log(`Área ${areaID} - salaID`, salaID);
                                    let sala = salas[salaID]
                                    for (let userID in sala.inscricoes) {
                                        let user = self.allUserStore.getUser(userID)
                                        if (user.ies == undefined) {
                                            user.ies = ""
                                        }
                                        if (user.regional == undefined) {
                                            user.regional = ""
                                        }
                                        let _areas = []
                                        for (let i in user.areas) {
                                            _areas.push(user.areas[i])
                                        }
                                        let presente = "não"
                                        if (self.presencasStore.presencas[salaID + ":" + formacaoID + ":" + encontroID + ":" + areaID] != undefined) {
                                            if (self.presencasStore.presencas[salaID + ":" + formacaoID + ":" + encontroID + ":" + areaID][userID] != undefined) {
                                                presente = "sim"
                                            }
                                        }
                                        let item = {
                                            formacao: formacao.nome,
                                            encontroData: moment(encontro.data).format("DD/MM/YYYY"),
                                            encontroHorario: encontro.horaInicio + " às " + encontro.horaTermino,
                                            encontroArea: areaID,
                                            sala: salaID,
                                            cpf: user.cpf,
                                            nome: user.nome.trim(),
                                            profAreas: _areas.join(";"),
                                            profIES: user.ies,
                                            profRegional: user.regional,
                                            profTelefone: user.telefone,
                                            profEmail: user.email,
                                            presente,
                                        }
                                        result.push(item)
                                    }
                                }
                            }
                        } else {
                            let salas = encontro.salas
                            for (let salaID in salas) {
                                //console.log("salaID", salaID);
                                let sala = salas[salaID]
                                for (let userID in sala.inscricoes) {
                                    let user = self.allUserStore.getUser(userID)
                                    if (user.ies == undefined) {
                                        user.ies = ""
                                    }
                                    if (user.regional == undefined) {
                                        user.regional = ""
                                    }
                                    let _areas = []
                                    for (let i in user.areas) {
                                        _areas.push(user.areas[i])
                                    }
                                    let presente = "não"
                                    if (self.presencasStore.presencas[salaID + ":" + formacaoID + ":" + encontroID + ":"] != undefined) {
                                        if (self.presencasStore.presencas[salaID + ":" + formacaoID + ":" + encontroID + ":"][userID] != undefined) {
                                            presente = "sim"
                                        }
                                    }
                                    let item = {
                                        formacao: formacao.nome,
                                        encontroData: moment(encontro.data).format("DD/MM/YYYY"),
                                        encontroHorario: encontro.horaInicio + " às " + encontro.horaTermino,
                                        encontroArea: "",
                                        sala: salaID,
                                        cpf: user.cpf,
                                        nome: user.nome.trim(),
                                        profAreas: _areas.join(";"),
                                        profIES: user.ies,
                                        profRegional: user.regional,
                                        profTelefone: user.telefone,
                                        profEmail: user.email,
                                        presente,
                                    }
                                    result.push(item)
                                }
                            }
                        }
                    }
                }
                //console.log("result", result);
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(result);
                XLSX.utils.book_append_sheet(wb, ws, "Inscrições x Presenças");
                let fileName = "rel-salamais-inscricoes-presencas-" + moment().format() + ".xlsx"
                XLSX.writeFile(wb, fileName);
                self.relatorios[2].loading = false
            })

        },

        correcaoInscricoes() {
            console.log("correcaoInscricoes");

            get(rdbref("/salamais/formacoes")).then((snap) => {
                let data = snap.val()
                console.log("data", data);
                let ajustes = {}
                for (let keyF in data) {
                    let encontros = data[keyF].encontros
                    for (let keyE in encontros) {
                        let areas = encontros[keyE].areas
                        for (let areaID in areas) {
                            let salas = areas[areaID].salas
                            for (let salaID in salas) {
                                let inscritos = salas[salaID].inscricoes
                                for (let userID in inscritos) {
                                    let path = `${keyF}/encontros/${keyE}/areas/${areaID}/salas/${salaID}/inscricoes/${userID}`
                                    ajustes[path] = userID
                                    set(rdbref("formacoes/" + path), userID)
                                }
                            }
                        }
                    }
                }
                console.log("ajustes [" + Object.keys(ajustes).length + "]", ajustes);
            })
        }
    },
}
</script>
