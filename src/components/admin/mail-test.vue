<template>
    <div class="p-2 border rounded m-2">
        Teste de envio de email
        <div class="grid grid-cols-2">
            <div>
                <div class="px-2">
                    <FormKit v-model='email' type="email" label='Email destinatário' help='Endereço de email válido'
                        required :classes="inputCss" validation="required" />
                </div>
                <div class="px-2">
                    <FormKit v-model='assunto' type="text" label='Assunto' help='Assunto' required :classes="inputCss"
                        validation="required" />
                </div>
                <div class="px-2">
                    <div class="text-xs fw-500">
                        Texto da mensagem
                    </div>
                    <q-input dense :rows="2" class="text-xs" v-model="texto" outlined type="textarea" />
                </div>
                <hr class="my-2">
                <div>
                    <q-btn @click="enviarEmail" size="sm" outline>Enviar</q-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import notif from "../../notif.js"
import { db } from "@/firebase/firebase.js"

export default {
    data() {
        return {
            inputCss: { inner: 'h-7 text-[8pt] fw-700' },
            email: "",
            texto: "",
            assunto: ""
        }
    },
    methods: {
        enviarEmail() {
            let self = this
            console.log("enviarEmail");
            console.log("db", db);
            let dados = {
                nome: "nome",
                to: this.email,
                message: {
                    subject: this.assunto,
                    text: this.texto,
                    html: this.texto,
                }
            };
            console.log("dados",dados);
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