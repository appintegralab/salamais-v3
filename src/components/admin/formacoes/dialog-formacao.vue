<template>
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
        <div class="bg-white">
            <q-toolbar class="flex justify-between bg-slate-200">
                <div class="fw-600">
                    Formação
                </div>
                <q-btn dense round size="sm" icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-toolbar>
            <div class="p-1">
                <div class="border rounded p-2">
                    <FormKit id="formacao" type="form" v-model="formData" :actions="false" @submit="submitHandler">
                        <div class="grid grid-cols-5">
                            <div class="col-span-1 px-2">
                                <FormKit name='id' label='ID' help='Uso interno' disabled :classes="inputCss" />
                            </div>
                            <div class="col-span-1 px-2">
                                <FormKit type="select" name='semestre' label='Semestre' help='Semestre letivo'
                                    :classes="inputCss" :options="['2022/2', '2023/1', '2023/2']" />
                            </div>
                            <div class="px-2">
                                <FormKit name='horasAtividade' label='Carga Horária' help='CH de atividade' required
                                    :classes="inputCss" validation="required|number" />
                            </div>
                        </div>
                        <div class="px-2">
                            <FormKit name='nome' label='Nome da formação' help='Nome da formação / trilha' required
                                :classes="inputCss" validation="required" />
                        </div>
                        <div class="px-2">
                            <div class="text-xs fw-500">
                                Descrição da formação
                            </div>
                            <q-input dense :rows="2" class="text-xs" v-model="formData.descr" outlined
                                type="textarea" />
                        </div>

                        <div class="px-2 mt-4">
                            <encontros ref="encontrosref" />
                        </div>
                    </FormKit>
                    <hr class="my-2">
                    <div class="text-right mr-4">
                        <q-btn @click="submitForm" size="sm" outline class="text-slate-800 px-3">
                            <span class="iconify text-[10pt] mr-1" data-icon="ic:save"></span>
                            Salvar
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </q-dialog>
</template>

<script>
import { FormKitSchema } from '@formkit/vue'
import notif from "../../../notif.js"
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import encontros from "./encontros.vue"
import _ from "lodash"

export default {
    components: { FormKitSchema, encontros },
    data() {
        return {
            dialog: false,
            inputCss: { inner: 'h-7 text-[8pt] fw-700' },
            formData: {
                id: "",
                semestre: '2022/2',
                horasAtividade: 0,
                nome: "",
                descr: "",
            },
            isUpdate: false
        }
    },
    watch: {

    },
    mounted() {


    },
    methods: {

        uuidv4(nome) {
            let _nome = nome.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
            return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ).substr(0, 6);
        },

        show(formacao) {
            console.log(formacao);
            if (formacao != undefined) {
                this.isUpdate = true
                this.formData = JSON.parse(JSON.stringify(formacao))
                //converte encontros para vetor
                let vetEncontros = []
                for (let i in this.formData.encontros) {
                    vetEncontros.push(this.formData.encontros[i])
                }
                this.formData.encontros = _.orderBy(vetEncontros, ['data', 'horaInicio'], ['asc', 'asc'])
                this.dialog = true
                this.$nextTick(() => {
                    this.$refs.encontrosref.init(this.formData)
                })
            } else {
                this.isUpdate = false
                this.formData = {
                    id: "",
                    semestre: '2022/2',
                    horasAtividade: 0,
                    nome: "",
                    descr: "",
                }
                this.formData.id = this.uuidv4("FM-")
                this.dialog = true
                this.$nextTick(() => {
                    this.$refs.encontrosref.reset()
                })
            }
        },

        submitForm() {
            this.$formkit.submit('formacao')
        },

        submitHandler(data) {
            alert(`Submitted ${data} successfully!`)
        },

        submitHandler() {
            let self = this
            console.log("submit");
            let item = {
                id: this.formData.id,
                setor: "salamais",
                nome: this.formData.nome,
                descr: this.formData.descr,
                semestre: this.formData.semestre,
                horasAtividade: this.formData.horasAtividade,
            }
            let dados = this.$refs.encontrosref.getEncontros()
            console.log("dados", dados);
            if (dados.encontros.length == 0) {
                this.$q.notify(notif.error("Nenhum encontro cadastrado. Encontros são obrigatórios!"))
                return
            }
            //transformar para objeto
            let objEncontros = {}
            for (let i in dados.encontros) {
                objEncontros[dados.encontros[i].id] = dados.encontros[i]
            }
            dados.encontros = objEncontros
            item = { ...item, ...dados }
            console.log("item", item);
            if (this.isUpdate) {
                set(ref(rdb, "/salamais/formacoes/" + item.id), item)
                self.$q.notify(notif.success("Formação alterada com sucesso"))
                self.dialog = false
            } else {
                set(ref(rdb, "/salamais/formacoes/" + item.id), item)
                self.$q.notify(notif.success("Formação cadastrada com sucesso"))
                self.dialog = false
            }
        },
    },
}
</script>

<style>
</style>