<template>
    <div class="my-1">
        <div class="flex items-center p-1">
            <div>
                <q-avatar class="" size="30px">
                    <q-img :src="userStore.user.urlFoto" />
                </q-avatar>
            </div>
            <div class="ml-2 flex-1">
                <div class="text-xs flato fw-400">
                    {{ userStore.user.nome }}
                </div>
                <div class="text-xs flato fw-600">
                    Criar uma nova postagem
                </div>
            </div>
        </div>
        <div class="flex flex-col mt-1 mx-2">
            <textarea v-model="mensagem" class="p-3 bg-transparent border border-gray-300 rounded" rows="3"
                placeholder="Escreva uma mensagem para todos da sala"></textarea>
            <div class="flex justify-between mt-2">
                <div>
                    <q-checkbox dense v-model="enviarEmail" color="blue-grey" />
                    <span class="ml-2 text-xs">Enviar a mensagem para todos por email</span>
                </div>
                <q-btn @click="enviar" size="xs" class="flex items-center px-2 h-6 bg-slate-200">
                    <span class="iconify text-sm" data-icon="ic:round-send"></span>
                    <div class="ml-1 pt-[2px] fw-400 text-xs">enviar</div>
                </q-btn>
            </div>
        </div>
        <div class="bg-gray-200 h-1 mx-2 mt-3"></div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb, db, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, get, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"
import { allUserStore } from "@/stores/allUser-store"
import { lodash } from 'lodash'

export default {
    data() {
        return {
            enviarEmail: false,
            userStore: userStore(),
            allUserStore: allUserStore(),
            mensagem: "",
        }
    },
    computed: {
        moment() {
            return moment
        },
    },
    mounted() {
        this.allUserStore.init()
    },
    methods: {

        enviar() {
            let self = this
            console.log("enviar");
            if (this.mensagem.trim() == '') {
                self.$q.notify(notif.error("Texto da mensagem obrigatório!"))
                return
            }
            console.log("this.mensagem", this.mensagem);
            console.log("this.enviarEmail", this.enviarEmail);

            let item = {
                id: this.userStore.user.id + "-" + moment().format(),
                mensagem: this.mensagem,
                createdAt: moment().format(),
                userID: this.userStore.user.id,
                emailSent: this.enviarEmail
            }
            let path = "postagens/" + this.$route.params.id + "/" + item.id
            console.log(path, item);
            set(rdbref(path),item)
            //console.log(item);

            if (this.enviarEmail) {
                console.log("enviarEmail");
                let [salaID, formacaoID, encontroID, areaID] = this.$route.params.id.split(":")
                console.log({ salaID, formacaoID, encontroID, areaID });
                this.sendMail({ salaID, formacaoID, encontroID, areaID }, self.mensagem)
            }

            self.mensagem = ""
            self.$q.notify(notif.success("Mensagem enviada com sucesso!"))
        },

        async sendMail(data, mensagem) {
            let self = this
            //console.log("db", db);
            //console.log("data", data);
            let snap = await get(rdbref("formacoes/" + data.formacaoID))
            let formacao = snap.val()
            let encontro = formacao.encontros[data.encontroID]
            let sala = encontro.salas[data.salaID]
            if (formacao.turmasPorArea) {
                sala = encontro.areas[data.areaID].salas[data.salaID]
            }
            //console.log("formacao", formacao);
            //console.log("encontro", encontro);
            //console.log("sala", sala);
            let emails = []
            for (let key in sala.inscricoes) {
                let user = this.allUserStore.getUser(key)
                if (user != undefined) {
                    emails.push(user.email)
                }
            }
            //console.log("emails", emails);
            //console.log("mensagem", mensagem);
            let textoFormacao = "Formacao: " + formacao.nome + "\n"
            textoFormacao = textoFormacao + "Data: " + moment(formacao.dataInicio).format("DD/MM/YYYY")
            textoFormacao = textoFormacao + " (" + moment(formacao.dataInicio).locale('pt-br').format('dddd') + ")\n"
            textoFormacao = textoFormacao + "Horário: " + encontro.horaInicio + " às " + encontro.horaTermino + "\n"
            if (data.areaID == "") {
                textoFormacao = textoFormacao + sala.id + "\n"
            } else {
                textoFormacao = textoFormacao + sala.id + " (" + data.areaID + ")\n"
            }
            textoFormacao = textoFormacao + "\n" + this.userStore.user.nome + " postou uma mensagem no mural:\n\n"
            //console.log(textoFormacao);

            let textoFormacaoHTML = "Formacao: " + formacao.nome + "<br>"
            textoFormacaoHTML = textoFormacaoHTML + "Data: " + moment(formacao.dataInicio).format("DD/MM/YYYY")
            textoFormacaoHTML = textoFormacaoHTML + " (" + moment(formacao.dataInicio).locale('pt-br').format('dddd') + ")<br>"
            textoFormacaoHTML = textoFormacaoHTML + "Horário: " + encontro.horaInicio + " às " + encontro.horaTermino + "<br>"
            if (data.areaID == "") {
                textoFormacaoHTML = textoFormacaoHTML + sala.id + "<br>"
            } else {
                textoFormacaoHTML = textoFormacaoHTML + sala.id + " (" + data.areaID + ")<br>"
            }
            textoFormacaoHTML = textoFormacaoHTML + "<br>" + this.userStore.user.nome + " postou uma mensagem no mural:<br><br>"
            //console.log(textoFormacaoHTML);

            let dados = {
                nome: "nome",
                to: emails,
                message: {
                    subject: "Aviso Mural " + sala.id + " - " + formacao.nome,
                    text: textoFormacao + mensagem,
                    html: textoFormacaoHTML + mensagem,
                }
            };
            console.log("dados", dados);
            db.collection('mail').add(dados).then((e) => {
                console.log("Email enviado!", e);
                self.$q.notify(notif.success("Email enviado com sucesso"))
            });
        }

    },
}
</script>
<style lang="">
    
</style>