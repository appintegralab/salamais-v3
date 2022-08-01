<template>
    <q-dialog v-model="dialog" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
        <q-card class="bg-gray-100 text-black">
            <q-bar>
                <div>
                    <span class="iconify text-lg" data-icon="mdi:file-certificate-outline" data-inline="false"></span>
                </div>
                <div>
                    Editor de modelos de certificados
                </div>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>

            <div class="m-2 p-2 border rounded">
                <div class="grid grid-cols-2">
                    <div class="bg-gray-100 border rounded p-2 mx-2">
                        <div v-if="type == 'new'" class="font-medium">
                            Digite os dados do NOVO modelo
                        </div>
                        <div v-if="type == 'edit'" class="font-medium">
                            ALTERAÇÃO dos dados do modelo
                        </div>
                        <hr class="mb-3" />
                        <mform ref="mformref" :model="model" @onSave="onSave" @onChange="change" />

                        <hr class="mb-3" />
                        <div :class="styles.label()">
                            Texto do modelo de certificado
                        </div>
                        <div class="text-xs flex items-center mb-2 p-1 rounded bg-gray-200">
                            <i class="iconify inline-block text-base text-gray-600" data-icon="mdi:help-circle"></i>
                            <span class=" flex-1 ml-1 text-xs font-light text-gray-600">
                                Clique em 
                                <span class="border rounded-lg bg-white">
                                    <i class="iconify inline-block text-base text-gray-600" data-icon="mdi:dots-horizontal"></i>                                
                                </span>
                                para começar a escrever um novo trecho de texto. 
                                Para adicionar uma <b>lacuna (etiqueta de substituição)</b>,
                                digite <i class="font-black">@</i> durante a escrita do texto
                            </span>
                        </div>
                        <editor ref="editorref" :contents="editorContents" @onChange="onChange"/>

                        <hr class="my-2" />
                        <div class="text-center">
                            <q-btn @click="formOk">
                                <span class="iconify mr-1" data-icon="material-symbols:save-outline"
                                    data-inline="false"></span>
                                Salvar
                            </q-btn>
                        </div>

                    </div>
                    <div class="bg-gray-100 border rounded p-2 mx-2">
                        <div class="text-sm text-gray-400">
                            Pré visualização
                        </div>
                        <div class="w-[460px] h-[310px] border p-1">
                            <img class="w-full h-full" :src="model.fields.urlImage.value" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
import { rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import notify from "@/components/utils/notify"
import mform from "@/components/m-forms/m-form.vue"
import { Model, string, number } from "@/components/m-forms/m-models"
import editor from "./editor/editor.vue"
import styles from '@/components/m-forms/m-wind-styles';
import newID from "@/components/utils/newID";

export default {
    components: { mform, editor },
    data() {
        return {
            dialog: false,
            model: null,
            type: "new",
            styles: styles,
            editorContents: [],
            id: "noid"
        }
    },
    mounted() {
        let fields = {
            nome: {
                type: "text", name: "nome", default: "",
                label: "Nome do modelo", holder: "Digite nome do modelo",
                yupRules: string().trim().required()
            },
            urlImage: {
                type: "image", name: "urlImage", default: "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/certificados%2Fcertificado-v2.png?alt=media&token=37c4e7ce-8024-4ecc-b2f1-7018158f8557",
                label: "Imagem de fundo do certificado", holder: "url da imagem",
                width: "100px", height: "60px", pathToSave: "/teste2/",
                yupRules: string().trim().required()
            }
        }
        this.model = Model.init(fields)
        this.model.saveButton = false
        console.log("model", this.model.fields);
    },
    methods: {
        show(elem) {

            if (elem == undefined) {
                this.model.reset()
                this.type = "new"
                this.editorContents = [],
                this.id = "noid"
            } else {
                let item = {
                    nome: elem.nome,
                    urlImage: elem.urlImage
                }
                this.model.setValues(item)
                this.editorContents = elem.contents
                this.id = elem.id
                this.type = "edit"
            }
            this.dialog = true
        },

        onSave(data) {
            console.log("onSave", data);
        },

        change() {

        },

        onChange(value) {
            //console.log("onChange", value);
        },

        formOk() {
            let ret = this.$refs.mformref.validate()
            if (ret == false) {
                console.log("erro");
                return
            }
            console.log(ret);
            let contents = this.$refs.editorref.getContents()
            console.log("contents",contents);
            if(this.type == 'new') {
                let item = {
                    id: newID('CERT-MOD-'),
                    nome: ret.nome,
                    urlImage: ret.urlImage,
                    contents: contents
                }
                let path = "modelosCertificados/"+item.id
                console.log(path,item);
                set(rdbref(path),item)
                notify.success('Modelo cadastrado com sucesso.')
                this.dialog = false
            } else {
                let item = {
                    id: this.id,
                    nome: ret.nome,
                    urlImage: ret.urlImage,
                    contents: contents
                }
                let path = "modelosCertificados/"+item.id
                console.log(path,item);
                set(rdbref(path),item)
                notify.success('Modelo alterado com sucesso.')
                this.dialog = false
            }
        }

    },
}
</script>
<style lang="">
    
</style>