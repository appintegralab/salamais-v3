<template>
    <div>
        <div class="" v-if="userStore.user.cpf == '18374109840'">
            <q-btn size="xs" @click="verCertificado">
                teste Certificado
            </q-btn>
            <q-btn size="xs" @click="$refs.pesquisaDialogRef.show()">
                teste pesquisa
            </q-btn>
        </div>
        <div class="fw-600 text-[10pt]" v-if="status != 'liberada'">
            <div class="flex items-center justify-between border rounded p-1 text-[10pt] fw-300 bg-gray-200">
                <div>
                    Não liberada
                </div>
                <div>
                    <span class="iconify text-[12pt]" data-icon="ic:outline-info"></span>
                    <q-tooltip :delay="700">
                        Os facilitadores ainda não liberaram a confirmação de presença.
                    </q-tooltip>
                </div>
            </div>
        </div>
        <div class="fw-600 text-[10pt]" v-if="status == 'liberada'">
            <div v-if="!presenca" class="border rounded text-[10pt] fw-300 bg-gray-200">
                <div>
                    <div class="text-center pt-2 bg-green-600 text-white fw-500 rounded p-1">
                        Lista de presença DISPONÍVEL!
                    </div>
                    <div class="p-2 text-center">
                        <q-btn @click="registrarPresenca" size="" outline class="text-green-800">
                            <span class="iconify text-[16pt]" data-icon="mdi:check-decagram-outline"></span>
                            <span class="ml-2">Registrar presença</span>
                        </q-btn>
                    </div>
                </div>
            </div>
            <div v-if="presenca" class="border rounded p-2 text-[10pt] fw-300 bg-gray-100">
                <div>
                    <div class="flex items-center justify-center">
                        <q-avatar class="bg-slate-300">
                            <span class="iconify text-green-900 text-[26pt]" data-icon="mdi:certificate-outline"></span>
                        </q-avatar>
                        <div class="mx-6">
                            <div class="text-center rounded bg-slate-200 text-green-900 fw-500 px-2 pt-[2px]">
                                Presença registrada!
                            </div>
                            <div class="mt-2 ml-2 text-center">
                                <q-btn @click="verCertificado" size="xs" outline class="text-black">
                                    <span class="iconify text-[13pt]" data-icon="mdi:certificate-outline"></span>
                                    <span class="ml-2">ver certificado</span>
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <pesquisaDialog ref="pesquisaDialogRef"/>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"
import { jsPDF } from "jspdf"
import pesquisaDialog from "./pesquisa/dialog.vue"

export default {
    components: { pesquisaDialog },
    props: {
        formacao: { default: null, type: Object },
        encontro: { default: null, type: Object }
    },
    data() {
        return {
            refresh: 0,
            aberta: false,
            userStore: userStore(),
            enabled: false,
            status: "fechada",
            presenca: false
        }
    },
    watch: {
        formacao() {
            this.load()
        },
        encontro() {
            this.load()
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
            if (this.formacao && this.encontro) {
                let path = `formacoes/${this.formacao.id}/encontros/${this.encontro.id}`
                console.log("path", path);
                onValue(rdbref(path + "/presencaStatus"), (snap) => {
                    let status = snap.val()
                    if (status) {
                        self.status = status
                    } else {
                        self.status = "fechada"
                    }
                    console.log("self.status", self.status);
                    self.refresh++
                })
            }

            let presencaID = this.$route.params.id
            let path = "listaPresenca/" + presencaID + "/" + this.userStore.user.id
            console.log("presencaID path", path);
            onValue(rdbref(path), (snap) => {
                let presenca = snap.val()
                if (presenca) {
                    self.presenca = true
                } else {
                    self.presenca = false
                }
                console.log("self.presenca", self.presenca);
                self.refresh++
            })

            this.checkEnabled()
        },

        checkEnabled() {
            let cpf = this.userStore.user.cpf
            //console.log(cpf);
            let lista = ["18374109840", "28854077860", "99271176804", "12345678900", "36126741889"]
            if (lista.lastIndexOf(cpf) != -1) {
                this.enabled = true
            } else {
                this.enabled = false
            }
            this.refresh++
        },

        registrarPresenca() {
            let self = this
            console.log("registrarPresenca");
            let presencaID = this.$route.params.id
            let path = "listaPresenca/" + presencaID + "/" + this.userStore.user.id
            console.log("presencaID path", path);
            set(rdbref(path), this.userStore.user.id)

            path = "listaPresencaByUsers/" + this.userStore.user.id + "/" + presencaID 
            console.log("path", path);
            set(rdbref(path), presencaID)

            self.$q.notify(notif.success("Sua presença foi registrada com sucesso!"))
        },

        getDataUri(url, cb) {
            var image = new Image();
            image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

            image.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;

                //next three lines for white background in case png has a transparent background
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#fff';  /// set white fill style
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                canvas.getContext('2d').drawImage(this, 0, 0);

                cb(canvas.toDataURL('image/jpeg'));
            };

            image.src = url;
        },

        verCertificado() {
            let self = this
            console.log("verCertificado");
            let certImagePath = "https://firebasestorage.googleapis.com/v0/b/prj-salamais-prd.appspot.com/o/certificados%2Fcertificado-v2.png?alt=media&token=37c4e7ce-8024-4ecc-b2f1-7018158f8557"
            this.getDataUri(certImagePath, function (dataUri) {
                let imageData = dataUri;

                const doc = new jsPDF({
                    orientation: "landscape",
                    unit: 'mm',
                });

                doc.addImage(imageData, 'PNG', 0, 0, 297, 210);
                let texto = "Certificamos que " + self.userStore.user.nome
                texto = texto + ` atuou como multiplicador (a) na Trilha de Aprendizagem Planejamento Ciências Agrárias & Meio Ambiente no programa de atividades do Sala Mais promovido pelo Ecossistema Ânima. O evento foi realizado nos dias 04 e 11/02/2022, com carga horária total de 60 horas de atividades.`
                doc.text(texto, 40, 80, { maxWidth: 220, align: "justify" });

                doc.save("salamais-certificado.pdf");
            });
        }
    },
}
</script>
<style lang="">
    
</style>