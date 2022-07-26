<template>
    <div class="p-2 border rounded fw-600 text-[8pt]">
        <div class="flex items-center justify-between">
            <div>
                Materiais
            </div>
            <div v-if="isAdmin">
                <btnfileuploader @url="newUpload" :path="'materiaisApoio/' + $route.params.id" />
            </div>
        </div>
        <hr class="mt-1 mb-2">
        <div class="grid grid-cols-4">
            <div v-if="materiais.length == 0" class="border rounded p-2 bg-gray-200">
                Nenhum material disponibilizado
            </div>
            <div class="pr-2" v-for="(item, index) in materiais" :key="index">
                <div class="border rounded p-1 text-sm">
                    <material :elem="item" @excluir="excluir" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import btnfileuploader from "./btn-file-uploader.vue"
import material from "./materiais/material.vue"
import { userStore } from "@/stores/user-store"
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, set, orderByChild, equalTo, onValue, query, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import notif from "@/notif.js"

export default {
    components: { btnfileuploader, material },
    data() {
        return {
            inputCss: { inner: 'h-7 text-[8pt] fw-700' },
            mensagem: "",
            sala: {
                link: ""
            },
            userStore: userStore(),
            materiais: [],
        }
    },
    computed: {
        isAdmin() {
            return this.userStore.userAdmin()
        }
    },
    watch: {
    },
    mounted() {
        console.log("materiais mounted", this.$route.params.id);
        this.load()
    },
    methods: {

        load() {
            let self = this

            onValue(ref(rdb, "/salamais/materiaisApoio/" + this.$route.params.id), (snap) => {
                let data = snapToArray(snap)
                console.log("data", data);
                self.materiais = data
            })
        },

        uuidv4(nome) {
            let _nome = nome.normalize('NFD').replace(/[ \u0300-\u036f]/g, "").toUpperCase().substr(0, 10)
            return _nome + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            ).substr(0, 6);
        },

        newUpload(dados) {
            console.log("newUpload", dados);
            if (dados.tipo == "file") {
                let path = "/salamais/materiaisApoio/" + this.$route.params.id
                let item = {
                    id: "MAT-APOIO-" + this.uuidv4(dados.nome),
                    nome: dados.nome,
                    url: dados.downloadURL,
                    createdAt: moment().format(),
                    tipo: dados.tipo
                }
                console.log(path + "/" + item.id, item);
                set(ref(rdb, path + "/" + item.id), item)
                this.$q.notify(notif.success("Material de apoio adicionado com sucesso!"))
            }

        },

        excluir(elem) {
            console.log("excluir", elem);
            let path = "/salamais/materiaisApoio/" + this.$route.params.id
            console.log(path + "/" + elem.id, null);
            set(ref(rdb, path + "/" + elem.id), null)
            this.$q.notify(notif.success("Material de apoio removido com sucesso!"))
        }
    },
}
</script>
<style lang="">
    
</style>